export const validateField = (field, value) => {
    let error = "";
    switch (field) {
      case "name":
        if (!value) {
          error = "Name is required";
        } else if (/[\d]/.test(value)) {
          error = "Name cannot contain numbers";
        }
        break;
      case "email":
        if (!value) error = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(value)) error = "Email address is invalid";
        break;
      case "phone":
        if (!value) error = "Phone number is required";
        else if (!/^\d{7,}$/.test(value)) error = "Phone number must be at least 7 digits and contain only numbers";
        break;
      default:
        break;
    }
    return error;
  };
  
export const validateFile = (file) => {
    if (!file) return "Profile Picture is required";
    const validTypes = ["image/png"];
    return validTypes.includes(file.type) ? "" : "Profile picture must be a PNG file";
  };
  