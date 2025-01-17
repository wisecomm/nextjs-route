/* eslint-disable @typescript-eslint/no-explicit-any */
// src/lib/fetchWrapper.ts
//import showToast from "@/utils/showToast";
//import { getToken } from "./getToken";
//import { getReissuanceToken } from "./getReissuanceToken";

const tokenErrorHandler = async (response: any) => {
  const { error } = await response.json();
  switch (error.code) {
    case 1002:
      //      await getReissuanceToken();
      console.error("토큰 오류가 발생했습니다.(1002)", error);
      break;
    case 1201:
      //      await getToken();
      console.error("토큰 오류가 발생했습니다.(1201)", error);
      break;
    default:
      //      showToast("토큰 오류가 발생했습니다.", "error");
      console.error("토큰 오류가 발생했습니다." + error.code, error);
      break;
  }
};

class FetchWrapper {
  baseUrl = "";

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async call(url: string, fetchNext: any, retry = 3) {
    const defaultHeaders = {
      "Content-Type": "application/json",
      /*        
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      */
    };

    const options = {
      ...fetchNext,
      headers: {
        ...defaultHeaders,
        ...fetchNext.headers,
      },
    };

    const response = await fetch(this.baseUrl + url, options);
    let result;
    try {
      result = await response.json();
    } catch (error) {
      console.error("Error parsing JSON:", error);
      throw new Error("Failed to parse JSON response");
    }

    // Debug logging
    console.log("API Response=:", response);

    if (!response.ok) {
      // 인증 자격에 관한 오류 처리
      if (response.status === 401) {
        await tokenErrorHandler(response);
        // 재발급 후 재요청
        if (retry !== 0) {
          this.call(url, fetchNext, retry - 1);
        }
      } else {
        // 인증 외 오류는 호출한 곳에서 처리
        return result;
      }
    }

    return result;
  }
}

//const fetchWrapper = new FetchWrapper("/api");
const fetchWrapper = new FetchWrapper(
  `${process.env.NEXT_PUBLIC_BASE_URL}` || ""
);

export default fetchWrapper;
