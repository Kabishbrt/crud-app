// FormProvider.js

import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useRef,
} from "react";
import { FormReducer, initialState } from "../reducer/FormReducer";

const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
  const fileInputRef = useRef(null);

  const [state, dispatch] = useReducer(FormReducer, initialState);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        // console.log(data);

        dispatch({ type: "SET_COUNTRIES", countries: data });
      } catch (error) {
        console.error("Error fetching countries:", error);
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
    
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    
    dispatch({ type: "RESET_FORM" });
  };

  return (
    <FormContext.Provider
      value={{
        state,
        setField,
        setFieldError,
        setErrors,
        setProfilePic,
        resetForm,
        fileInputRef,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
