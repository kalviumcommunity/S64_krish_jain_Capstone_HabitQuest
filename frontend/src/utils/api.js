const API_URL = 'http://localhost:5000/api';

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include' // Important for cookies
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      body: formData,
      credentials: 'include' // Important for cookies
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await fetch(`${API_URL}/users/logout`, {
      method: 'POST',
      credentials: 'include'
    });
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

// Store user data in memory during session
let currentUser = null;

export const setCurrentUser = (user) => {
  currentUser = user;
};

export const getCurrentUser = () => {
  return currentUser;
};

export const isAuthenticated = async () => {
  try {
    const response = await fetch(`${API_URL}/users/me`, {
      credentials: 'include'
    });
    return response.ok;
  } catch {
    return false;
  }
}; 