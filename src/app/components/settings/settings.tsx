"use client";
import { httpClient } from "@/app/providers/http.provider";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { UserPayloadInterface } from "../interfaces/user.interface";
import { AUTH_TOKEN_KEY } from "@/app/constants/common.constants";
import { removeItem, setItem } from "@/app/helpers/storage.helpers";
import { useRouter } from "next/navigation";
import { parseErrorList } from "@/app/helpers/error-list.helpers";
import {
  emailValidator,
  simpleControlValidator,
} from "@/app/constants/validator.constants";

export default function UserSettings() {
  const [user, setUser] = useState({ username: "", email: "" });
  const { register, handleSubmit } = useForm<UserPayloadInterface>();

  const router = useRouter();

  const onSubmit = async (payload: UserPayloadInterface) => {
    try {
      const response = await httpClient.put("/user", { user: payload });
      const token = response.data.user.token;
      setItem(AUTH_TOKEN_KEY, token);
      router.push("/");
    } catch (error) {
      const errors = parseErrorList(error);
      console.log(errors);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const {
        data: { user },
      } = await httpClient.get("/user");
      setUser(user);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    removeItem(AUTH_TOKEN_KEY);
    router.push("/");
  };

  return (
    <div className="flex justify-center mt-[1.5rem]">
      <div className="max-w-[540px]">
        <h1 className="text-center text-[40px]">Your Settings</h1>
        <form
          className="flex flex-col items-center"
          onSubmit={handleSubmit(onSubmit)}>
          <input
            className="py-[0.5rem] px-[0.75rem] text-inputColor border border-solid border-black border-opacity-20 rounded w-[540px] h-[38px] mb-[1rem]"
            defaultValue="https://api.realworld.io/images/smiley-cyrus.jpeg"
          />
          <input
            className="py-[0.75rem] px-[1.5rem] text-inputColor text-[1.25rem] border border-solid border-black border-opacity-20 rounded w-[540px] h-[51px] mb-[1rem]"
            defaultValue={user.username}
            {...register("username", simpleControlValidator)}
          />
          <textarea
            className="py-[0.75rem] px-[1.5rem] text-inputColor text-[1.25rem] border border-solid border-black border-opacity-20 rounded w-[540px] h-[194px] mb-[1rem]"
            placeholder="Short bio about you"></textarea>
          <input
            className="py-[0.75rem] px-[1.5rem] text-inputColor text-[1.25rem] border border-solid border-black border-opacity-20 rounded w-[540px] h-[51px] mb-[1rem]"
            {...register("email", emailValidator)}
            defaultValue={user.email}
          />
          <input
            className="py-[0.75rem] px-[1.5rem] text-inputColor text-[1.25rem] border border-solid border-black border-opacity-20 rounded w-[540px] h-[51px] mb-[1rem]"
            {...register("password", simpleControlValidator)}
            placeholder="New Password"
          />
          <button
            className="ml-auto py-[0.75rem] px-[1.5rem] bg-primary text-white rounded-[0.3rem] text-[20px] hover:bg-primaryHover"
            type="submit">
            Update Settings
          </button>
          <hr className="mt-[1rem] mb-[1rem] border-1 border-gray-300 w-full" />
          <button
            className="mr-auto py-[0.5rem] px-[1rem] border border-solid text-logoutButton border-logoutButton rounded hover:text-white hover:bg-logoutButton"
            onClick={handleLogout}>
            Or click here to logout.
          </button>
        </form>
      </div>
    </div>
  );
}
