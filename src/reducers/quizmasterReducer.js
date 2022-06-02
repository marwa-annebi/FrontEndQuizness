import {
  COMPANY_SETTINGS_FAIL,
  COMPANY_SETTINGS_REQUEST,
  COMPANY_SETTINGS_SUCCESS,
} from "../constants/quizmasterConstant";
let initialState = {
  loading: true,
  companyInfo: null,
  error: null,
};
export const companySettingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMPANY_SETTINGS_REQUEST:
      return { loading: true };
    case COMPANY_SETTINGS_SUCCESS:
      return { loading: false, companyInfo: action.payload };
    case COMPANY_SETTINGS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
