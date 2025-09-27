import React, { useState, useEffect, useRef } from "react";

const Terminal = ({ onClose }) => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([
    "Welcome to the Prog Intro Lectures Terminal!",
    "Type `help` to see a list of available commands.",
    "------------------------------------------------",
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const inputRef = useRef(null);
  const typeIntervalRef = useRef(null);
  const commandCancelledRef = useRef(false);

  useEffect(() => {
    inputRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "c") {
        e.preventDefault();
        e.stopPropagation();
        handleCtrlC();
      } else if (e.ctrlKey && e.key === "d") {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        onClose();
        return false;
      } else if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
      if (typeIntervalRef.current) {
        clearInterval(typeIntervalRef.current);
      }
    };
  }, [onClose]);

  const handleCtrlC = () => {
    commandCancelledRef.current = true;

    if (isTyping) {
      if (typeIntervalRef.current) {
        clearInterval(typeIntervalRef.current);
        typeIntervalRef.current = null;
      }

      setOutput((prev) => {
        const newOutput = [...prev];
        newOutput[newOutput.length - 1] += "^C";
        newOutput.push("");
        return newOutput;
      });
    } else {
      setOutput((prev) => [...prev, "^C"]);
    }

    setIsTyping(false);
    setShowPrompt(true);
    setInput("");

    setTimeout(() => {
      inputRef.current?.focus();

      commandCancelledRef.current = false;
    }, 100);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && !isTyping) {
      const command = input.trim().toLowerCase();
      processCommand(command);
      setInput("");
    }
  };

  const getPrompt = () => {
    return (
      <span>
        <span className="text-green-400">Student</span>
        <span className="text-blue-400">@</span>
        <span className="text-purple-400">DIT</span>
        <span className="text-white">:</span>
        <span className="text-blue-400">~</span>
        <span className="text-white">$ </span>
      </span>
    );
  };

  const typeMessage = (message, callback) => {
    setIsTyping(true);
    setShowPrompt(false);
    let currentMessage = "";
    let index = 0;

    typeIntervalRef.current = setInterval(() => {
      if (commandCancelledRef.current) {
        clearInterval(typeIntervalRef.current);
        typeIntervalRef.current = null;
        return;
      }

      currentMessage += message[index];
      setOutput((prev) => {
        const newOutput = [...prev];
        newOutput[newOutput.length - 1] = currentMessage;
        return newOutput;
      });
      index++;

      if (index >= message.length) {
        clearInterval(typeIntervalRef.current);
        typeIntervalRef.current = null;
        setIsTyping(false);
        setShowPrompt(true);
        if (callback && !commandCancelledRef.current) callback();
      }
    }, 100);
  };

  const fetchFortune = async () => {
    try {
      const response = await fetch("http://api.quotable.io/random");
      const data = await response.json();
      return `${data.content}\n\n— ${data.author}`;
    } catch (error) {
      return "Fortune telling failed. The network spirits are not responding.";
    }
  };

  const processCommand = async (command) => {
    commandCancelledRef.current = false;

    let newOutput = [...output];
    newOutput.push(
      <div key={`prompt-${Date.now()}`} className="flex font-code">
        {getPrompt()}
        <span>{command}</span>
      </div>,
    );

    switch (command) {
      case "help":
        newOutput.push(
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
        );
        setOutput(newOutput);
        break;
      case "clear":
        newOutput = [];
        setOutput(newOutput);
        break;
      case "cowsay":
        newOutput.push(
          "  _____________",
          "< Hello, student! >",
          "  -------------",
          "        \\   ^__^",
          "         \\  (oo)\\_______",
          "            (__)\\       )\\/\\",
          "                ||----w |",
          "                ||     ||",
        );
        setOutput(newOutput);
        break;
      case "creators":
        newOutput.push(
          "This website was designed and developed by matinanadali and mgiannopoulos24.",
        );
        setOutput(newOutput);
        break;
      case "truth":
        newOutput.push("");
        setOutput(newOutput);
        typeMessage(`Is any of it real?...`);
        break;
      case "fortune":
        newOutput.push("Consulting the digital oracle...");
        setOutput(newOutput);

        const fortune = await fetchFortune();

        if (commandCancelledRef.current) {
          return;
        }

        newOutput = [...output];
        newOutput.push(
          <div key={`prompt-${Date.now()}`} className="flex font-code">
            {getPrompt()}
            <span>{command}</span>
          </div>,
        );
        newOutput.push("Consulting the digital oracle...");
        newOutput.push("");
        setOutput(newOutput);

        if (!commandCancelledRef.current) {
          typeMessage(fortune);
        }
        break;
      case "exit":
        onClose();
        return;
      default:
        newOutput.push(`Command not found: ${command}`);
        setOutput(newOutput);
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
          {showPrompt && (
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
                disabled={isTyping}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Terminal;
