import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/google';

export const loginWithGoogle = async (token) => {
  try {
    const response = await axios.post(API_URL, { token });
    return response.data;
  } catch (error) {
    throw new Error('Login failed: ' + error.message);
  }
};
