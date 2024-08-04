import React, { useContext } from "react";
import { loadFromLocalStorage } from "../utils/LocalStorage";
import { useDataContext } from "../context/DataContext";

const TABLE_HEAD = [
  "Profile Picture",
  "Name",
  "Email",
  "Phone Number",
  "DOB",
  "City",
  "District",
  "Province",
  "Country",
  "Actions",
];

export function Table() {
  const { data } = useDataContext();
  const handleEdit = (email) => {
    console.log(`Edit ${email}`);
  };

  const handleDelete = (email) => {
    console.log(`Delete ${email}`);
  };

  return (
    <>
      <div className="mt-10">
        <p className="text-gray-500 text-sm">Details of registered users</p>
      </div>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full md:w-72 px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
      </div>
      <div className="w-full max-w-full overflow-x-auto p-2">
        <table className="w-full min-w-max table-auto text-left border-collapse text-sm shadow-md">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-gray-200 bg-gray-100 p-2 text-gray-700 text-xs"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map(
                (
                  {
                    profilePic,
                    name,
                    email,
                    phone,
                    dob,
                    city,
                    district,
                    province,
                    country,
                  },
                  index
                ) => {
                  const isLast = index === data.length - 1;
                  const rowClass = isLast
                    ? "p-2"
                    : "p-2 border-b border-gray-200";

                  return (
                    <tr key={email}>
                      <td className={rowClass}>
                        <img
                          src={profilePic}
                          alt={name}
                          className="w-16 h-16 rounded-full border border-gray-200 object-cover"
                        />
                      </td>
                      <td className={rowClass}>{name}</td>
                      <td className={rowClass}>{email}</td>
                      <td className={rowClass}>{phone}</td>
                      <td className={rowClass}>{dob}</td>
                      <td className={rowClass}>{city}</td>
                      <td className={rowClass}>{district}</td>
                      <td className={rowClass}>{province}</td>
                      <td className={rowClass}>{country}</td>
                      <td className={rowClass}>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(email)}
                            className="px-2 py-1 border border-blue-500 text-blue-500 rounded-lg text-xs hover:bg-blue-50"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(email)}
                            className="px-2 py-1 border border-red-500 text-red-500 rounded-lg text-xs hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                }
              )
            ) : (
              <tr>
                <td
                  colSpan={TABLE_HEAD.length}
                  className="text-center p-4 text-gray-500"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex items-center justify-between border-t border-gray-200 p-4 mt-4">
          <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 text-xs">
            Previous
          </button>
          <button className="px-4 py-2 text-white border rounded-lg bg-blue-500 hover:bg-blue-600 text-xs">
            Profiles
          </button>
          <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 text-xs">
            Next
          </button>
        </div>
      </div>
    </>
  );
}
