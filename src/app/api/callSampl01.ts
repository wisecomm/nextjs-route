import fetchWrapper from "@/app/lib/fetchWrapper";

export const apiCall = async () => {
  const params = new URLSearchParams();
  params.append("user_id", "superadmin");
  params.append("user_pwd", "1234");

  const res: JSON = await fetchWrapper.call(
    `/astro-v2/astroapi/base/v2/auth/adminlogin?${params.toString()}`,
    {
      method: "post",
    }
  );

  // Debug logging
  console.log("API Response:", res);
  console.log("Response type:", typeof res);

  return res;
};
