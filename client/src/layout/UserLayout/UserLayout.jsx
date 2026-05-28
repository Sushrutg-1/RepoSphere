import React from "react";
import Navbar from "../../components/navbar/Navbar";

const UserLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default UserLayout;
