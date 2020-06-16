import React from 'react';

const Input = ({ label, id, onChange = () => { }, onBlur = () => { }, ...props }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input className="form-control" id={id} {...props} onChange={onChange} onBlur={onBlur} />
    </div>
  );
};

export default Input;