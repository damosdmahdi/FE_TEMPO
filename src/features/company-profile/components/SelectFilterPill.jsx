import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from 'hmik-project-storybook';
import './SelectFilterPill.css';

function SelectFilterPill({ label, options = [], selectedValue, onChange, defaultLabel = "Semua" }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (val) => {
    onChange(val);
    setIsOpen(false);
  };

  const displayLabel = selectedValue ? `${label}: ${selectedValue}` : label;

  return (
    <div className="select-filter-container" ref={dropdownRef}>
      <button 
        type="button"
        className={`select-filter-pill ${isOpen ? 'is-open' : ''} ${selectedValue ? 'has-value' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="select-filter-label">{displayLabel}</span>
        <div className={`select-filter-icon ${isOpen ? 'rotate' : ''}`}>
          <ChevronDownIcon width={12} height={12} />
        </div>
      </button>

      {isOpen && (
        <div className="select-filter-dropdown">
          <div 
            className={`select-filter-option ${!selectedValue ? 'active' : ''}`}
            onClick={() => handleSelect('')}
          >
            {defaultLabel} {label}
          </div>
          {options.map((opt, idx) => (
            <div 
              key={idx}
              className={`select-filter-option ${selectedValue === opt ? 'active' : ''}`}
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SelectFilterPill;
