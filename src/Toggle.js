import React from 'react';
import {func, string} from 'prop-types';
import styled from 'styled-components';
import "./Toggle.css"

function Toggle({theme, toggleTheme}) {
    const isLight = theme === 'light';

    return (
        <button className="toggle" onClick={toggleTheme}>
            {theme === 'light' ? 'Light' : 'Dark'} theme is active!
        </button>
    );
};

Toggle.propTypes = {
    theme: string.isRequired,
    toggleTheme: func.isRequired,
}

export default Toggle;
