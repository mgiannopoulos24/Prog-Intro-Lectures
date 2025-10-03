import React, { useState, useEffect, useRef } from "react";

const Terminal = ({ onClose }) => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([
    "Welcome to the Prog Intro Lectures Terminal!",
    "Type `help` to see a list of available commands.",
    "------------------------------------------------",
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef(null);
  const commandCancelledRef = useRef(false);

  useEffect(() => {
    inputRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "c") {
        e.preventDefault();
        handleCtrlC();
      } else if (e.ctrlKey && e.key === "d") {
        e.preventDefault();
        onClose();
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [onClose]);

  const handleCtrlC = () => {
    if (isProcessing) {
      commandCancelledRef.current = true;
    }
    setOutput((prev) => [...prev, "^C"]);
    setIsProcessing(false);
    setInput("");

    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && !isProcessing) {
      e.preventDefault();
      const command = input.trim().toLowerCase();
      processCommand(command);
      setInput("");
    }
  };

  const getPrompt = () => (
    <span>
      <span className="text-green-400">Student</span>
      <span className="text-blue-400">@</span>
      <span className="text-purple-400">DIT</span>
      <span className="text-white">:</span>
      <span className="text-blue-400">~</span>
      <span className="text-white">$ </span>
    </span>
  );

  const fetchFortune = async () => {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      return `${data.content}\n\n— ${data.author}`;
    } catch (error) {
      console.error("Fortune API Error:", error);
      return "Fortune telling failed. The network spirits are not responding.";
    }
  };

  const processCommand = async (command) => {
    commandCancelledRef.current = false;

    const commandElement = (
      <div key={`prompt-${Date.now()}`} className="flex font-code">
        {getPrompt()}
        <span>{command}</span>
      </div>
    );
    setOutput((prev) => [...prev, commandElement]);

    switch (command) {
      case "help":
        const helpText = [
          "Available commands:",
          "  help     - Shows this list of commands",
          "  clear    - Clears the terminal screen",
          "  cowsay   - A friendly cow will say hi!",
          "  creators - See who made this website",
          "  truth    - Question reality",
          "  fortune  - Get a random fortune quote",
          "  exit     - Closes the terminal",
          "",
          "Keyboard shortcuts:",
          "  Ctrl+C   - Interrupt any running command",
          "  Ctrl+D   - Close the terminal",
          "  Escape   - Close the terminal",
        ];
        setOutput((prev) => [...prev, ...helpText]);
        break;

      case "clear":
        setOutput([]);
        break;

      case "cowsay":
        const cow = [
          "  _____________",
          "< Hello, student! >",
          "  -------------",
          "        \\   ^__^",
          "         \\  (oo)\\_______",
          "            (__)\\       )\\/\\",
          "                ||----w |",
          "                ||     ||",
        ];
        setOutput((prev) => [...prev, ...cow]);
        break;

      case "creators":
        setOutput((prev) => [
          ...prev,
          "This website was designed and developed by matinanadali and mgiannopoulos24.",
        ]);
        break;

      case "truth":
        setOutput((prev) => [...prev, "Is any of it real?..."]);
        break;

      case "fortune":
        setIsProcessing(true);
        setOutput((prev) => [...prev, "Consulting the digital oracle..."]);
        const fortune = await fetchFortune();

        if (commandCancelledRef.current) {
        } else {
          setOutput((prev) => [...prev, fortune]);
        }
        setIsProcessing(false);
        setTimeout(() => inputRef.current?.focus(), 10);
        break;

      case "exit":
        onClose();
        return;

      default:
        if (command) {
          setOutput((prev) => [...prev, `Command not found: ${command}`]);
        }
        break;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center font-code"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="w-11/12 h-5/6 md:w-2/3 md:h-2/3 bg-black text-white font-code rounded-lg shadow-xl overflow-hidden flex flex-col">
        <div className="bg-gray-800 p-2 flex items-center font-code">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="flex-1 text-center text-sm">Terminal</span>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white pr-2"
          >
            ✖
          </button>
        </div>
        <div className="flex-1 p-4 overflow-y-auto font-code">
          {output.map((line, index) => (
            <div key={index} className="whitespace-pre-wrap font-code">
              {React.isValidElement(line) ? (
                line
              ) : (
                <p className="font-code">{line}</p>
              )}
            </div>
          ))}
          {!isProcessing && (
            <div className="flex font-code">
              {getPrompt()}
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                className="bg-transparent border-none text-white w-full focus:outline-none font-code"
                autoComplete="off"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Terminal;
