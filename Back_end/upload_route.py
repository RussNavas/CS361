from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)

upload_bp = Blueprint('upload_bp', __name__)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'csv', 'json'}

# Ensure the upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@upload_bp.route('/', methods=['POST'])
def upload_file():
    logging.info("Accessed the upload file route")
    if 'file' not in request.files:
        logging.warning("No file part in the request")
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        logging.warning("No file selected for upload")
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)
        logging.info(f"File {filename} uploaded successfully to {file_path}")
        return jsonify({'message': 'File successfully uploaded', 'filename': filename}), 200
    else:
        logging.warning("Attempted to upload a file with an unsupported extension")
        return jsonify({'error': 'File type not allowed'}), 400
