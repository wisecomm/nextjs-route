import fetchWrapper from "@/app/lib/fetchWrapper";

export const apiCall = async (): Promise<{
  data: any[];
  code: string;
  error: string;
}> => {
  const params = new URLSearchParams();
  params.append("user_id", "superadmin");
  params.append("user_pwd", "1234");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const res: any = await fetchWrapper.post(
    `/astro-v2/astroapi/base/v2/auth/adminlogin?${params.toString()}`
  );

  // Debug logging
  console.log("API Response:", res.data);
  console.log("Response type:", typeof res);

  return { data: res.data, code: res.code, error: res.message };
};
