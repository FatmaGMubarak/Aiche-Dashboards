import Cookies from "js-cookie";

export const LoadData = () => {
  const token = Cookies.get("token") || "";

  const admim = localStorage.getItem("admim");

  try {
    return {
      token,
      admim: admim ? JSON.parse(admim) : null,
    };
  } catch (error) {
    return {
      token,
      admim: null,
    };
  }
};
