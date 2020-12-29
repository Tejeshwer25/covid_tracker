import React from 'react';
import {func, string} from 'prop-types';
import "./Toggle.css"

function Toggle({theme, toggleTheme}) {
    const isLight = theme === 'light';

    return (
        <button className="toggle" onClick={toggleTheme}>
            {isLight ? 'Light' : 'Dark'} theme is active!
        </button>
    );
};

Toggle.propTypes = {
    theme: string.isRequired,
    toggleTheme: func.isRequired,
}

export default Toggle;