export const loadFromLocalStorage = () => {
    const data = localStorage.getItem("formSubmissions");
    return data ? JSON.parse(data) : [];
  };
  
  export const saveToLocalStorage = (submission) => {
    const data = loadFromLocalStorage();
    data.push(submission);
    localStorage.setItem("formSubmissions", JSON.stringify(data));
  };
  
  export const convertFileToBase64= (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
  
export const TABLE_HEAD = [
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