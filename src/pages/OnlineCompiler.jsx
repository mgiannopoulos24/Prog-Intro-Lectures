import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';  // To make HTTP requests
import Editor from '@monaco-editor/react'
import { Button } from '@mui/material'
import BackButton from '../components/buttons/BackToMain';
import './styles/OnlineCompiler.css'
import Grid from '@mui/material/Grid2';
import { ThemeContext } from '../components/buttons/ThemeContext';

function App() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [bgColor, setBgColor] = useState("#fefcff");
  const { isDarkTheme } = useContext(ThemeContext);

  useEffect(() => {
    console.log(bgColor);
    setBgColor(isDarkTheme === 'false' ? "#1e1e1e" : "#fefcff");
  }, [bgColor, isDarkTheme]);
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('https://online-compiler-czaf.onrender.com/compile', {
        code: code  // Sending the input code to backend API
      });

      setOutput(response.data.output);  // Displaying the output returned by the API
    } catch (error) {
      console.log(error);
      setOutput(error.message);
    }
  };

  const defaultCode = `#include <stdio.h>
// code here`;

  return (
    <div className='onlineCompiler'>  
        <BackButton />
        <div className="container mt-5">
            <div className="text-center">
                <h1>Coding Challenges</h1>
                <h3>Time for some practice!</h3>
                <hr className="my-4" />
            </div>      
        </div>
        <Grid className="controlBar" item size={{ xs: 12, md: 12, lg: 12}}>
              <Button variant="contained"  onClick={handleSubmit} sx={{color: 'white', backgroundColor: isDarkTheme === 'true' ? "#76bdd5" : "#1a4e63"}}>Submit</Button>
        </Grid>
        <Grid className="editorContainer" container spacing='5px' style={{backgroundColor: "grey"}}>
          
          <Grid item size={{ xs: 12, md: 12, lg: 8}} >
            <Editor
              width= "100%"
              defaultLanguage="c"
              defaultValue= {defaultCode}
              onChange={(value) => setCode(value)}
              theme={isDarkTheme === 'false' ? 'vs-dark' : 'white'}
              options={{
                fontSize: 18,
                minimap: {
                  enabled:false
                }
              }}
            />
          </Grid>
          <Grid item size={{ xs: 12, md: 12, lg: 4}} sx={{flexGrow: '1', minHeight: "400px"}}>
              <div className='ioBox' style={{borderBottom: "5px solid grey", backgroundColor: bgColor}}>
                <h2>Problem Statement</h2>
                <div>Γράψτε μία συνάρτηση που να τυπώνει "Hello World!"</div>
              </div>
              <div className='ioBox' style={{backgroundColor: bgColor}}>
                <h2>Tests</h2>
                <div>{output}</div>
              </div>
          </Grid>
        </Grid>
    </div>
  );
}

export default App;
