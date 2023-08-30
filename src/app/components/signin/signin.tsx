"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [submitError, setSubmitError] = useState("");

  const apiLogit = "https://api.realworld.io/api/users/login";

  const onSubmit = async (data: any) => {
    const payload = {
      user: data,
    };

    try {
      const response = await fetch(apiLogit, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Ошибка при регистрации");
      }

      const responseData = await response.json();
      console.log("Успешная регистрация:", responseData);
      setSubmitError("");
    } catch (error) {
      console.error("Произошла ошибка:", error);
      setSubmitError("email or password is invalid");
    }
  };

  return (
    <form className="flex justify-center" onSubmit={handleSubmit(onSubmit)}>
      <div className="max-w-[540px]">
        <h1 className="text-center text-[40px] mb-[0.5rem]">Sign in</h1>

        <a
          className="flex justify-center text-[16px] text-primary hover:text-primaryHover hover:underline mb-[1rem]"
          href="#signup">
          Need an account?
        </a>

        <div className="flex flex-col">
          <ul className="list-disc mb-[1rem] pl-[40px]">
            {errors && <li className="text-error font-bold">{submitError}</li>}
          </ul>

          <input
            className="w-[540px] mb-[1rem] rounded-[0.3rem] border-[1px] px-[24px] py-[12px]"
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />

          <input
            className="w-[540px] mb-[1rem] rounded-[0.3rem] border-[1px] px-[24px] py-[12px]"
            type="password"
            placeholder="Password"
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
