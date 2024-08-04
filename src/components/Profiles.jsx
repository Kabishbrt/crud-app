import React from "react";
import { useDataContext } from "../context/DataContext";
import { TABLE_HEAD } from "../utils/LocalStorage";
import { Link } from "react-router-dom";

export const Profiles = () => {
  const { data } = useDataContext(); // Fetching data from context
  const filteredTableHead = TABLE_HEAD.filter(header => header !== "Actions");

  return (
    <>
    <div className="h-auto w-full bg-white flex justify-center mt-20 pb-14">
      <div className="w-full w-4xl px-2">
        <div className="flex justify-center items-center mb-4">
          <h1 className="text-xl font-medium">Profiles</h1>
        </div>
        <div className="w-full overflow-x-scroll md:overflow-auto max-w-7xl 2xl:max-w-none mt-2 shadow-md">
          <table className="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter border">
            <thead className="rounded-lg text-sm text-white font-semibold w-full">
              <tr className="bg-[#222E3A]/[6%]">
                {filteredTableHead.map((header) => (

                  <th
                    key={header}
                    className="py-3 px-3 text-[#212B36] text-sm font-bold whitespace-nowrap border-b border-[#B0B0B0]"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm">
              {data.map((item, index) => (
                <tr className="border-b border-[#B0B0B0]" key={index}>
                  <td className="py-2 px-8 border-t whitespace-nowrap">
                    <img
                      src={item.profilePic}
                      alt={item.name}
                      className="w-12 h-12 rounded-full"
                    />
                  </td>
                  <td className="py-2 px-3 border-t whitespace-nowrap">
                    {item.name}
                  </td>
                  <td className="py-2 px-3 border-t whitespace-nowrap">
                    {item.email}
                  </td>
                  <td className="py-2 px-3 border-t whitespace-nowrap">
                    {item.phone}
                  </td>
                  <td className="py-2 px-3 border-t whitespace-nowrap">
                    {item.dob}
                  </td>
                  <td className="py-2 px-3 border-t whitespace-nowrap">
                    {item.city}
                  </td>
                  <td className="py-2 px-3 border-t whitespace-nowrap">
                    {item.district}
                  </td>
                  <td className="py-2 px-3 border-t whitespace-nowrap">
                    {item.province}
                  </td>
                  <td className="py-2 px-3 border-t whitespace-nowrap">
                    {item.country}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <Link to="/">
    <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 text-sm">Go Back</button>
    </Link>
    </>
  );
};
