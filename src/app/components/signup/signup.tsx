"use client";

import { useForm } from "react-hook-form";

type TFormValues = {
  username: string;
  email: string;
  password: string;
};

export default function SignUp() {
  const { register, handleSubmit } = useForm<TFormValues>();

  const apiUsers = "https://api.realworld.io/api/users";

  const onSubmit = async (data: any) =>
    await fetch(apiUsers, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

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
            id="username"
            typeof="username"
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

        <button className="float-right px-6 py-3 bg-primary hover:bg-primaryHover text-white rounded-[0.3rem]">
          Sign in
        </button>
      </div>
    </form>
  );
}
