import { produce } from 'immer';
import { FORM_DATA_CONST } from '../Constant';

export const emailData = {
  dateToSend: new Date(),
  subject: '',
  body: ''
};

export const initialState = {
  error: {
    hasError: false,
    message: ''
  },
  formData: {
    name: '',
    emailData: [emailData],
    recipientsFile: null
  },
  isSubmitting: false
}
export const formReducer = produce((draft, action) => {
  const { type, payload } = action;
  let formData = draft['formData'];
  const emailDatas = formData['emailData'];
  switch (type) {
    case FORM_DATA_CONST.ADD_ANOTHER_EMAIL:
      emailDatas.push(emailData);
      break;
    case FORM_DATA_CONST.UPDATE_EMAIL_DATA:
      const { index, key, value } = payload;
      emailDatas[index][key] = value;
      break;
    case FORM_DATA_CONST.REMOVE_EMAIL:
      if (emailDatas.length > 1) {
        emailDatas.splice(payload.index, 1);
      }
      else {
        emailDatas[0] = emailData;
      }
      break;
    case FORM_DATA_CONST.ADD_FILE:
      formData.recipientsFile = payload.file;
      break;
    case FORM_DATA_CONST.UPDATE_CAMPAIGN_NAME:
      formData.name = payload.value;
      break;
    case FORM_DATA_CONST.RESET_FORM:
      return initialState;
    default:
      break;
  }
}, initialState);