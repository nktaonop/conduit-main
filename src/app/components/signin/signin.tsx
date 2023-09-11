"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { httpClient } from "@/app/providers/http.provider";
import { parseErrorList } from "@/app/helpers/error-list.helpers";
import {
  emailValidator,
  simpleControlValidator,
} from "@/app/constants/validator.constants";
import Error from "@/app/components/error-message/error-message";
import { setItem } from "@/app/helpers/storage.helpers";
import { AUTH_TOKEN_KEY } from "@/app/constants/common.constants";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [submitError, setSubmitError] = useState("");

  const router = useRouter();

  const onSubmit = async (payload: any) => {
    try {
      const response = await httpClient.post("/users/login", { user: payload });
      const token = response.data.user.token;
      setItem(AUTH_TOKEN_KEY, token);
      // TODO!: set token to local storage,
      // TODO!: you can get token from response

      // TODO!: made redirect to home page
      router.push("/");
    } catch (error: any) {
      const errors = parseErrorList(error);
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
          <ul className="mb-[1rem] pl-[40px]">
            {errors && <li className="text-error font-bold">{submitError}</li>}
          </ul>

          <input
            className="w-[540px] mb-[1rem] rounded-[0.3rem] border-[1px] px-[24px] py-[12px]"
            placeholder="Email"
            {...register("email", emailValidator)}
          />
          <Error errors={errors} field={"email"} />

          <input
            className="w-[540px] mb-[1rem] rounded-[0.3rem] border-[1px] px-[24px] py-[12px]"
            type="password"
            placeholder="Password"
            {...register("password", simpleControlValidator)}
          />
          <Error errors={errors} field={"password"} />
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
