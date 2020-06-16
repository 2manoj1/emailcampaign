import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';

import EmailForm from '../presentationals/EmailForm';
import FloatedButton from '../presentationals/FloatedButton';
import { addAnotherEmail, removeEmail, updateEmailData } from '../../Redux/Actions/formActions';



const selectEmails = createSelector(
  state => state.formReducer,
  data => data.formData.emailData
);

const Emails = () => {
  const dispatch = useDispatch();
  const Emails = useSelector(selectEmails)
  const handleAddEmail = useCallback(
    () => dispatch(addAnotherEmail()),
    [dispatch]
  );
  const handleRemoveEmail = useCallback(
    (index) => dispatch(removeEmail(index)),
    [dispatch]
  );
  const handleUpdateDataEmail = useCallback(
    (index, key, value) => dispatch(updateEmailData(index, key, value)),
    [dispatch]
  );
  return (
    <div>
      {Emails?.map((email, i) => <EmailForm key={i}
        heading={`Email ${i + 1}`}
        handleRemoveEmail={handleRemoveEmail}
        handleUpdateDataEmail={handleUpdateDataEmail}
        index={i}
        {...email} />)}
      <FloatedButton iconName="plus" onClick={handleAddEmail} />
    </div>
  );
};

export default Emails;