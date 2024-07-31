import { useSelector } from "react-redux";

export const useAuth = () => {
  const { email, token, id, name } = useSelector((state) => state.user);

  // Retrieve user details from local storage if not available in the Redux store
  const storedUser = JSON.parse(localStorage.getItem('user')) || {};
  
  const isAuth = !!(email || storedUser.email);

  return {
    isAuth,
    email: email || storedUser.email,
    token: token || storedUser.token,
    id: id || storedUser.id,
    name: name || storedUser.name,
  };
};
