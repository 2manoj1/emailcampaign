import React, { useCallback } from 'react';
import { createSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../presentationals/Input';
import { updateCampaignName } from '../../Redux/Actions/formActions'

const selectCampaignName = createSelector(
  state => state.formReducer,
  data => data.formData.name
);
const CampaignNameInput = () => {
  const dispatch = useDispatch();
  const campaignName = useSelector(selectCampaignName);
  const handleCampaignName = useCallback(
    (value) => dispatch(updateCampaignName(value)),
    [dispatch]
  );
  const onChangeInput = ({ target }) => {
    const { value } = target;
    handleCampaignName(value);
  }
  return (
    <Input
      className="shadow p-3 bg-white rounded"
      id="name"
      type="text"
      label="Campaign Name: "
      placeholder="Enter Campaign Name"
      required
      onChange={onChangeInput}
      value={campaignName}
    />
  );
};

export default CampaignNameInput;