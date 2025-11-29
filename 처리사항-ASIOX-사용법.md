
# 소스 관계
- src/app/api : 디렉토리 복사
- src/app/actions/api-utils.ts : 복사
- src/types/index.ts : 복사  

- middleware : 사용법 확인 

############################################
# 로그인 시 샘플 
############################################

        // Server Action 호출
        const formData = new FormData();
        formData.append('userid', submitData.userid);
        formData.append('password', submitData.password);

        const loginResult = await login(formData);

        if (loginResult.code !== '200') {
          toast({
            title: "Login Failed",
            description: loginResult.message,
            variant: "destructive",
          });
          return;
        }

############################################
# about 샘플 : aip call 후 데이터 처리 
############################################
      // 예시: 사용자 정보 조회 API 호출
      // 실제 백엔드 API 경로에 맞춰 수정해주세요.
      // /api/users -> Next.js Proxy -> External API /users
      const apiResponse = await api.get<LoginResponseData>("/auth/users");
      if (apiResponse.code === '200' && apiResponse.data) {
        const { accessToken, refreshToken } = apiResponse.data;
        console.log("accessToken", accessToken);
        console.log("refreshToken", refreshToken);
      }

