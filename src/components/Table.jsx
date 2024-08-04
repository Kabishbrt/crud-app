import React, { useState } from "react";
import { useDataContext } from "../context/DataContext";

export function Table() {
  const { data } = useDataContext();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust this value to change the number of items per page

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Get the items for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = [...data].reverse().slice(startIndex, startIndex + itemsPerPage);

  const handleEdit = (email) => {
    console.log(`Edit ${email}`);
  };

  const handleDelete = (email) => {
    console.log(`Delete ${email}`);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <div className="w-full flex flex-row justify-between items-center mt-10 px-4">
        <div className="flex-shrink-0">
          <span className="text-gray-700 text-xs font-bold">
            Page {currentPage} of {totalPages}
          </span>
        </div>
        <div className="flex mb-4 flex-shrink-0">
          <input
            type="text"
            placeholder="Search Name or Email"
            className="w-full md:w-72 px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
      </div>
      <div className="w-full max-w-full overflow-x-auto p-2">
        <table className="w-full min-w-max table-auto text-left border-collapse text-sm shadow-md">
          <thead>
            <tr>
              <th className="border-b border-gray-200 bg-gray-100 p-2 text-gray-700 text-xs">
                Profile Picture
              </th>
              <th className="border-b border-gray-200 bg-gray-100 p-2 text-gray-700 text-xs">
                Name
              </th>
              <th className="border-b border-gray-200 bg-gray-100 p-2 text-gray-700 text-xs">
                Email
              </th>
              <th className="border-b border-gray-200 bg-gray-100 p-2 text-gray-700 text-xs">
                Phone
              </th>
              <th className="border-b border-gray-200 bg-gray-100 p-2 text-gray-700 text-xs">
                Date of Birth
              </th>
              <th className="border-b border-gray-200 bg-gray-100 p-2 text-gray-700 text-xs">
                City
              </th>
              <th className="border-b border-gray-200 bg-gray-100 p-2 text-gray-700 text-xs">
                District
              </th>
              <th className="border-b border-gray-200 bg-gray-100 p-2 text-gray-700 text-xs">
                Province
              </th>
              <th className="border-b border-gray-200 bg-gray-100 p-2 text-gray-700 text-xs">
                Country
              </th>
              <th className="border-b border-gray-200 bg-gray-100 p-2 text-gray-700 text-xs">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map(
                ({
                  profilePic,
                  name,
                  email,
                  phone,
                  dob,
                  city,
                  district,
                  province,
                  country,
                }) => {
                  const rowClass = "p-3";

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
                      <td className={rowClass}>
                        {dob ? new Date(dob).toLocaleDateString() : "N/A"}
                      </td>
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
                  colSpan={10} // Updated to match the number of columns
                  className="text-center p-4 text-gray-500"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex items-center justify-between border-t border-gray-200 p-4 mt-4">
          {currentPage === 1 ? (
            <div></div>
          ) : (
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="px-4 py-2 text-white border rounded-lg bg-blue-500 hover:bg-blue-600 text-xs"
            >
              Previous
            </button>
          )}
          {
            currentPage === totalPages ?(
              <div></div>
            ):(
              <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-white border rounded-lg bg-blue-500 hover:bg-blue-600 text-xs"
            >
              Next
            </button>
            )
          }

        </div>
      </div>
    </>
  );
}
