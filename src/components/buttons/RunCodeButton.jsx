import React from "react";
import styled from "styled-components";
import { useContext } from "react";
import { ThemeContext } from './ThemeContext';

const RunCodeButton = ({ onClick }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  return (
    <StyledWrapper>
      <button onClick={onClick} className={`button ${isDarkTheme === 'true' ? "dark-mode" : ""}`}>
        <span className="button-content">Run </span>
      </button>
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
  border: 3px solid #76bdd5;
  background: none;
  background-size: 400%;
  color: #76bdd5;
  cursor: pointer;
  margin: 0 1rem;
  box-shadow: 2px 1px 5px -2px black;
}

.button.dark-mode {
  border: 3px solid #1a4e63;
  color: #1a4e63;
}

.button-content {
  position: relative;
  z-index: 1;
}

.button:hover {
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.4s;
}

.button:active {
  box-shadow: none;
}

`;

export default RunCodeButton;

