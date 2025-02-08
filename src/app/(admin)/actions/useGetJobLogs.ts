import fetchWrapper from "@/app/lib/fetchWrapper";
import { ApiResponse } from "@/types";

export const getJobLogs = async (corpCode: string) => {
  //  export const apiCall = async (): Promise<ApiResponse> => {

  //  http://192.168.100.111/astro-v2/astroapi/base/v2/joblog/1000/paging/page_num=1&page_size=10&param_key=&param_value=
  //  http://192.168.100.111/astro-v2/astroapi/base/v2/joblog/0000/paging/1/10/key/value

  const params = new URLSearchParams();
  //  params.append("corp_code", corpCode);
  params.append("page_num", "1");
  params.append("page_size", "10");
  params.append("param_key", "");
  params.append("param_value", "");

  const json = await fetchWrapper.get(
    `/astro-v2/astroapi/base/v2/joblog/${corpCode}/paging/1/10/key/value`
  );

  // Debug logging
  console.log("apiCall res.data:", json.data);
  console.log("apiCall res:", json);

  return { data: json.data, status: json.status, error: json.message };
};
