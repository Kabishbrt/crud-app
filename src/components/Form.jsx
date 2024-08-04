import React from "react";
import { useFormContext } from "../context/AppContext";
import { validateField, validateFile } from "../utils/Validation";
import {
  convertFileToBase64,
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../utils/LocalStorage";
import { useDataContext } from "../context/DataContext";

export const Form = () => {
  const { setData } = useDataContext();
  const {
    state,
    setField,
    setProfilePic,
    setErrors,
    setFieldError,
    resetForm,
    fileInputRef,
  } = useFormContext();
  const today = new Date().toISOString().split("T")[0];
  // console.log(state.errors);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setField(id, value);
  };

  const handleCountryChange = (event) => {
    setField("country", event.target.value);
  };

  const handleBlur = (e) => {
    const { id, value } = e.target;
    const error = validateField(id, value);
    setFieldError(id, error);
  };

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(state.profilePic);

    const errors = validateAllFields(state);
    const fileError = validateFile(state.profilePic);

    if (Object.keys(errors).length || fileError) {
      setErrors({ ...errors, profilePic: fileError });
      return; // prevents form submission
    }

    let base64ProfilePic;

    try {
      base64ProfilePic = await convertFileToBase64(state.profilePic);
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        profilePic: "Failed to encode profile picture",
      }));
      return; // prevents form submission
    }

    const { errors: __, countries: ___, ...filteredstate } = state;
    const submissionData = {
      ...filteredstate,
      profilePic: base64ProfilePic,
    };

    saveToLocalStorage(submissionData);
    const newdata = loadFromLocalStorage();
    console.log(newdata);
    
    setData(newdata);
    resetForm();
    alert("Form submitted successfully");
  };

  const validateAllFields = (state) => {
    const errors = {};
    Object.keys(state).forEach((field) => {
      if (field !== "profilePic" && field !== "errors") {
        const error = validateField(field, state[field]);
        if (error) errors[field] = error;
      }
    });
    return errors;
  };

  return (
    <form
      className="w-full max-w-4xl mx-auto p-4 border border-gray-300 rounded-md shadow-md"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 text-xs font-bold" htmlFor="name">
            Name
            <span className="text-red-500"> *</span>
          </label>
          <input
            className={`w-full bg-gray-200 border ${
              state.errors.name ? "border-red-500" : "border-gray-300"
            } rounded py-2 px-3 text-sm focus:outline-none focus:border-blue-500`}
            id="name"
            type="text"
            placeholder="Full Name"
            value={state.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {state.errors.name && (
            <p className="text-red-500 text-xs">{state.errors.name}</p>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 text-xs font-bold" htmlFor="email">
            Email
            <span className="text-red-500"> *</span>
          </label>
          <input
            className={`w-full bg-gray-200 border ${
              state.errors.email ? "border-red-500" : "border-gray-300"
            } rounded py-2 px-3 text-sm focus:outline-none focus:border-blue-500`}
            id="email"
            type="email"
            placeholder="email@example.com"
            value={state.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {state.errors.email && (
            <p className="text-red-500 text-xs">{state.errors.email}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 text-xs font-bold" htmlFor="phone">
            Phone Number
            <span className="text-red-500"> *</span>
          </label>
          <input
            className={`w-full bg-gray-200 border ${
              state.errors.phone ? "border-red-500" : "border-gray-300"
            } rounded py-2 px-3 text-sm focus:outline-none focus:border-blue-500`}
            id="phone"
            type="text"
            placeholder="1234567"
            value={state.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {state.errors.phone && (
            <p className="text-red-500 text-xs">{state.errors.phone}</p>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 text-xs font-bold" htmlFor="dob">
            Date of Birth
          </label>
          <input
            className={`w-full bg-gray-200 border ${
              state.errors.dob ? "border-red-500" : "border-gray-300"
            } rounded py-2 px-3 text-sm focus:outline-none focus:border-blue-500`}
            id="dob"
            type="date"
            max={today}
            value={state.dob}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {state.errors.dob && (
            <p className="text-red-500 text-xs">{state.errors.dob}</p>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 text-xs font-bold" htmlFor="city">
            City
          </label>
          <input
            className={`w-full bg-gray-200 border ${
              state.errors.city ? "border-red-500" : "border-gray-300"
            } rounded py-2 px-3 text-sm focus:outline-none focus:border-blue-500`}
            id="city"
            type="text"
            placeholder="Kathmandu"
            value={state.city}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {state.errors.city && (
            <p className="text-red-500 text-xs">{state.errors.city}</p>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 text-xs font-bold" htmlFor="district">
            District
          </label>
          <input
            className={`w-full bg-gray-200 border ${
              state.errors.district ? "border-red-500" : "border-gray-300"
            } rounded py-2 px-3 text-sm focus:outline-none focus:border-blue-500`}
            id="district"
            type="text"
            placeholder="Kathmandu"
            value={state.district}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {state.errors.district && (
            <p className="text-red-500 text-xs">{state.errors.district}</p>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 text-xs font-bold" htmlFor="province">
            Province
          </label>
          <select
            className={`w-full bg-gray-200 border ${
              state.errors.province ? "border-red-500" : "border-gray-300"
            } rounded py-2 px-3 text-sm focus:outline-none focus:border-blue-500`}
            id="province"
            value={state.province}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Select Province</option>
            <option value="Koshi">Koshi</option>
            <option value="Madhesh">Madhesh</option>
            <option value="Bagmati">Bagmati</option>
            <option value="Gandaki">Gandaki</option>
            <option value="Lumbini">Lumbini</option>
            <option value="Karnali">Karnali</option>
            <option value="SudurPaschim">SudurPaschim</option>
          </select>
          {state.errors.province && (
            <p className="text-red-500 text-xs">{state.errors.province}</p>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 text-xs font-bold" htmlFor="country">
            Country
          </label>
          <select
            className="w-full bg-gray-200 border border-gray-300 rounded py-2 px-3 text-sm focus:outline-none focus:border-blue-500"
            id="country"
            value={state.country}
            onChange={handleCountryChange}
          >
            {state.countries.map((country) => (
              <option key={country.cca3} value={country.name.common}>
                {country.name.common}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col space-y-2 col-span-1 md:col-span-3">
          <label
            className="text-gray-700 text-xs font-bold"
            htmlFor="profile-pic"
          >
            Profile Picture
            <span className="text-red-500"> *</span>
          </label>
          {/*can use accept="image/png here in input*/}
          <input
            className={`w-full bg-gray-200 border ${
              state.errors.profilePic ? "border-red-500" : "border-gray-300"
            } rounded py-2 px-3 text-sm`}
            id="profile-pic"
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          {state.errors.profilePic && (
            <p className="text-red-500 text-xs">{state.errors.profilePic}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 text-sm"
      >
        Submit
      </button>
    </form>
  );
};
