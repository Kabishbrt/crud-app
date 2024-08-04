import React, { createContext, useReducer, useContext, useEffect, useRef } from "react";
import { validateFile } from "../utils/Validation";


const initialState = {
  name: "",
  email: "",
  phone: "",
  dob: "",
  city: "",
  district: "",
  province: "",
  country: "Nepal", // Set Nepal as the default
  profilePic: null,
  errors: {},
  countries: [],
};

function formReducer(state, action) {
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
      return initialState;
    default:
      return state;
  }
}

const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
  const fileInputRef = useRef(null);
  const [state, dispatch] = useReducer(formReducer, initialState);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        console.log(data);
        
        dispatch({ type: 'SET_COUNTRIES', countries: data });
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const setField = (field, value) => {
    dispatch({ type: "SET_FIELD", field, value });
  };

  const setFieldError = (field, error) => {
    dispatch({ type: "SET_FIELD_ERROR", field, error });
  };

  const setErrors = (errors) => {
    dispatch({ type: "SET_ERRORS", errors });
  };

  const setProfilePic = (file) => {
    dispatch({ type: "SET_PROFILE_PIC", file });
  };

  const resetForm = () => {
    // Clear the file input field
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    // Reset the form state
    dispatch({ type: "RESET_FORM" });
  };

  return (
    <FormContext.Provider value={{ state, setField, setFieldError, setErrors, setProfilePic, resetForm, fileInputRef }}>
      {children}
    </FormContext.Provider>
  );
};
