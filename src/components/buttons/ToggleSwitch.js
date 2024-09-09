import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import './ToggleSwitch.css';

const ToggleSwitch = ({ onChange, defaultChecked }) => {
  const [isChecked, setIsChecked] = useState(() => {
    
    const savedPreference = localStorage.getItem('dark-mode');
    return savedPreference === 'true' ? true : defaultChecked ?? false;
  });

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isChecked);
    
    localStorage.setItem('dark-mode', isChecked);
  }, [isChecked]);

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
    onChange?.(!isChecked);
  };

  return (
    <label className={`toggle-switch ${isChecked ? 'day' : 'night'}`}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="sr-only"
      />
      <div className={`slider ${isChecked ? 'checked' : ''}`}>
        <FaSun className={`icon sun ${isChecked ? 'visible' : 'hidden'}`} />
        <FaMoon className={`icon moon ${isChecked ? 'hidden' : 'visible'}`} />
      </div>
    </label>
  );
};

export default ToggleSwitch;