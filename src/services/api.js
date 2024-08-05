export const fetchCountries = async (dispatch) => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      // console.log(data);

      dispatch({ type: "SET_COUNTRIES", countries: data });
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };