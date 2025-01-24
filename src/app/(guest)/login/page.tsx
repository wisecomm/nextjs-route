"use client";

import React, { useState } from "react";
import Image from "next/image";
//import { setLogin } from "@/app/api/useSetLogin";
import { setToken } from "@/app/utils/cookie";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    // Call your login API or handle login logic here
    console.log("Username:", username);
    console.log("Password:", password);

    try {
      /*
      const { data, status, error } = await setLogin();

      console.log("handleLogin data=" + data);
      console.log("handleLogin status=" + status);
      console.log("handleLogin error=" + error);

      setToken(data.key);
      */

      setToken("test-token-1234567");
      window.location.replace("/main");
    } catch (error) {
      console.log("login error: " + error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <Image
          className="dark:invert"
          src="/image/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          style={{ width: 180, height: 38 }}
          priority
        />
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
