from flask import Flask
from flask_cors import CORS
from flask import send_file
from upload_route import upload_bp
from download_routes import download_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(upload_bp, url_prefix='/uploads')
app.register_blueprint(download_bp, url_prefix='/rubric_downloads')

@app.route('/')
def home():
    return "Hello, Flask!"

if __name__ == '__main__':
    app.run(debug=True)
