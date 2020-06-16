import React from 'react';

const TextArea = ({ label, id, ...props }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <textarea className="form-control" id={id} {...props}></textarea>
    </div>
  );
};

export default TextArea;