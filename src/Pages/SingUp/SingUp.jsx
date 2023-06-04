import { Link, useLocation, useNavigate } from "react-router-dom";

import { TbFidgetSpinner } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";
import { saveUser } from "../../api/auth";
const SingUp = () => {
  const {
    createUser,

    loading,
    setLoading,
    signInWithGoogle,
  } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate("");
  let location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const handleSingUp = (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    // image upload
    const image = form.image.files[0];
    const formData = new FormData();
    formData.append("image", image);
    // const url = `https://api.imgbb.com/1/upload?key=${
    //   import.meta.env.VITE_IMGBB_KEY
    // }`;
    fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((imageData) => {
        const imageURl = imageData.data.display_url;
        // console.log(imageData.data.display_url);
        if (!/(?=.*[A-Z])/.test(password)) {
          setError(toast.error("Please add at least Two Uppercase Letter", {}));
          return;
        } else if (!/(?=.*[!@#$&*])/.test(password)) {
          setError(toast.error("Please Add a Special Character.", {}));
          return;
        } else if (!/(?=.*[0-9].*[0-9])/.test(password)) {
          setError(toast.error("Please add atLeast two number", {}));
          return;
        } else if (!/(?=.*[a-z].*[a-z].*[a-z])/.test(password)) {
          setError(
            toast.error("Please add atLeast three lowercase letters", {})
          );
          return;
        } else if (password.length < 6) {
          setError(
            toast.error("Please add At least 6 Characters In your Password", {})
          );
          return;
        }
        createUser(email, password)
          .then((result) => {
            setSuccess(toast.success("SuccessFully Create Account", {}));
            updateUserData(result.user, name, imageURl);
            // todo save user to db
            saveUser(result.user);
            navigate(from, { replace: true });
          })
          .catch((error) => {
            // console.log(error);
            toast.error(error.message);
          });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
        toast.error(error.message);
      });

    // return;
  };

  const updateUserData = (user, name, imageURl) => {
    console.log(name, imageURl);
    updateProfile(user, {
      displayName: name,
      photoURL: imageURl,
    })
      .then(() => {
        setSuccess(toast.success("User Photo Updated", {}));
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleGoogleLogIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        setSuccess(toast.success("Google SinIn Success", {}));
        // todo save add to db user
        saveUser(result.user);
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-gray-400">Welcome to AirCNC</p>
        </div>
        <form
          onSubmit={handleSingUp}
          noValidate=""
          action=""
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Name
              </label>
              <input
                style={{ borderRadius: "0px 200px 0px 200px" }}
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Name Here"
                className="w-full px-3 text-center py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div>
              <label htmlFor="image" className="block mb-2 text-sm">
                Select Image:
              </label>
              <input
                required
                type="file"
                id="image"
                name="image"
                accept="image/*"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                style={{ borderRadius: "0px 200px 0px 200px" }}
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 text-center py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Password
                </label>
              </div>
              <input
                style={{ borderRadius: "0px 200px 0px 200px" }}
                type="password"
                name="password"
                id="password"
                required
                placeholder="*******"
                className="w-full px-3 text-center py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-rose-500 w-full rounded-md py-3 text-white"
            >
              {loading ? (
                <TbFidgetSpinner className="m-auto animate-spin" siz={24} />
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Signup with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <div
          onClick={handleGoogleLogIn}
          className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer"
        >
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </div>
        <p className="px-6 text-sm text-center text-gray-400">
          Already have an account?
          <Link
            to="/login"
            className="hover:underline hover:text-rose-500 text-gray-600"
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SingUp;
