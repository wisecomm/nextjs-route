"use client";

import { apiCall } from "@/app/api/callSampl01";
import React from "react";

function page() {
  const handleLogin = async () => {
    console.log("login");
    apiCall();
  };

  return (
    <div>
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
}

export default page;
