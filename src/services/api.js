const BASE_URL = "http://localhost:5000/api"; // Replace with your backend URL

export const getNotes = async () => {
  const response = await fetch(`${BASE_URL}/notes`);
  const data = await response.json();
  return data; // should return an array of notes
};

export const addNote = async (description, date) => {
  const response = await fetch(`${BASE_URL}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description, date }),
  });
  const data = await response.json();
  return data; // should return the newly created note
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  return data; // returns token or user info
};
