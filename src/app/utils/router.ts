export const apiCall = async (
  url: string,
  method: string = "GET",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any,
  token?: string,
  headers: HeadersInit = { "Content-Type": "application/json" }
) => {
  try {
    const options: RequestInit = {
      method,
      headers: {
        ...headers,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error making API call:", error);
    throw error;
  }
};
