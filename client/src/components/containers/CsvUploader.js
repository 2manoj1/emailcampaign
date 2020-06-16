import React, { useCallback } from 'react';
import { createSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';
import { addFile } from '../../Redux/Actions/formActions';



const selectRecipientsFile = createSelector(
  state => state.formReducer,
  data => data.formData.recipientsFile
);
const CsvUploader = () => {
  const dispatch = useDispatch();
  const recipientsFile = useSelector(selectRecipientsFile)
  const handleAddFile = useCallback(
    (fileData) => dispatch(addFile(fileData)),
    [dispatch]
  );
  const onChangeFileSelect = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const fileData = e.target.files[0];
    handleAddFile(fileData)
  }
  return (
    <div className="custom-file form-group mb-3">
      <label htmlFor="csv-uploader" className="custom-file-label">{recipientsFile?.name || 'Upload Recipient CSV File'}</label>
      <input className="custom-file-input" id="csv-uploader" type="file" accept=".csv" required onChange={onChangeFileSelect} />
    </div>
  );
};

export default CsvUploader;