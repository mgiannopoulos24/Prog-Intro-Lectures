from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import os
import json
from threading import Lock

app = Flask(__name__)
CORS(app)  # Enable CORS

# Initialize a lock to prevent race conditions
file_lock = Lock()

def compile_code(code):
    with file_lock:
        # Generate a unique filename using process ID and timestamp
        unique_id = str(int(time.time() * 1000))
        source_file = f"main_{unique_id}.c"
        binary_file = f"main_{unique_id}"

        try:
            # Write the C code to the source file
            with open(source_file, "w") as file:
                file.write(code)

            # Compile the C code
            compile_process = subprocess.run(
                ["gcc", source_file, "-o", binary_file, "-lm"],
                capture_output=True,
                text=True
            )

            if compile_process.return_code != 0:
                return {
                    "output": compile_process.stdout,
                    "error": compile_process.stderr,
                    "return_code": compile_process.return_code
                }

            return {
                "output": compile_process.stdout,
                "error": compile_process.stderr,
                "return_code": compile_process.return_code,
                "binary": binary_file  # Return the binary filename for execution
            }
        finally:
            # Clean up the source file
            if os.path.exists(source_file):
                os.remove(source_file)

def run_code(binary, input_data):
    try:
        run_process = subprocess.run(
            [f"./{binary}"],
            input=input_data,
            capture_output=True,
            text=True,
            timeout=10
        )

        return {
            "output": run_process.stdout,
            "error": run_process.stderr,
            "return_code": run_process.returncode
        }
    except subprocess.TimeoutExpired:
        return {
            "output": "",
            "error": "Time Limit Exceeded",
            "return_code": -1
        }
    finally:
        # Clean up the binary file after execution
        if os.path.exists(binary):
            os.remove(binary)

def are_equal(str1, str2):
    normalized_str1 = ''.join(str1.split()).lower()
    normalized_str2 = ''.join(str2.split()).lower()
    return normalized_str1 == normalized_str2

@app.route('/')
def home():
    return "Welcome to the Online Compiler API!"

@app.route('/run', methods=['POST'])
def run():
    data = request.get_json()
    code = data.get('code')
    input_data = data.get('input', '')

    if not code:
        return jsonify({"output": "", "error": "No code provided.", "return_code": -1}), 400

    # Compile the code
    compile_result = compile_code(code)
    if compile_result['return_code'] != 0:
        return jsonify({
            "output": compile_result.get('output', ''),
            "error": compile_result.get('error', ''),
            "return_code": compile_result['return_code']
        }), 400

    binary = compile_result.get('binary')
    if not binary:
        return jsonify({
            "output": compile_result.get('output', ''),
            "error": "Compilation failed without return code.",
            "return_code": -1
        }), 400

    # Run the code
    run_result = run_code(binary, input_data)

    return jsonify({
        "output": run_result.get('output', ''),
        "error": run_result.get('error', ''),
        "return_code": run_result['return_code']
    })

@app.route('/run-tests', methods=['POST'])
def run_tests():
    data = request.get_json()
    code = data.get('code')
    challengeIndex = data.get('challengeIndex')
    testIndex = data.get('testIndex')

    if code is None or challengeIndex is None or testIndex is None:
        return jsonify({"isCorrect": False, "error": "Missing parameters."}), 400

    try:
        challengeIndex = int(challengeIndex)
        testIndex = int(testIndex)
    except ValueError:
        return jsonify({"isCorrect": False, "error": "Invalid index values."}), 400

    # Compile the code
    compile_result = compile_code(code)
    if compile_result['return_code'] != 0:
        return jsonify({
            "isCorrect": False,
            "error": compile_result.get('error', ''),
            "return_code": compile_result['return_code']
        }), 400

    binary = compile_result.get('binary')
    if not binary:
        return jsonify({
            "isCorrect": False,
            "error": "Compilation failed without return code.",
            "return_code": -1
        }), 400

    # Load the challenge data
    try:
        with open("challengeData.json", "r") as file:
            challenges = json.load(file)
    except FileNotFoundError:
        return jsonify({"isCorrect": False, "error": "Challenge data not found."}), 500
    except json.JSONDecodeError:
        return jsonify({"isCorrect": False, "error": "Invalid challenge data format."}), 500

    try:
        test = challenges[challengeIndex]['tests'][testIndex]
    except (IndexError, KeyError):
        return jsonify({"isCorrect": False, "error": "Invalid challenge or test index."}), 400

    # Run the code with test input
    run_result = run_code(binary, test['input'])

    if run_result['return_code'] != 0:
        return jsonify({"isCorrect": False, "error": run_result.get('error', '')}), 200

    is_correct = are_equal(test['expectedOutput'], run_result['output'])

    return jsonify({"isCorrect": is_correct, "error": run_result.get('error', '')})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, threaded=True)
