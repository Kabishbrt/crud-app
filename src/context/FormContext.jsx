// FormProvider.js

import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useRef,
} from "react";
import { FormReducer, initialState } from "../reducer/FormReducer";
import { fetchCountries } from "../services/api";

const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
  const fileInputRef = useRef(null);

  const [state, dispatch] = useReducer(FormReducer, initialState);

  useEffect(() => {
    fetchCountries(dispatch);
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
