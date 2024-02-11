from flask import Blueprint, jsonify, send_from_directory, current_app
import os
import shutil

download_bp = Blueprint('download_bp', __name__)

DOWNLOAD_FOLDER = 'rubric_downloads'
UPLOAD_FOLDER = 'uploads'
os.makedirs(DOWNLOAD_FOLDER, exist_ok=True)


@download_bp.route('/<filename>', methods=['GET'])
def download_file(filename):
    source_path = os.path.join(UPLOAD_FOLDER, filename)
    target_path = os.path.join(DOWNLOAD_FOLDER, filename)
    
    if not os.path.exists(target_path):
        if os.path.exists(source_path):
            print(f"Moving file from {source_path} to {target_path}")
            shutil.move(source_path, target_path)
        else:
            print("File not found in uploads.")
            return jsonify({'error': 'File not found.'}), 404
    
    print(f"Serving file from {target_path}")
    return send_from_directory(DOWNLOAD_FOLDER, filename, as_attachment=True)
