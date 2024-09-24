import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { Button, InputField } from "../../components";

import paths from "../../utils/paths";
import image from "../../assets/login.png";
import { FcGoogle } from "react-icons/fc";

import { apiLogin, apiRegister } from "../../apis/user";
import { register } from "../../store/user/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [payload, setPayload] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [isRegister, setIsRegister] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const resetPayload = () =>
    setPayload({
      firstname: "",
      lastname: "",
      mobile: "",
      email: "",
      password: "",
    });

  const handleSubmit = useCallback(async () => {
    const { firstname, lastname, ...data } = payload;
    if (isRegister) {
      const response = await apiRegister(payload);
      if (response.success) {
        Swal.fire("Thành công!", response.mes, "success").then(() => {
          setIsRegister(false);
          resetPayload();
        });
      } else Swal.fire("Có lỗi!", response.mes, "error");
    } else {
      const response = await apiLogin(data);
      if (response.success) {
        dispatch(
          register({
            isLoggedIn: true,
            token: response.accessToken,
            userData: response.userData,
          }),
        );
        navigate(`/${paths.HOME}`);
      } else Swal.fire("Có lỗi!", response.mes, "error");
    }
  }, [payload, isRegister, navigate, dispatch]);

  return (
    <div className="container">
      <div className="mb-4 mt-2 flex items-center justify-between">
        <img src={image} alt="login" className="h-[620px] object-cover" />
        <div className="flex w-[520px] flex-col items-center justify-around gap-6">
          <h1 className="text-center text-4xl font-medium tracking-wider">
            {isRegister
              ? "Đăng ký tài khoản Eshop"
              : isForgotPassword
                ? "Quên mật khẩu"
                : "Đăng nhập vào Eshop Digital"}
          </h1>
          <div className="flex w-full flex-col items-center justify-around gap-6">
            {isRegister && (
              <>
                <div className="flex items-center justify-around gap-20">
                  <InputField
                    value={payload.firstname}
                    setValue={setPayload}
                    placeholder={"Họ"}
                    nameKey="firstname"
                  />
                  <InputField
                    value={payload.lastname}
                    placeholder={"Tên"}
                    setValue={setPayload}
                    nameKey="lastname"
                  />
                </div>
                <InputField
                  value={payload.mobile}
                  setValue={setPayload}
                  placeholder={"Điện thoại"}
                  nameKey="mobile"
                />
              </>
            )}

            <InputField
              value={payload.email}
              setValue={setPayload}
              placeholder={"Email"}
              nameKey="email"
            />
            {!isForgotPassword && (
              <InputField
                value={payload.password}
                setValue={setPayload}
                placeholder={"Mật khẩu"}
                type={"password"}
                nameKey="password"
              />
            )}
          </div>
          {isForgotPassword ? (
            <Button
              name={"Tiếp tục"}
              bgColor={"bg-primary"}
              textColor={"text-white"}
              font={" text-lg font-bold hover:text-black"}
              // handleOnclick={handleForgotPassword}
            />
          ) : (
            <Button
              name={isRegister ? "Đăng ký" : "Đăng nhập"}
              bgColor={"bg-primary"}
              textColor={"text-white"}
              font={" text-lg font-bold hover:text-black"}
              handleOnclick={handleSubmit}
            />
          )}
          {!isRegister ? (
            <div className="flex w-full items-center justify-between px-2">
              <span className="text-gray-500">
                Chưa có tài khoản?{" "}
                <span
                  className="cursor-pointer text-blue-700"
                  onClick={() => setIsRegister(true)}
                >
                  Đăng ký
                </span>
              </span>
              {isForgotPassword ? (
                <span
                  className="cursor-pointer text-blue-700"
                  onClick={() => {
                    setIsRegister(false);
                    setIsForgotPassword(false);
                  }}
                >
                  Đăng nhập
                </span>
              ) : (
                <span
                  className="cursor-pointer text-blue-700"
                  onClick={() => setIsForgotPassword(true)}
                >
                  Quên mật khẩu?
                </span>
              )}
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
            iconBefore={<FcGoogle fontSize={"24"} />}
            handleOnclick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
