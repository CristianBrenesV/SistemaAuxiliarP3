export const setToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

// 🔥 USER

export const setUserStorage = (user: unknown) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getUserStorage = () => {
  const user = localStorage.getItem('user');

  if (!user) return null;

  try {
    return JSON.parse(user);
  } catch (error) {
    console.error('Error parsing user:', error);
    return null;
  }
};

export const clearSession = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};