import React from 'react';
import { SearchIcon } from 'hmik-project-storybook';
import './SearchInputPill.css';

function SearchInputPill({ value, onChange, placeholder = "Cari Anggota" }) {
  return (
    <div className="search-input-pill">
      <div className="search-input-icon-wrapper">
        <SearchIcon width={18} height={18} />
      </div>
      <input
        type="text"
        className="search-input-field"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button className="search-input-clear-btn" onClick={() => onChange('')} title="Hapus">
          &times;
        </button>
      )}
    </div>
  );
}

export default SearchInputPill;
