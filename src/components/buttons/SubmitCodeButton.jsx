import React from "react";
import styled from "styled-components";
import { useContext } from "react";
import { ThemeContext } from "../theme/ThemeContext";

const SubmitCodeButton = ({ onClick, disabled }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  return (
    <StyledWrapper>
      <span className={`buttonContainer ${disabled ? "disabled" : ""}`}>
        <button
          disabled={disabled}
          onClick={onClick}
          className={`button ${isDarkTheme === "true" ? "dark-mode" : ""}`}
        >
          <span className="button-content">Submit </span>
        </button>
      </span>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button {
    position: relative;
    overflow: hidden;
    height: 3rem;
    padding: 0 1rem;
    border-radius: 0.5rem;
    background: #76bdd5;
    background-size: 400%;
    color: #fff;
    border: none;
    cursor: pointer;
    box-shadow: 2px 1px 5px -2px black;
  }

  .button.dark-mode {
    background: #1a4e63;
  }

  .button-content {
    position: relative;
    z-index: 1;
  }

  .button:hover {
    background:
      linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)),
      #76bdd5;
    transition: all 0.4s;
  }

  .button.dark-mode:hover {
    background:
      linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)),
      #1a4e63;
    transition: all 0.4s;
  }

  .button:active {
    box-shadow: none;
  }

  .button:disabled {
    pointer-events: none;
  }

  .buttonContainer.disabled {
    cursor: not-allowed;
  }
`;

export default SubmitCodeButton;
