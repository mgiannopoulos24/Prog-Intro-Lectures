import React, { useState } from 'react';
import axios from 'axios';  // To make HTTP requests
import Editor from '@monaco-editor/react'

function App() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('https://online-compiler-czaf.onrender.com/compile', {
        code: code  // Sending the input code to backend API
      });

      setOutput(response.data.output);  // Displaying the output returned by the API
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      setOutput("An error occurred.");
    }
  };

  return (
    <>
        <div className="container mt-5">
            <div className="text-center">
                <h1>Online Compiler</h1>
                <h3>Time for some practice!</h3>
                <hr className="my-4" />
            </div>      
        </div>
        <Editor
            height="90vh"
            defaultLanguage="javascript"
            defaultValue="// some comment"
        />
    </>
  );
}

export default App;
