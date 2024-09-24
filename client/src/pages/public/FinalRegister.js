import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import paths from "../../utils/paths";

const FinalRegister = () => {
  const { status } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (status === "failed")
      Swal.fire("Oops", "Đăng ký không thành công!", "error").then(() =>
        navigate(`/${paths.LOGIN}`),
      );
    else if (status === "success")
      Swal.fire("Chúc mừng!", "Đăng ký thành công!", "success").then(() =>
        navigate(`/${paths.LOGIN}`),
      );
  }, [navigate, status]);

  return <div className="h-screen w-screen bg-gray-100"></div>;
};

export default FinalRegister;
