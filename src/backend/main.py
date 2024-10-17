from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from flask import Response, stream_with_context
import subprocess
import os
import json
import time
from threading import Lock

app = Flask(__name__)
CORS(app)  # Enable CORS

def compile_code(code):
    # Generate the C file
    with open("main.c", "w") as file:
        file.write(code)

    # Compile the C code
    compile_process = subprocess.run(["gcc", "main.c", "-o", "main"], capture_output=True, text=True)
    return {"output": "", "error": compile_process.stderr, "return_code": compile_process.returncode}

def run_code(input_data):
    try:
        # Run the compiled code
        run_process = subprocess.run(["./main"], input=input_data, capture_output=True, text=True, timeout=10)

        return {"output": run_process.stdout, "error": run_process.stderr, "return_code": run_process.returncode}
    except subprocess.TimeoutExpired:
        # Handle timeout: return a specific TLE error message
        return {"output": "", "error": "Time Limit Exceeded", "return_code": -1}

@app.route('/')
def home():
    return "Welcome to the Online Compiler API!"

@app.route('/run', methods=['POST'])
def run():
    data = request.get_json()
    code = data.get('code')
    input = data.get('input')

    # Compile the code
    compile_result = compile_code(code)
    if compile_result['return_code'] != 0:
        return jsonify({"output": "", "error": compile_result['error'], "return_code": compile_result['return_code']})

    # Run the code
    run_result = run_code(input)
    return jsonify({"output": run_result['output'], "error": run_result['error'], "return_code": run_result['return_code']})

@app.route('/run-tests', methods=['POST'])
def run_tests():
    data = request.get_json()
    code = data.get('code')
    challengeIndex = int(data.get('challengeIndex'))
    testIndex = int(data.get('testIndex'))
    

    # Compile the code
    compile_result = compile_code(code)
    if compile_result['return_code'] != 0:
        return jsonify({"output": "", "error": compile_result['error'], "return_code": compile_result['return_code']})
    
    # Load the challenge data
    challenges = []
    with open("../utils/challengeData.json", "r") as file:
        challenges = json.load(file)

    test = challenges[challengeIndex]['tests'][testIndex]

    run_result = run_code(test['input'])

    if run_result['return_code'] != 0:
        return jsonify({"isCorrect": False, "error": run_result['error']})

    is_correct = test['expectedOutput'] == run_result['output']

    time.sleep(1) 

    return jsonify({"isCorrect": is_correct, "error": ""})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, threaded = True)
