// src/lib/fetchWrapper.ts
//import showToast from "@/utils/showToast";
//import { getToken } from "./getToken";
//import { getReissuanceToken } from "./getReissuanceToken";

class FetchWrapper {
  baseUrl = "";

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get(url: string) {
    const response = await fetch(`${this.baseUrl}${url}`);
    return response.json();
  }

  async put(url: string, data: JSON) {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }

  async post(url: string, data?: JSON) {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }

  async delete(url: string) {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "DELETE",
    });
    return response.json();
  }
}

//const fetchWrapper = new FetchWrapper("/api");
const fetchWrapper = new FetchWrapper(
  `${process.env.NEXT_PUBLIC_BASE_URL}` || ""
);

export default fetchWrapper;
