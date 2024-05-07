import React, { memo } from "react";
import icons from "../utils/icons";

const { IoMdSend, ImFacebook, FiTwitter, BsInstagram, RiLinkedinFill } = icons;

const Footer = () => {
  return (
    <div className="flex w-full items-center justify-center bg-black">
      <div className="container flex items-start justify-between px-2 py-[35px] text-[#ccc]">
        <div className="flex flex-col gap-3">
          <span className="text-2xl font-semibold">Eshop Digital</span>
          <span className="text-small font-medium">Subscribe</span>
          <span className="text-small font-main2 font-extralight">
            Get 10% off your first order
          </span>
          <div className="flex items-center justify-center rounded-md bg-[#eee] px-4 py-2">
            <input
              type="text"
              className="flex-auto bg-[#eee] font-medium text-black  outline-none"
              placeholder="Enter your email"
            />
            <span className="cursor-pointer text-black hover:text-main">
              <IoMdSend fontSize={"24"} />
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-2xl font-semibold">Support</span>
          <span className="text-small font-medium">Ninh Kieu, Can Tho</span>
          <span className="text-small font-medium">eshopdigital@gmail.com</span>
          <span className="text-small font-medium">0123-456-789</span>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-2xl font-semibold">Account</span>
          <span className="text-small">My Account</span>
          <span className="text-small">Login / Register</span>
          <span className="text-small">Cart</span>
          <span className="text-small">Wish List</span>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-2xl font-semibold">Quick Link</span>
          <span className="text-small">Privacy Policy</span>
          <span className="text-small">Terms Of Use</span>
          <span className="text-small">FAQs</span>
          <span className="text-small">Contact</span>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-2xl font-semibold">Social Media</span>
          <div className="flex items-center justify-center gap-4">
            <span className="text-small">
              <ImFacebook size={24} />
            </span>
            <span className="text-small">
              <FiTwitter size={24} />
            </span>
            <span className="text-small">
              <BsInstagram size={24} />
            </span>
            <span className="text-small">
              <RiLinkedinFill size={24} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Footer);
