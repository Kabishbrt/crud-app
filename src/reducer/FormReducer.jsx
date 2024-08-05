// formReducer.js

import { validateFile } from "../utils/Validation";

export const initialState = {
  name: "",
  email: "",
  phone: "",
  dob: "",
  city: "",
  district: "",
  province: "",
  country: "Nepal", // nepal as default
  profilePic: null,
  errors: {},
  countries: [],
};

export function FormReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "SET_FIELD_ERROR":
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.error },
      };
    case "SET_ERRORS":
      return {
        ...state,
        errors: action.errors,
      };
    case "SET_PROFILE_PIC":
      const fileError = validateFile(action.file);
      return {
        ...state,
        profilePic: action.file,
        errors: { ...state.errors, profilePic: fileError },
      };
    case "SET_COUNTRIES":
      return {
        ...state,
        countries: action.countries,
      };
    case "RESET_FORM":
      return {
        ...initialState,
        countries: state.countries, // keeping countries data
      };
    default:
      return state;
  }
}
