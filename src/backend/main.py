from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import subprocess
import os

app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route('/')
def home():
    return "Welcome to the Online Compiler API!"

@app.route('/compile', methods=['POST'])
def compile_code():
    data = request.get_json()
    code = data.get("code")

    # Generate the C file
    with open("main.c", "w") as file:
        file.write(code)

    # Compile the C code
    compile_process = subprocess.run(["gcc", "main.c", "-o", "main"], capture_output=True, text=True)
    
    if compile_process.returncode != 0:
        return jsonify({"error": compile_process.stderr}), 400

    # Run the compiled code
    run_process = subprocess.run(["./main"], capture_output=True, text=True)
    
    return jsonify({"output": run_process.stdout})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
