import React from "react";

const Footer = () => {
  return (
    <footer className="w-full h-20 flex items-center justify-center text-primary bg-secondary-50 mt-4 md:mt-6">
      <p className="text-sm">
        كافة الحقوق محفوظة لدى: متجر التجربة الجميلة | {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
