import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { ThemeContext } from '../components/buttons/ThemeContext';
import axios from 'axios'; 

import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'

import Editor from '@monaco-editor/react'
import BackButton from '../components/buttons/BackToMain';
import Grid from '@mui/material/Grid2';
import LinearWithValueLabel from '../components/other/LinearProgressWithLabel';
import SubmitCodeButton from '../components/buttons/SubmitCodeButton';
import RunCodeButton from '../components/buttons/RunCodeButton';
import './styles/CodeChallenge.css';
import challenges from '../utils/challengeData';

function CodeChallenge() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [input, setInput] = useState('');
  const [defaultCode, setDefaultCode] = useState('');
  
  const { isDarkTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { challengeIndex } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const fetchedChallenge = challenges[challengeIndex];

      // If the problem doesn't exist
      if (!fetchedChallenge) {
        navigate('/');  // Navigate to home or error page
      } else {
        setChallenge(fetchedChallenge);  // Set the problem data
        setDefaultCode(fetchedChallenge['defaultCode'])
        setLoading(false);           // Stop loading
      }
    }, 1000);  // Simulating 1-second delay for data fetch

    return () => clearTimeout(timeoutId);  // Cleanup timeout on unmount
  }, [challengeIndex, navigate]);

  const handleRun = async () => {
    setOutput("");
    try {
      const response = await axios.post('http://localhost:5000/run', {
        code: code,
        input: input
      });
      if (response.data.return_code == '0') {
        setOutput(response.data.output);
      } else {
        setOutput(response.data.error);
      }
    } catch (error) {
      console.log(error);
      setOutput(error.message);
    }
  };

  const [progress, setProgress] = useState(0); // Progress in percentage
  const [error, setError] = useState("");
  
  const handleSubmit = async () => {
      for (let i = 0; i < challenges[challengeIndex]['tests'].length; i++) {
        try {
          // Send code and challengeIndex to start tests
          const response = await axios.post('http://localhost:5000/run-tests', {
              code: code,
              challengeIndex: parseInt(challengeIndex), // Ensure this is an integer
              testIndex: i
          });

          if (response.data.isCorrect === true) {
            setProgress(100 * (i+1) / challenges[challengeIndex]['tests'].length);
          } else {
            setProgress(0);
            if (response.data.error != "") {
              setOutput(response.data.error);
            } else {
              setOutput(`Wrong answer on test ${i+1}`);
            }
            
            return;
          }
        } catch (err) {
            console.error('Error running tests', err);
            setError('Failed to start the test process.');
        }

    }
  };

  if (loading) {
    return (
      <>
      <BackButton />
        <div className="container mt-5">
            <div className="text-center">
                <h1>Coding Challenges</h1>
                <h3>Time for some practice!</h3>
                <hr className="my-4" />
            </div>      
        </div>
        <div className='loading'>Loading...</div>
      </>
    )
  }

  // Auto-resizable text area
  document.querySelectorAll("textarea").forEach(function(textarea) {
    textarea.style.height = textarea.scrollHeight + "px";
    textarea.style.overflowY = "hidden";
  
    textarea.addEventListener("input", function() {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    });
  });

  return (
    <>
        <BackButton />
        <div className="container mt-5">
            <div className="text-center">
                <h1>Coding Challenges</h1>
                <h3>Time for some practice!</h3>
                <hr className="my-4" />
            </div>      
        </div>
      <div className='onlineCompiler'>  
        <Grid className="controlBar" item size={{ xs: 12, md: 12, lg: 12}}>
              <RunCodeButton onClick={handleRun} />
              <SubmitCodeButton onClick={handleSubmit} />
        </Grid>
        <Grid className="editorContainer" container spacing='5px' style={{backgroundColor: "grey"}}>
          
          <Grid item size={{ xs: 12, md: 12, lg: 8}} >
            <Editor
              width= "100%"
              defaultLanguage="c"
              defaultValue= {defaultCode}
              onChange={(value) => setCode(value)}
              loading=""
              theme={isDarkTheme === 'true' ? 'vs-dark' : 'white'}
              options={{
                fontSize: 18,
                minimap: {
                  enabled:false
                }
              }}
            />
          </Grid>
          <Grid item size={{ xs: 12, md: 12, lg: 4}}>
              <div className={`ioOuterContainer ${isDarkTheme === 'true' ? 'dark-mode' : ''}`}>
              <div className='ioContainer' style={{flexGrow: 0}}>
                <h3>{challenges[challengeIndex]['problemTitle']}</h3>
                <ReactMarkdown remarkPlugins={[ remarkMath ]} rehypePlugins={[ rehypeKatex ]}>{challenge['problem']}</ReactMarkdown>
              </div>
              <div className='ioContainer'>
                <h3>Input</h3>
                <textarea onChange={(e)=>setInput(e.target.value)} className="ioBox" multiline placeholder="Insert input for your program (if necessary)"></textarea>
              </div>
              <div className='ioContainer'>
                <h3>Output</h3>
                <pre className="ioBox">{output}</pre>
              </div>
              <div className='ioContainer testContainer' style={{flexGrow: 1}}>
                <h3>Tests</h3>
                <LinearWithValueLabel progress={progress} />
              </div>
              </div>
          </Grid>
        </Grid>
    </div>
    </>
  );
}

export default CodeChallenge;
