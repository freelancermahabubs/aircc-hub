import React, { useContext } from "react";
import AvatarImg from "../../../assets/images/placeholder.jpg";
import { AuthContext } from "../../../providers/AuthProvider";
const Avatar = () => {
  const { user } = useContext(AuthContext);
  return (
    <img
      className="rounded-full"
      referrerPolicy="no-referrer"
      src={user && user?.photoURL ? user?.photoURL : AvatarImg}
      alt="Profile"
      height="30"
      width="30"
    />
  );
};

export default Avatar;
