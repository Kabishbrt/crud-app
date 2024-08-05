import { useState, useEffect } from "react";
import { useDataContext } from "../context/DataContext";
import { TABLE_HEAD } from "../utils/LocalStorage";
import { Link } from "react-router-dom";

export const Table = () => {
  const { data, setData } = useDataContext(); 
  const [recordsperpage] = useState(5);
  const [searchqry, setSearchQry] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [rowsToShow, setRowsToShow] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);


  useEffect(() => {
    
    const lowercasedQuery = searchqry.toLowerCase();
    const newFilteredData = data.filter((item) =>
      Object.values(item).some((value) => {
        const lowercasedValue = value.toString().toLowerCase();
        return lowercasedValue.startsWith(lowercasedQuery);
      })
    );

    setFilteredData(newFilteredData);

 
    const newTotalPage = Math.ceil(newFilteredData.length / recordsperpage);
    setTotalPage(newTotalPage);
    setCurrentPage(0); //

  
    setRowsToShow(newFilteredData.slice(0, recordsperpage));
  }, [data, searchqry, recordsperpage]);

  useEffect(() => {
    
    const startIndex = recordsperpage * currentPage;
    const endIndex = startIndex + recordsperpage;
    setRowsToShow(filteredData.slice(startIndex, endIndex));
  }, [currentPage, filteredData, recordsperpage]);

  const nextPage = () => {
    if (currentPage < totalPage - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQry(e.target.value);
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      
      const newFilteredData = filteredData.filter((_, i) => i !== index);
      setFilteredData(newFilteredData);

     
      const newData = data.filter((_, i) => i !== index);
      setData(newData);

      
      localStorage.setItem("formSubmissions", JSON.stringify(newData));
    }
  };

  return (
    <>
      <div className="h-auto w-full bg-white flex justify-center mt-20 pb-14">
        <div className="w-full w-4xl px-2">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-medium">Registration List</h1>
            <input
              type="text"
              value={searchqry}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="px-3 py-2 text-sm border border-gray-400 rounded-lg shadow-sm"
            />
          </div>
          <div className="w-full overflow-x-scroll md:overflow-auto max-w-7xl 2xl:max-w-none mt-2 shadow-md">
            <table className="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter border">
              <thead className="rounded-lg text-sm text-white font-semibold w-full">
                <tr className="bg-[#222E3A]/[6%]">
                  {TABLE_HEAD.map((header) => (
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
                {rowsToShow?.map((item, index) => (
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
                    <td className="py-2 px-3 border-t whitespace-nowrap">
                      <button className="text-blue-500 hover:text-blue-700 mr-2">
                        <Link to={`/edit/${index}`}>Edit</Link>
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full flex justify-center sm:justify-between flex-col sm:flex-row gap-5 mt-1.5 px-1 items-center">
            <div className="text-sm">
              Showing {currentPage === 0 ? 1 : currentPage * recordsperpage + 1} to{" "}
              {currentPage === totalPage - 1
                ? filteredData.length
                : (currentPage + 1) * recordsperpage}{" "}
              of {filteredData.length} entries
            </div>
            <div className="flex gap-2">
              <button
                onClick={previousPage}
                className={`px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-400 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  currentPage === 0 ? "opacity-60 cursor-not-allowed" : ""
                }`}
                disabled={currentPage === 0}
              >
                Previous
              </button>
              <button
                onClick={nextPage}
                className={`px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-400 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  currentPage === totalPage - 1
                    ? "opacity-60 cursor-not-allowed"
                    : ""
                }`}
                disabled={currentPage === totalPage - 1}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Link to="/profiles">
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 text-sm">
            Profiles
          </button>
        </Link>
      </div>
    </>
  );
};
