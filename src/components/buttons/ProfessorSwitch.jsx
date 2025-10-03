import React from "react";
import styled from "styled-components";

const ProfessorSwitch = ({ value, onChange }) => {
  const isToggled = value === "prof2";

  const handleChange = () => {
    onChange(isToggled ? "prof1" : "prof2");
  };

  return (
    <StyledWrapper>
      <label className="simple-switch" aria-label="Toggle Professor">
        <input
          type="checkbox"
          className="simple-switch__checkbox"
          checked={isToggled}
          onChange={handleChange}
        />
        <div className="simple-switch__container">
          <div className="simple-switch__thumb" />
        </div>
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  // Configurable variables
  --switch-width: 3.5rem;
  --switch-height: 1.75rem;
  --thumb-diameter: 1.3rem;
  --padding: 0.225rem; // (height - thumb) / 2
  --thumb-movement: calc(
    var(--switch-width) - var(--thumb-diameter) - (2 * var(--padding))
  );

  --track-off-color: #cbd5e1; // slate-300
  --track-on-color: #38bdf8; // sky-400
  --thumb-color: #ffffff;

  .dark {
    --track-off-color: #475569; // slate-600
    --track-on-color: #0ea5e9; // sky-500
    --thumb-color: #e2e8f0; // slate-200
  }

  .simple-switch {
    display: inline-block;
    cursor: pointer;
    user-select: none;
  }

  .simple-switch__checkbox {
    display: none;
  }

  .simple-switch__container {
    width: var(--switch-width);
    height: var(--switch-height);
    background-color: var(--track-off-color);
    border-radius: 9999px;
    position: relative;
    padding: var(--padding);
    transition: background-color 0.2s ease-in-out;
  }

  .simple-switch__checkbox:checked + .simple-switch__container {
    background-color: var(--track-on-color);
  }

  .simple-switch__thumb {
    width: var(--thumb-diameter);
    height: var(--thumb-diameter);
    background-color: var(--thumb-color);
    border-radius: 50%;
    position: absolute;
    top: var(--padding);
    left: var(--padding);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-in-out;
  }

  .simple-switch__checkbox:checked
    + .simple-switch__container
    .simple-switch__thumb {
    transform: translateX(var(--thumb-movement));
  }
`;

export default ProfessorSwitch;
