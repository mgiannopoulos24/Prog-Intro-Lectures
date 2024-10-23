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
    compile_process = subprocess.run(
        ["gcc", "main.c", "-o", "main", "-lm"], capture_output=True, text=True)
    return {"output": "", "status": compile_process.stderr, "return_code": compile_process.returncode}


def run_code(input_data):
    try:
        # Run the compiled code
        run_process = subprocess.run(
            ["./main"], input=input_data, capture_output=True, text=True, timeout=10)

        return {"output": run_process.stdout, "status": "Runtime", "return_code": run_process.returncode}
    except subprocess.TimeoutExpired:
        # Handle timeout: return a specific TLE error message
        return {"output": "", "status": "Time Limit Exceeded", "return_code": -1}


def are_equal(str1, str2):
    # Normalize by removing spaces, newlines, and converting to lowercase
    normalized_str1 = str1.replace(" ", "").replace("\n", "").lower()
    normalized_str2 = str2.replace(" ", "").replace("\n", "").lower()

    # Compare the normalized strings
    return normalized_str1 == normalized_str2


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
        return jsonify({"output": "", "status": compile_result['status'], "return_code": compile_result['return_code']})

    # Run the code
    run_result = run_code(input)
    return jsonify({"output": run_result['output'], "status": run_result['status'], "return_code": run_result['return_code']})


@app.route('/run-tests', methods=['POST'])
def run_tests():
    data = request.get_json()
    code = data.get('code')
    challengeIndex = int(data.get('challengeIndex'))
    testIndex = int(data.get('testIndex'))

    # Compile the code
    compile_result = compile_code(code)
    if compile_result['return_code'] != 0:
        return jsonify({"output": "", "status": compile_result['status'], "return_code": compile_result['return_code']})

    # Load the challenge data
    challenges = []
    with open("challengeData.json", "r") as file:
        challenges = json.load(file)

    test = challenges[challengeIndex]['tests'][testIndex]

    run_result = run_code(test['input'])

    if run_result['return_code'] != 0:
        return jsonify({"isCorrect": False, "status": run_result['status']})

    is_correct = are_equal(test['expectedOutput'], run_result['output'])

    time.sleep(0.5)

    return jsonify({"isCorrect": is_correct, "status": ""})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, threaded=True)
