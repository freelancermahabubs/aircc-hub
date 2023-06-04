import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext, useRef, useState } from "react";
import { saveUser } from "../../api/auth";
const Login = () => {
  const { signIn, resetPassword, setLoading, signInWithGoogle, loading } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const emailRef = useRef();
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signIn(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setSuccess(toast.success("Login Successfully", {}));
        form.reset();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/wrong-password") {
          setError(toast.error("Your Password doesn't match", {}));
        }
      });
  };
  const handleGoogleLogIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        setSuccess(toast.success("Google SinIn Success", {}));
        saveUser(result.user);
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };

  const handleRestPassword = () => {
    const email = emailRef.current.value;
    console.log(email);
    if (!email) {
      setError(
        toast.error("Please Provide Your Email Address to Rest Password", {})
      );
      return;
    }

    resetPassword(email)
      .then(() => {
        setSuccess(toast.success("Please Check Your Email", {}));
        setLoading(false);
      })
      .catch((error) => {
        //  console.log(error);
        toast.error(error.message);
      });
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Log In</h1>
          <p className="text-sm text-gray-400">
            Sign in to access your account
          </p>
        </div>
        <form
          onSubmit={handleLogin}
          noValidate=""
          action=""
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                style={{ borderRadius: "0px 200px 0px 200px" }}
                type="email"
                ref={emailRef}
                name="email"
                id="email"
                required
                placeholder="Enter Your Email Here"
                className="w-full  px-3  text-center py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
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
        <div className="space-y-1">
          <button
            onClick={handleRestPassword}
            className="text-xs hover:underline hover:text-rose-500 text-gray-400"
          >
            Forgot password?
          </button>
        </div>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Login with social accounts
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
          Don't have an account yet?
          <Link
            to="/signup"
            className="hover:underline hover:text-rose-500 text-gray-600"
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
