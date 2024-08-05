import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDataContext } from "../context/DataContext";
import { useFormContext } from "../context/FormContext";
import { convertFileToBase64 } from "../utils/LocalStorage"; // Import the utility

export const Edit = () => {
  const { index } = useParams();
  const { setData } = useDataContext();
  const { state } = useFormContext();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const fileInputRef = useRef(null);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("formSubmissions")) || [];
    const profileData = storedData[parseInt(index)];

    if (profileData) {
      setProfile(profileData);
      setProfilePic(profileData.profilePic);
    } else {
      navigate("/");
    }
  }, [index, navigate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [id]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64File = await convertFileToBase64(file);
        setProfilePic(base64File);
        setProfile((prevProfile) => ({ ...prevProfile, profilePic: base64File }));
      } catch (error) {
        console.error("Failed to convert file to Base64", error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedData = JSON.parse(localStorage.getItem("formSubmissions")) || [];
    storedData[parseInt(index)] = { ...profile, profilePic: profilePic || storedData[parseInt(index)].profilePic };
    localStorage.setItem("formSubmissions", JSON.stringify(storedData));
    alert("Saved Changes");
    setData(storedData);
    navigate("/");
  };

  if (!profile) return <div>Loading...</div>;

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
            className="w-full bg-gray-200 border border-gray-300 rounded py-2 px-3 text-sm focus:outline-none focus:border-blue-500"
            id="name"
            type="text"
            placeholder="Full Name"
            value={profile.name || ''}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 text-xs font-bold" htmlFor="email">
            Email
            <span className="text-red-500"> *</span>
          </label>
          <input
            className="w-full bg-gray-200 border border-gray-300 rounded py-2 px-3 text-sm focus:outline-none focus:border-blue-500"
            id="email"
            type="email"
            placeholder="email@example.com"
            value={profile.email || ''}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 text-xs font-bold" htmlFor="phone">
            Phone Number
            <span className="text-red-500"> *</span>
          </label>
          <input
            className="w-full bg-gray-200 border border-gray-300 rounded py-2 px-3 text-sm focus:outline-none focus:border-blue-500"
            id="phone"
            type="text"
            placeholder="1234567"
            value={profile.phone || ''}
            onChange={handleChange}
            pattern="\d{7,}"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 text-xs font-bold" htmlFor="dob">
            Date of Birth
          </label>
          <input
            className="w-full bg-gray-200 border border-gray-300 rounded py-2 px-3 text-sm focus:outline-none focus:border-blue-500"
            id="dob"
            type="date"
            max={today}
            value={profile.dob || ''}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 text-xs font-bold" htmlFor="city">
            City
          </label>
          <input
            className="w-full bg-gray-200 border border-gray-300 rounded py-2 px-3 text-sm focus:outline-none focus:border-blue-500"
            id="city"
            type="text"
            placeholder="Kathmandu"
            value={profile.city || ''}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 text-xs font-bold" htmlFor="district">
            District
          </label>
          <input
            className="w-full bg-gray-200 border border-gray-300 rounded py-2 px-3 text-sm focus:outline-none focus:border-blue-500"
            id="district"
            type="text"
            placeholder="Kathmandu"
            value={profile.district || ''}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 text-xs font-bold" htmlFor="province">
            Province
          </label>
          <select
            className="w-full bg-gray-200 border border-gray-300 rounded py-2 px-3 text-sm focus:outline-none focus:border-blue-500"
            id="province"
            value={profile.province || ''}
            onChange={handleChange}
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
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 text-xs font-bold" htmlFor="country">
            Country
          </label>
          <select
            className="w-full bg-gray-200 border border-gray-300 rounded py-2 px-3 text-sm focus:outline-none focus:border-blue-500"
            id="country"
            value={profile.country || ''}
            onChange={handleChange}
          >
            {state.countries.map((country) => (
              <option key={country.cca3} value={country.name.common}>
                {country.name.common}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col space-y-2 col-span-1 md:col-span-3">
          <label className="text-gray-700 text-xs font-bold" htmlFor="profile-pic">
            Profile Picture
          </label>
          <input
            className="w-full bg-gray-200 border border-gray-300 rounded py-2 px-3 text-sm"
            id="profile-pic"
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 text-sm"
      >
        Save Changes
      </button>
      <Link to="/">
        <button
          type="button"
          className="mx-4 mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 text-sm"
        >
          Cancel
        </button>
      </Link>
    </form>
  );
};
