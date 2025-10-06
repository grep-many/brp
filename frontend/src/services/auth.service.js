import API, { setAuthToken } from './api';

// --- Register User ---
export const registerUser = async (data) => {
  try {
    const res = await API.post('/users/signup',data);
    const { token } = res.data;

    if (token) {
      localStorage.setItem('token', token);
      setAuthToken(token); // attach token immediately for future requests
    }

    return res.data;
  } catch (err) {
    throw err.response?.data?.message || err.message;
  }
};

// --- Login User ---
export const loginUser = async (data) => {
  try {
    const res = await API.post('/users/signin', data);
    const { token } = res.data;

    if (token) {
      localStorage.setItem('token', token);
      setAuthToken(token); // attach token immediately
    }

    return res.data;
  } catch (err) {
    throw err.response?.data?.message || err.message;
  }
};

// --- Logout User ---
export const logoutUser = () => {
  localStorage.removeItem('token');
  setAuthToken(null); // remove token from axios headers
};

// --- Get Profile ---
export const getUserProfile = async () => {
  try {
    const res = await API.get('/users/profile');
    return res.data;
  } catch (err) {
    // If token is invalid, Axios interceptor already handles logout
    throw err.response?.data?.message || err.message;
  }
};
