import React from 'react';
import {func, string} from 'prop-types';
import "./Toggle.css";
import Switch from '@material-ui/core/Switch';

function Toggle({theme, toggleTheme}) {
    // const isLight = theme === 'light';
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
    });
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        toggleTheme();
    };

    return (
        <Switch
            className="toggle"
            checked={state.checkedA}
            onChange={handleChange}
            name="checkedA"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
    );
};

Toggle.propTypes = {
    theme: string.isRequired,
    toggleTheme: func.isRequired,
}

export default Toggle;