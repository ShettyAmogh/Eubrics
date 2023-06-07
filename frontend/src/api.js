const BASE_URL = "http://localhost:3003/api"; // Replace with your backend URL

export const fetchData = async () => {
  const response = await fetch(`${BASE_URL}/behaviors`);
  const data = await response.json();
  return data;
};

export const fetchCollegeData = async () => {
  const response = await fetch(`${BASE_URL}/behaviors/college`);
  const data = await response.json();
  return data;
};
export const addCollegeData = async (data) => {
  const response = await fetch(`${BASE_URL}/behaviors/college`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
};