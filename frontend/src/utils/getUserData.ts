export const getToken = () => {
  const token = localStorage.getItem('accesstoken');
  return token && token !== 'undefined' ? JSON.parse(token) : null;
};
export const getEmail = () => {
  const email = localStorage.getItem('email');
  return email && email !== 'undefined' ? JSON.parse(email) : null;
};
