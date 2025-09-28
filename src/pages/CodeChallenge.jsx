import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Editor } from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { toast } from "sonner";
import { Sun, Moon } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { ThemeContext } from "@/components/theme/ThemeContext";
import BackToChalls from "@/components/buttons/BackToChalls";
import RunCodeButton from "@/components/buttons/RunCodeButton";
import SubmitCodeButton from "@/components/buttons/SubmitCodeButton";
import challenges from "../../backend/challengeData";

const isLocal = window.location.hostname === "localhost";

const API_URL = isLocal
  ? "http://localhost:5000"
  : "https://prog-intro-lectures-api.onrender.com";

function CodeChallenge() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isWrongAnswer, setIsWrongAnswer] = useState(false);

  const { isDarkTheme } = useContext(ThemeContext);
  const [fontSize, setFontSize] = useState(16);
  const [tabSize, setTabSize] = useState(4);
  const [editorTheme, setEditorTheme] = useState(
    isDarkTheme ? "vs-dark" : "light",
  );

  const navigate = useNavigate();
  const { challengeIndex } = useParams();

  useEffect(() => {
    setEditorTheme(isDarkTheme ? "vs-dark" : "light");
  }, [isDarkTheme]);

  useEffect(() => {
    const fetchedChallenge = challenges[challengeIndex];
    if (!fetchedChallenge) {
      navigate("/");
    } else {
      setChallenge(fetchedChallenge);
      setCode(fetchedChallenge.defaultCode);
      setInput("");
      setOutput("");
      setProgress(0);
      setIsWrongAnswer(false);
      setLoading(false);
    }
  }, [challengeIndex, navigate]);

  const handleRun = async () => {
    setOutput("Running...");
    try {
      const response = await axios.post(`${API_URL}/run`, { code, input });
      setOutput(
        parseInt(response.data.return_code) === 0
          ? response.data.output
          : response.data.error,
      );
    } catch (error) {
      setOutput(error.message);
    }
  };

  const handleSubmit = async () => {
    setProgress(0);
    setIsWrongAnswer(false);
    setDisabled(true);
    setOutput("");

    let i;
    for (i = 0; i < challenge.tests.length; i++) {
      try {
        const response = await axios.post(`${API_URL}/run-tests`, {
          code,
          challengeIndex: parseInt(challengeIndex),
          testIndex: i,
        });

        if (response.data.isCorrect) {
          setProgress(((i + 1) / challenge.tests.length) * 100);
        } else {
          setOutput(
            `Wrong answer on test ${i + 1}\n\n${response.data.error || ""}`,
          );
          setIsWrongAnswer(true);
          setProgress(0);
          break;
        }
      } catch (err) {
        setOutput(err.message);
        setIsWrongAnswer(true);
        setProgress(0);
        break;
      }
    }

    if (i === challenge.tests.length) {
      toast.success("Success!", {
        description: "All tests passed!",
      });
    }
    setDisabled(false);
  };

  if (loading) {
    return (
      <div className="w-full text-center mt-20">
        <h1 className="text-2xl">Loading Challenge...</h1>
      </div>
    );
  }

  const controlClasses =
    "w-20 h-9 text-sm rounded-md border border-gray-400 dark:border-gray-600 bg-gray-200 dark:bg-gray-800 text-center focus:outline-none focus:ring-2 focus:ring-sky-500";
  const fontSizes = [12, 14, 16, 18, 20, 22, 24, 28, 32];

  return (
    <>
      <BackToChalls />
      <div className="container mx-auto px-4 mt-12 sm:mt-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold">
          {challenge.problemTitle}
        </h1>
        <hr className="my-6" />
      </div>

      <div className="w-11/12 md:w-10/12 lg:w-4/5 mx-auto my-8 flex flex-col">
        <div className="flex flex-wrap items-center justify-between gap-4 p-2 bg-gray-300 dark:bg-gray-700 rounded-t-lg">
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex flex-col items-center">
              <label
                htmlFor="fontSize"
                className="text-xs font-medium mb-1.5 text-gray-800 dark:text-gray-200"
              >
                Font Size
              </label>
              <select
                id="fontSize"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className={controlClasses}
              >
                {fontSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}px
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col items-center">
              <label
                htmlFor="theme-toggle"
                className="text-xs font-medium mb-1.5 text-gray-800 dark:text-gray-200"
              >
                Theme
              </label>
              <button
                id="theme-toggle"
                onClick={() =>
                  setEditorTheme((prev) =>
                    prev === "light" ? "vs-dark" : "light",
                  )
                }
                className={`${controlClasses} flex items-center justify-center`}
                aria-label="Toggle editor theme"
              >
                {editorTheme === "light" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            </div>

            <div className="flex flex-col items-center">
              <label
                htmlFor="tabSize"
                className="text-xs font-medium mb-1.5 text-gray-800 dark:text-gray-200"
              >
                Tab Size
              </label>
              <select
                id="tabSize"
                value={tabSize}
                onChange={(e) => setTabSize(Number(e.target.value))}
                className={controlClasses}
              >
                <option value="2">2</option>
                <option value="4">4</option>
              </select>
            </div>
          </div>

          <div className="flex">
            <RunCodeButton onClick={handleRun} disabled={disabled} />
            <SubmitCodeButton onClick={handleSubmit} disabled={disabled} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-0.5 bg-gray-500 rounded-b-lg overflow-hidden">
          <div className="w-full lg:w-2-3 h-[600px] lg:h-auto">
            <Editor
              defaultLanguage="c"
              value={code}
              onChange={(value) => setCode(value)}
              theme={editorTheme}
              options={{
                fontSize: fontSize,
                tabSize: tabSize,
                minimap: { enabled: false },
              }}
            />
          </div>

          <div className="w-full lg:w-1/3 flex flex-col bg-white dark:bg-[#1e1e1e]">
            <div className="p-3 border-b border-gray-300 dark:border-gray-600">
              <h3 className="font-bold mb-2 text-lg">Problem</h3>
              <div className="prose prose-sm dark:prose-invert max-h-60 overflow-y-auto">
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                >
                  {challenge.problem}
                </ReactMarkdown>
              </div>
            </div>
            <div className="p-3 border-b border-gray-300 dark:border-gray-600">
              <h3 className="font-bold mb-2">Input</h3>
              <textarea
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter input for your program (if needed)"
                className="w-full resize-none min-h-[60px] p-2 bg-gray-200/50 dark:bg-gray-800/50 border border-gray-400 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder-black/60 dark:placeholder-white/60"
              />
            </div>
            <div className="p-3 border-b border-gray-300 dark:border-gray-600 flex-grow">
              <h3 className="font-bold mb-2">Output</h3>
              <pre className="w-full min-h-[60px] p-2 bg-gray-200/50 dark:bg-gray-800/50 border border-gray-400 dark:border-gray-600 rounded-md whitespace-pre-wrap break-words">
                {output}
              </pre>
            </div>
            <div className="p-3">
              <h3 className="font-bold mb-2">Tests</h3>
              <Progress
                value={progress}
                className={isWrongAnswer ? "bg-red-500" : ""}
              />
              <p className="text-sm text-right mt-1">{Math.round(progress)}%</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CodeChallenge;
