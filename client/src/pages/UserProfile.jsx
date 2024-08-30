import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useUpdateUserProfileMutation } from "../redux/slices/apiSlice";
import {
  selectUserProfile,
  selectUserProfileStatus,
  selectUserProfileError,
} from "../redux/slices/userProfileSlice";
import Textbox from "../components/Textbox";
import Button from "../components/Button";

const UserProfile = () => {
  const profile = useSelector(selectUserProfile);
  const status = useSelector(selectUserProfileStatus);
  const error = useSelector(selectUserProfileError);
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: profile,
  });

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      await updateUserProfile(data).unwrap();
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  useEffect(() => {
    // Fetch the current profile if needed
    // dispatch(fetchUserProfile());
  }, [dispatch]);

  return (
    <div className="w-full flex items-center justify-center bg-[#f3f4f6] p-4">
      <div className="w-full md:w-3/4 lg:w-1/2 p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center text-blue-700">
          User Profile
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Textbox
            placeholder="Name"
            type="text"
            name="name"
            label="Name"
            register={register("name", { required: "Name is required" })}
            error={errors.name ? errors.name.message : ""}
            className="w-full"
          />
          <Textbox
            placeholder="Title"
            type="text"
            name="title"
            label="Title"
            register={register("title")}
            error={errors.title ? errors.title.message : ""}
            className="w-full"
          />
          <Textbox
            placeholder="Role"
            type="text"
            name="role"
            label="Role"
            register={register("role")}
            error={errors.role ? errors.role.message : ""}
            className="w-full"
          />
          <Textbox
            placeholder="Email"
            type="email"
            name="email"
            label="Email"
            register={register("email", { required: "Email is required" })}
            error={errors.email ? errors.email.message : ""}
            className="w-full"
          />
          <Button
            type="submit"
            label={status === "loading" ? "Updating..." : "Update Profile"}
            className="w-full h-12 bg-blue-700 text-white rounded-full text-lg"
            disabled={status === "loading"}
          />
          {error && <p className="text-red-600 text-center mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
