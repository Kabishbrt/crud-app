import React, { useState, useEffect } from "react";

export const Form = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("Nepal");
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const countriesList = data.map((country) => ({
          name: country.name.common,
          code: country.cca2,
        }));
        setCountries(countriesList);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  return (
    <form className="w-full max-w-4xl mx-auto p-4 border border-gray-300 rounded-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 text-sm font-bold" htmlFor="name">
            Name
          </label>
          <input
            className="w-full bg-gray-200 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            id="name"
            type="text"
            placeholder="Full Name"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 text-sm font-bold" htmlFor="email">
            Email
          </label>
          <input
            className="w-full bg-gray-200 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            id="email"
            type="email"
            placeholder="email@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 text-sm font-bold" htmlFor="phone">
            Phone Number
          </label>
          <input
            className="w-full bg-gray-200 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            id="phone"
            type="text"
            placeholder="123-456-7890"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 text-sm font-bold" htmlFor="dob">
            Date of Birth
          </label>
          <input
            className="w-full bg-gray-200 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            id="dob"
            type="date"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 text-sm font-bold" htmlFor="city">
            City
          </label>
          <input
            className="w-full bg-gray-200 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            id="city"
            type="text"
            placeholder="Kathmandu"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 text-sm font-bold" htmlFor="district">
            District
          </label>
          <input
            className="w-full bg-gray-200 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            id="district"
            type="text"
            placeholder="Kathmandu"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 text-sm font-bold" htmlFor="province">
            Province
          </label>
          <select
            className="w-full bg-gray-200 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            id="province"
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
          </select>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 text-sm font-bold" htmlFor="country">
            Country
          </label>
          <select
            className="w-full bg-gray-200 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            id="country"
          >
            <option value="Nepal">Nepal</option>
            {/* More countries can be added here */}
          </select>
        </div>

        <div className="flex flex-col space-y-2 col-span-1 md:col-span-3">
          <label
            className="text-gray-700 text-sm font-bold"
            htmlFor="profile-pic"
          >
            Profile Picture
          </label>
          <input
            className="w-full bg-gray-200 border border-gray-300 rounded py-2 px-3"
            id="profile-pic"
            type="file"
            accept="image/*"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};
