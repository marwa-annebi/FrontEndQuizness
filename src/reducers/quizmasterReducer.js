import {
  COMPANY_SETTINGS_FAIL,
  COMPANY_SETTINGS_REQUEST,
  COMPANY_SETTINGS_SUCCESS,
} from "../constants/quizmasterConstant";

export const companySettingsReducer = (state = { settings: {} }, action) => {
  switch (action.type) {
    case COMPANY_SETTINGS_REQUEST:
      return { loading: false };
    case COMPANY_SETTINGS_SUCCESS:
      return { loading: false, notes: action.payload };
    case COMPANY_SETTINGS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
