import Cookies from "js-cookie";

export const LoadData = () => {
  const token = Cookies.get("token") || "";

  const superAdmin = localStorage.getItem("superAdmin");

  try {
    return {
      token,
      superAdmin: superAdmin ? JSON.parse(superAdmin) : null,
    };
  } catch (error) {
    return {
      token,
      superAdmin: null,
    };
  }
};
