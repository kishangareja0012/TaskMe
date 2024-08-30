import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Textbox from "../components/Textbox";
import Button from "../components/Button";
import { useSelector, useDispatch } from "react-redux";
import { useRegisterMutation } from "../redux/slices/apiSlice";
import { logout, setCredentials } from "../redux/slices/authSlice";

const Register = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [registerUser, { isLoading }] = useRegisterMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const navigate = useNavigate();

  const isAdmin = watch("isAdmin", false); // Watch the isAdmin field

  const submitHandler = async (data) => {
    try {
      const userData = await registerUser({ ...data, isAdmin }).unwrap();
      dispatch(setCredentials(userData));
      dispatch(logout());
      navigate("/log-in");
    } catch (err) {
      console.error("Failed to register:", err);
    }
  };

  // useEffect(() => {
  //   if (user) {
  //     navigate("/dashboard");
  //   }
  // }, [user, navigate]);

  const handleNavigateToLogin = () => {
    navigate("/log-in");
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]">
      <div className="w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center">
        <div className="h-full w-full lg:w-2/3 flex flex-col items-center justify-center">
          <div className="w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20">
            <span className="flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base border-gray-300 text-gray-600">
              Join us and manage all your tasks in one place!
            </span>
            <p className="flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700">
              <span>Get Started</span>
              <span>with Task Manager</span>
            </p>
            <div className="cell">
              <div className="circle rotate-in-up-left"></div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14"
          >
            <div>
              <p className="text-blue-600 text-3xl font-bold text-center">
                Create your account
              </p>
              <p className="text-center text-base text-gray-700">
                Join us and keep all your credentials safe.
              </p>
            </div>

            <div className="flex flex-col gap-y-5">
              <Textbox
                placeholder="Name"
                type="text"
                name="name"
                label="Name"
                className="w-full rounded-full"
                register={register("name", {
                  required: "Name is required!",
                })}
                error={errors.name ? errors.name.message : ""}
              />
              <Textbox
                placeholder="Title"
                type="text"
                name="title"
                label="Title"
                className="w-full rounded-full"
                register={register("title", {
                  required: "Title is required!",
                })}
                error={errors.title ? errors.title.message : ""}
              />
              <Textbox
                placeholder="Role"
                type="text"
                name="role"
                label="Role"
                className="w-full rounded-full"
                register={register("role", {
                  required: "Role is required!",
                })}
                error={errors.role ? errors.role.message : ""}
              />
              <Textbox
                placeholder="email@example.com"
                type="email"
                name="email"
                label="Email Address"
                className="w-full rounded-full"
                register={register("email", {
                  required: "Email Address is required!",
                })}
                error={errors.email ? errors.email.message : ""}
              />
              <Textbox
                placeholder="your password"
                type="password"
                name="password"
                label="Password"
                className="w-full rounded-full"
                register={register("password", {
                  required: "Password is required!",
                })}
                error={errors.password ? errors.password.message : ""}
              />

              <div className="flex items-center gap-2">
                <input type="checkbox" id="isAdmin" {...register("isAdmin")} />
                <label htmlFor="isAdmin" className="text-gray-700">
                  Admin
                </label>
              </div>

              <Button
                type="submit"
                label={isLoading ? "Loading..." : "Register"}
                className="w-full h-10 bg-blue-700 text-white rounded-full"
                disabled={isLoading}
              />

              <span
                onClick={handleNavigateToLogin}
                className="text-sm text-center text-gray-500 hover:text-blue-600 hover:underline cursor-pointer"
              >
                Already have an account
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
