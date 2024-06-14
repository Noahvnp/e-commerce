import React, { useState } from "react";
import image from "../../assets/login.png";
import InputField from "../../components/InputField";
import { Button } from "../../components";

const Login = () => {
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    password: "",
  });
  return (
    <div className="container">
      <div className="mb-3 flex items-center justify-between">
        <img src={image} alt="login" className="h-[620px] object-cover" />
        <div className="flex flex-col items-center justify-around gap-8">
          <h1 className="text-center text-4xl font-medium tracking-wider">
            Đăng nhập vào Eshop Digital
          </h1>
          <div className="flex w-full flex-col justify-between gap-6">
            <InputField
              value={payload.name}
              setValue={setPayload.name}
              nameKey="name"
            />
            <InputField
              value={payload.email}
              setValue={setPayload.email}
              nameKey="email"
            />
            <InputField
              value={payload.password}
              setValue={setPayload.password}
              nameKey="password"
            />
          </div>
          <Button
            name={"Đăng nhập"}
            className="w-full rounded-md bg-main p-4 text-xl font-semibold text-white"
          />
          <span className="w-full">
            Chưa có tài khoản?{" "}
            <span className="cursor-pointer text-blue-700">Đăng ký</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
