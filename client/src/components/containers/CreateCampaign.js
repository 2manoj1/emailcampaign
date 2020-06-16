import React, { useCallback } from 'react';
import CsvUploader from './CsvUploader';
import Emails from './Emails';
import CampaignNameInput from './CampaignNameInput';
import { useDispatch, useSelector } from 'react-redux';
import { resetForm } from '../../Redux/Actions/formActions';
import { createSelector } from 'reselect';

const selectFormData = createSelector(
  state => state.formReducer,
  data => data.formData
);

const CreateCampaign = () => {
  const dispatch = useDispatch();
  const formData = useSelector(selectFormData);
  const handleReest = useCallback(
    () => dispatch(resetForm()),
    [dispatch]
  );

  const handleSubmit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const formDataTransform = {
      ...formData, emailData: formData.emailData?.map(
        (email) => ({
          ...email,
          dateToSend: (new Date(email.dateToSend.setUTCHours(0, 0, 0, 0))).toISOString()
        })
      )
    }

    const myHeaders = new Headers();

    const formdataObj = new FormData();
    formdataObj.append("recipientsfile", formDataTransform.recipientsFile);
    formdataObj.append("name", formDataTransform.name);
    formdataObj.append("emaildata", JSON.stringify(formDataTransform.emailData));

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdataObj,
      redirect: "follow"
    };

    fetch("http://localhost:4000/api/campaign", requestOptions)
      .then(response => response.text())
      .then(() => handleReest())
      .catch(error => console.log('error', error));
  }

  return (
    <form onSubmit={handleSubmit} onReset={handleReest}>
      <CampaignNameInput />
      <Emails />
      <CsvUploader />
      <input className="btn btn-primary" type="submit" value="Save" />
      <input className="btn btn-danger ml-3" type="reset" value="Reset" />
    </form>
  );
};

export default CreateCampaign;