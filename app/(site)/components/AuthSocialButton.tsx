import React from "react";
import { IconType } from "react-icons";

interface Button {
  icon: IconType;
  onClick: () => void;
}

const AuthSocialButton: React.FC<Button> = ({ icon: Icon, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-md ring-1 ring-inset ring-gray-300"
    >
      <Icon />
    </button>
  );
};

export default AuthSocialButton;
