import React, { memo } from 'react';
import './FloatedButton.css';

const FloatedButton = memo(({ iconName, onClick }) => {
  return (
    <div className="float bg-primary text-white" onClick={onClick}>
      <span className={`oi oi-${iconName}`}></span>
    </div>
  );
});

export default FloatedButton;