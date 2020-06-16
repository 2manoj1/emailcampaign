import React, { useState } from 'react';
import Input from './Input';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import TextArea from './TextArea';

const EmailForm = ({ heading,
  index,
  handleRemoveEmail,
  handleUpdateDataEmail,
  dateToSend,
  subject,
  body
}) => {
  const [expand, setExpand] = useState(true);
  const handleTogglePanel = () => {
    setExpand(prevState => !prevState);
  }

  const onChangeInput = ({ target }) => {
    const { name, value } = target;
    handleUpdateDataEmail(index, name, value);
  }
  const onDateSelect = date => {
    handleUpdateDataEmail(index, "dateToSend", date);
  }


  return (
    <div className="card border-primary mb-3 shadow-lg p-3 bg-white rounded">
      <div className="card-header" onClick={handleTogglePanel}>
        <div className="row">
          <div className="col-sm-10 text-left">
            {heading}
          </div>
          <div className="col-sm-2 text-right">
            <span className={`oi oi-chevron-${expand ? 'bottom' : 'top'}`} aria-hidden="true"></span>
          </div>
        </div>
      </div>
      <div className={`card-body ${expand ? '' : 'collapse'}`}>
        <div className="form-group">
          <label htmlFor="date-to-send">Date To Send: </label>
          <DatePicker
            className="form-control"
            id="date-to-send"
            selected={dateToSend}
            onSelect={onDateSelect}
            minDate={new Date()}
          />
        </div>
        <Input
          id="subject"
          type="text"
          name="subject"
          value={subject}
          label="Subject: "
          placeholder="Enter Subject"
          onChange={onChangeInput}
          required
        />
        <TextArea
          id="body"
          name="body"
          value={body}
          label="Body:"
          rows="6"
          placeholder="Enter Email Body"
          onChange={onChangeInput}
          required
        />
      </div>
      <div className="card-footer">
        <button onClick={handleRemoveEmail}>
          <span className="oi oi-trash" aria-hidden="true"></span> Remove Email
        </button>
      </div>
    </div>
  );
};

export default EmailForm;