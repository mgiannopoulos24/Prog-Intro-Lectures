import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ThemeContext } from "../components/buttons/ThemeContext";
import axios from "axios";

import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

import Editor from "@monaco-editor/react";
import BackButton from "../components/buttons/BackToMain";
import BackToChalls from '../components/buttons/BackToChalls';
import Grid from "@mui/material/Grid2";
import LinearWithValueLabel from "../components/other/LinearProgressWithLabel";
import SubmitCodeButton from "../components/buttons/SubmitCodeButton";
import RunCodeButton from "../components/buttons/RunCodeButton";
import FeedbackAlert from "../components/other/FeedbackAlert";
import "./styles/CodeChallenge.css";
import challenges from "../backend/challengeData";
import { Alert } from "@mui/material";

function CodeChallenge() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [defaultCode, setDefaultCode] = useState("");

  const { isDarkTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { challengeIndex } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [openFeedback, setOpenFeedback] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const fetchedChallenge = challenges[challengeIndex];

      // If the problem doesn't exist
      if (!fetchedChallenge) {
        navigate("/"); // Navigate to home or error page
      } else {
        setInput("");
        setOutput("");
        setProgress(0);
        setWrongAnswer(false);
        setOpenFeedback(false);
        setChallenge(fetchedChallenge); // Set the problem data
        setDefaultCode(fetchedChallenge["defaultCode"]);
        setCode(fetchedChallenge["defaultCode"]);
        setLoading(false); // Stop loading
      }
    }, 1000); // Simulating 1-second delay for data fetch

    return () => clearTimeout(timeoutId); // Cleanup timeout on unmount
  }, [challengeIndex, navigate]);

  const handleRun = async () => {
    setOutput("");
    try {
      const response = await axios.post(
        "https://prog-intro-lectures-lidq.onrender.com/run",
        {
          code: code,
          input: input,
        }
      );
      if (parseInt(response.data.return_code) === 0) {
        setOutput(response.data.output);
      } else {
        setOutput(response.data.error);
      }
    } catch (error) {
      setOutput(error.message);
    }
  };

  const [progress, setProgress] = useState(0); // Progress in percentage

  const handleSubmit = async () => {
    setProgress(0);
    setDisabled(true);
    setOutput("");
    setWrongAnswer(false);
    let i;
    for (i = 0; i < challenges[challengeIndex]["tests"].length; i++) {
      try {
        // Send code and challengeIndex to start tests
        const response = await axios.post(
          "https://prog-intro-lectures-lidq.onrender.com/run-tests",
          {
            code: code,
            challengeIndex: parseInt(challengeIndex), // Ensure this is an integer
            testIndex: i,
          }
        );

        if (response.data.isCorrect === true) {
          setProgress(
            (100 * (i + 1)) / challenges[challengeIndex]["tests"].length
          );
        } else {
          setProgress(0);
          if (response.data.error !== "") {
            setOutput(response.data.error);
          } else {
            setWrongAnswer(true);
            setOutput(`Wrong answer on test ${i + 1}`);
          }
          break;
        }
      } catch (err) {
        setOutput(err.message);
        break;
      }
    }
    if (i === challenges[challengeIndex]["tests"].length) {
      setOpenFeedback(true);
    }
    setDisabled(false);
  };

  if (loading) {
    return (
      <>
        <BackButton />
        <div className="container mt-5">
          <div className="text-center">
            <h1>Coding Challenges</h1>
            <h3>Ώρα για εξάσκηση!</h3>
            <hr className="my-4" />
          </div>
        </div>
        <div className="loading">Loading...</div>
      </>
    );
  }

  // Auto-resizable text area
  document.querySelectorAll("textarea").forEach(function (textarea) {
    textarea.style.height = textarea.scrollHeight + "px";
    textarea.style.overflowY = "hidden";

    textarea.addEventListener("input", function () {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    });
  });

  return (
    <>
      <BackToChalls />
      <FeedbackAlert open={openFeedback} setOpen={setOpenFeedback} />
      <div className="container mt-5">
        <div className="text-center">
          <h1>Coding Challenges</h1>
          <h3>Ώρα για εξάσκηση!</h3>
          <hr className="my-4" />
        </div>
        <div className="row">
          <Alert severity="warning" style={{"opacity":"75%"}}>
            <strong>Σημείωση:</strong> Αν το κουμπί 'Run' δεν ανταποκρίνεται, δοκιμάστε να ανανεώσετε τη σελίδα. Αν εξακολουθεί να μην λειτουργεί, το ζήτημα μπορεί να οφείλεται σε καθυστέρηση στη φόρτωση.
          </Alert>
        </div>
      </div>
      
      <div className="onlineCompiler">
        <Grid className="controlBar" item size={{ xs: 12, md: 12, lg: 12 }}>
          <RunCodeButton onClick={handleRun} />
          <SubmitCodeButton onClick={handleSubmit} disabled={disabled} />
        </Grid>
        <Grid
          className="editorContainer"
          container
          spacing="5px"
          style={{ backgroundColor: "grey" }}
        >
          <Grid
            item
            size={{ xs: 12, md: 12, lg: 8 }}
            style={{ minHeight: "400px" }}
          >
            <Editor
              width="100%"
              defaultLanguage="c"
              defaultValue={defaultCode}
              value={code}
              height="100%"
              onChange={(value) => setCode(value)}
              loading=""
              theme={isDarkTheme === "true" ? "vs-dark" : "white"}
              options={{
                fontSize: 16,
                padding: {
                  top: "8px",
                },
                minimap: {
                  enabled: false,
                },
              }}
            />
          </Grid>
          <Grid item size={{ xs: 12, md: 12, lg: 4 }}>
            <div
              className={`ioOuterContainer ${
                isDarkTheme === "true" ? "dark-mode" : ""
              }`}
            >
              <div className="ioContainer" style={{ flexGrow: 0 }}>
                <h3>{challenges[challengeIndex]["problemTitle"]}</h3>
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                >
                  {challenge["problem"]}
                </ReactMarkdown>
              </div>
              <div className="ioContainer">
                <h3>Input</h3>
                <textarea
                  onChange={(e) => setInput(e.target.value)}
                  className="ioBox"
                  multiline
                  placeholder="Insert input for your program (if necessary)"
                ></textarea>
              </div>
              <div className="ioContainer">
                <h3>Output</h3>
                <pre className="ioBox">{output}</pre>
              </div>
              <div
                className="ioContainer testContainer"
                style={{ flexGrow: 1 }}
              >
                <h3>Tests</h3>
                <LinearWithValueLabel
                  progress={progress}
                  wrongAnswer={wrongAnswer}
                />
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default CodeChallenge;
