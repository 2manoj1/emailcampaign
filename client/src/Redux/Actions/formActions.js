import { FORM_DATA_CONST } from "../Constant"

export const addAnotherEmail = () => ({
  type: FORM_DATA_CONST.ADD_ANOTHER_EMAIL,
});

export const removeEmail = (index) => ({
  type: FORM_DATA_CONST.REMOVE_EMAIL,
  payload: { index }
});

export const updateEmailData = (index, key, value) => ({
  type: FORM_DATA_CONST.UPDATE_EMAIL_DATA,
  payload: {
    index, key, value
  }
});

export const updateCampaignName = (value) => ({
  type: FORM_DATA_CONST.UPDATE_CAMPAIGN_NAME,
  payload: {
    value
  }
});

export const addFile = (file) => ({
  type: FORM_DATA_CONST.ADD_FILE,
  payload: {
    file
  }
});

export const resetForm = () => ({
  type: FORM_DATA_CONST.RESET_FORM
});
