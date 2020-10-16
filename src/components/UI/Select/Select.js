import React, {useState} from 'react';
import PropTypes from 'prop-types';


const Select = (props) => {
  const [state, setState] = useState({value: ''});

  const handleChange = (event) => {
    setState({value: event.target.value});
  }

  return (
    <select value={state.value} onChange={handleChange} className={props.style}>
      {props.options.map(({value, displayValue}) => <option key={value} value={value}>{displayValue}</option>)}
    </select>
  );
}

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    displayValue: PropTypes.string
  })).isRequired,
  style: PropTypes.string.isRequired
};

export default Select;