import { useState } from 'react';
import './styles/OnlineCompiler.css';
import Editor from "@monaco-editor/react";
import Axios from 'axios';
import BackButton from '../components/buttons/BackToMain';
import spinner from '../assets/spinner.svg';
import Footer from '../components/layout/Footer';

const OnlineCompiler = () => {
    // State variable to set users source code
    const [userCode, setUserCode] = useState(``);

    // State variable to set editors default language
    // const [userLang, setUserLang] = useState("c");

    // State variable to set users input
    const [userInput, setUserInput] = useState("");

    // State variable to set users output
    const [userOutput, setUserOutput] = useState("");

    // Loading state variable to show spinner
    // while fetching data
    const [loading, setLoading] = useState(false);

    const options = {
        fontSize: '20',
        minimap: {
            enabled: false, // Disable the minimap
        },
    }

    // Function to call the compile endpoint
    function compile() {
        setLoading(true);

        // Post request to compile endpoint
        Axios.post(`https://progintrolectures.netlify.app/.netlify/functions/compile`, {
            code: userCode,
            language: "c",
            input: userInput
        }).then((res) => {
            setLoading(false);
            setUserOutput(res.data.stdout || res.data.stderr);
        }).then(() => {
            setLoading(false);
        }).catch((err) => {
            console.error(err);
            setUserOutput("Error: " + (err.response ? err.response.data.error : err.message));
            setLoading(false);
        });
    }

    // Function to clear the output screen
    function clearOutput() {
        setUserOutput("");
    }

    return (
        <div className="OnlineCompiler">
            <BackButton />
            <div className="container mt-5">
                <div className="text-center">
                    <h1>Online Compiler</h1>
                    <h3>Time for some practice!</h3>
                    <hr className="my-4" />
                </div>      
            </div>
            <div className="main">
                <div className="left-container">
                    <Editor
                        options={options}
                        height="70vh"
                        width="100%"
                        minWidth="0"
                        theme='vs-dark'
                        language="c"
                        defaultLanguage="c"
                        defaultValue="// Enter your code here"
                        onChange={(value) => { setUserCode(value) }}
                        flexShrink={1}
                    />
                    <button className="run-btn" onClick={() => compile()}>
                        Run
                    </button>
                </div>
                <div className="right-container">
                    <h4>Input:</h4>
                    <div className="input-box">
                        <textarea id="code-inp" onChange=
                            {(e) => setUserInput(e.target.value)}>
                        </textarea>
                    </div>
                    <h4>Output:</h4>
                    {loading ? (
                        <div className="spinner-box">
                           <img src={spinner} alt="spinner" />
                        </div>
                    ) : (
                        <div className="output-box">
                            <pre>{userOutput}</pre>
                            <button onClick={() => { clearOutput() }}
                                className="clear-btn">
                                Clear
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default OnlineCompiler;