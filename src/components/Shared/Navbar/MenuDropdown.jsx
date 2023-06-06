import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "./Avatar";
import { useCallback, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import HostRequestModal from "../../Modal/HostRequestModal";
import useAuth from "../../../hook/useAuth";
import { becomeHost } from "../../../api/auth";
import { toast } from "react-hot-toast";
const MenuDropdown = () => {
  const { user, logOut, role, setRole } = useAuth();
  const [modal, setModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  // console.log(role);
  const modalHandler = (email) => {
    becomeHost(email).then((data) => {
      // console.log(data);
      toast.success("You are now, Post Rooms!");
      setRole("host");
      navigate("/dashboard/add-room");
      closeModalHandler();
    });
  };
  const closeModalHandler = () => {
    setModal(false);
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        {/* AirCNC Button */}
        <div className="hidden md:block    ">
          {!role && (
            <button
              className="cursor-pointer text-sm font-semibold rounded-full hover:bg-neutral-100 transition px-8 py-3"
              onClick={() => setModal(true)}
              disabled={!user}
            >
              AirCNC your home
            </button>
          )}
        </div>
        {/* Dropdown Button */}
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            <Link
              to="/"
              className="block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold"
            >
              Home
            </Link>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  DashBoard
                </Link>
                <div
                  onClick={() => {
                    setRole(null);
                    logOut();
                  }}
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
                >
                  Logout
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
      <HostRequestModal
        email={user?.email}
        modalHandler={modalHandler}
        isOpen={modal}
        closeModalHandler={closeModalHandler}
      />
    </div>
  );
};

export default MenuDropdown;
