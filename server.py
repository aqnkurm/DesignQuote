# Python-based server for quotes database
import http.server
import socketserver
import json
import os
import urllib.parse
from http import HTTPStatus

# Database file path
DB_FILE = os.path.join(os.path.dirname(__file__), 'quotes_db.json')

# Initialize database if it doesn't exist
def initialize_database():
    if not os.path.exists(DB_FILE):
        with open(DB_FILE, 'w') as f:
            json.dump({'user': []}, f)
        print('Database initialized')

# Load quotes from database
def load_quotes():
    try:
        with open(DB_FILE, 'r') as f:
            return json.load(f)
    except Exception as e:
        print(f'Error loading quotes: {e}')
        return {'user': []}

# Save quotes to database
def save_quotes(quotes):
    try:
        with open(DB_FILE, 'w') as f:
            json.dump(quotes, f, indent=2)
        return True
    except Exception as e:
        print(f'Error saving quotes: {e}')
        return False

# Initialize database
initialize_database()

class QuotesHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Serve static files
        if self.path == '/' or not self.path.startswith('/api/'):
            return super().do_GET()
        
        # API endpoints
        if self.path.startswith('/api/quotes'):
            self.send_response(HTTPStatus.OK)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            
            # Get all quotes
            if self.path == '/api/quotes':
                quotes = load_quotes()
                self.wfile.write(json.dumps(quotes).encode())
                return
            
            # Get quotes by category
            parts = self.path.split('/')
            if len(parts) == 4:
                category = parts[3]
                quotes = load_quotes()
                
                if category in quotes:
                    self.wfile.write(json.dumps(quotes[category]).encode())
                else:
                    self.send_error(HTTPStatus.NOT_FOUND, 'Category not found')
                return
        
        # Not found
        self.send_error(HTTPStatus.NOT_FOUND, 'Not found')
    
    def do_POST(self):
        # API endpoints
        if self.path == '/api/quotes':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length).decode('utf-8')
            
            try:
                quote_data = json.loads(post_data)
                
                # Validate quote data
                if 'text' not in quote_data or 'author' not in quote_data:
                    self.send_error(HTTPStatus.BAD_REQUEST, 'Quote text and author are required')
                    return
                
                # Get category (default to 'user')
                category = quote_data.get('category', 'user')
                
                # Load quotes
                quotes = load_quotes()
                
                # Create category if it doesn't exist
                if category not in quotes:
                    quotes[category] = []
                
                # Add new quote
                new_quote = {
                    'text': quote_data['text'],
                    'author': quote_data['author'],
                    'category': category
                }
                quotes[category].append(new_quote)
                
                # Save to database
                if save_quotes(quotes):
                    self.send_response(HTTPStatus.CREATED)
                    self.send_header('Content-Type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps(new_quote).encode())
                else:
                    self.send_error(HTTPStatus.INTERNAL_SERVER_ERROR, 'Failed to save quote')
            except json.JSONDecodeError:
                self.send_error(HTTPStatus.BAD_REQUEST, 'Invalid JSON')
            return
        
        # Not found
        self.send_error(HTTPStatus.NOT_FOUND, 'Not found')
    
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def do_OPTIONS(self):
        self.send_response(HTTPStatus.NO_CONTENT)
        self.end_headers()

# Start server
port = 8000
handler = QuotesHandler
with socketserver.TCPServer(("", port), handler) as httpd:
    print(f"Server running at http://localhost:{port}")
    httpd.serve_forever()