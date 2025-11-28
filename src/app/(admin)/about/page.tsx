"use client";

import React, { useState } from "react";
import { api } from "@/app/api/axiosClient";
import { Button } from "@/components/ui/button";

interface LoginResponseData {
  accessToken: string;
  refreshToken: string;
}


function Page() {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);

  const handleCheckAuth = async () => {
    setLoading(true);
    try {
      // 예시: 사용자 정보 조회 API 호출
      // 실제 백엔드 API 경로에 맞춰 수정해주세요.
      // /api/users -> Next.js Proxy -> External API /users
      const apiResponse = await api.get<LoginResponseData>("/auth/users");
      if (apiResponse.code === '200' && apiResponse.data) {
        const { accessToken, refreshToken } = apiResponse.data;
        console.log("accessToken", accessToken);
        console.log("refreshToken", refreshToken);
      }

      console.log("API Response:", apiResponse);
      setData(apiResponse);
    } catch (error) {
      console.error("API Error:", error);
      setData({ error: "API 요청 실패 (콘솔 확인)" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">About Page (API Test)</h1>
      <div className="space-y-4">
        <p>로그인 상태에서 버튼을 누르면 자동으로 토큰이 포함되어 전송됩니다.</p>

        <Button onClick={handleCheckAuth} disabled={loading}>
          {loading ? "로딩 중..." : "API 테스트 (GET /users)"}
        </Button>

        {!!data && (
          <div className="mt-4 p-4 bg-slate-100 rounded-md overflow-auto max-h-[400px]">
            <h3 className="font-bold mb-2">결과:</h3>
            <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
