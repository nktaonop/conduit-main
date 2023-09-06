"use client";

import axios from "axios";
import { useForm } from "react-hook-form";

export default function SignUp() {
  const { register, handleSubmit } = useForm();

  const apiRegister = "https://api.realworld.io/api/users";

  const onSubmit = async (data: any) => {
    const payload = {
      user: data,
    };

    try {
      const response = await axios.post(apiRegister, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) {
        throw new Error("Ошибка при регистрации");
      }

      const responseData = response.data;
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="flex justify-center" onSubmit={handleSubmit(onSubmit)}>
      <div className="max-w-[540px]">
        <h1 className="text-center text-[40px] mb-[0.5rem]">Sign up</h1>

        <a
          className="flex justify-center text-[16px] text-primary hover:text-primaryHover hover:underline mb-[1rem]"
          href="#signup">
          Have an accound?
        </a>

        <div className="flex flex-col">
          <input
            id="text"
            type="username"
            placeholder="Username"
            className="w-[540px] mb-[1rem] rounded-[0.3rem] border-[1px] px-[24px] py-[12px]"
            {...register("username", { required: true })}
          />
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="w-[540px] mb-[1rem] rounded-[0.3rem] border-[1px]
          px-[24px] py-[12px]"
            {...register("email", { required: true })}
          />
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="w-[540px] mb-[1rem] rounded-[0.3rem] border-[1px]
          px-[24px] py-[12px]"
            {...register("password", { required: true })}
          />
        </div>

        <button
          type="submit"
          className="float-right px-6 py-3 bg-primary hover:bg-primaryHover text-white rounded-[0.3rem]">
          Sign in
        </button>
      </div>
    </form>
  );
}
