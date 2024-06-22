import React, { useState, useCallback } from "react";
import image from "../../assets/login.png";
import InputField from "../../components/InputField";
import { Button } from "../../components";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = useCallback(() => {
    console.log(payload);
  }, [payload]);

  return (
    <div className="container">
      <div className="mb-4 mt-2 flex items-center justify-between">
        <img src={image} alt="login" className="h-[620px] object-cover" />
        <div className="flex w-[520px] flex-col items-center justify-around gap-6">
          <h1 className="text-center text-4xl font-medium tracking-wider">
            {isRegister
              ? "Đăng ký tài khoản Eshop"
              : "Đăng nhập vào Eshop Digital"}
          </h1>
          <div className="flex w-full flex-col justify-between gap-6">
            {isRegister && (
              <InputField
                value={payload.name}
                setValue={setPayload}
                nameKey="name"
              />
            )}
            <InputField
              value={payload.email}
              setValue={setPayload}
              nameKey="email"
            />
            <InputField
              value={payload.password}
              setValue={setPayload}
              type={"password"}
              nameKey="password"
            />
          </div>
          <Button
            name={isRegister ? "Đăng ký" : "Đăng nhập"}
            bgColor={"bg-primary"}
            textColor={"text-white"}
            font={" text-lg font-bold hover:text-black"}
            handleOnclick={handleSubmit}
          />

          {!isRegister ? (
            <div className="flex w-full items-center justify-between px-2">
              <span>
                Chưa có tài khoản?{" "}
                <span
                  className="cursor-pointer text-blue-700"
                  onClick={() => setIsRegister(true)}
                >
                  Đăng ký
                </span>
              </span>
              <span className="cursor-pointer text-blue-700">
                Quên mật khẩu?
              </span>
            </div>
          ) : (
            <span className="w-full">
              Đã có tài khoản?{" "}
              <span
                className="cursor-pointer text-blue-700"
                onClick={() => setIsRegister(false)}
              >
                Đăng nhập
              </span>
            </span>
          )}
          <Button
            name={isRegister ? "Đăng ký bằng Google" : "Đăng nhập bằng Google"}
            iconBefore={<FcGoogle />}
            handleOnclick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
