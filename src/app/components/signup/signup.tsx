"use client";

import { useForm } from "react-hook-form";
import {httpClient} from "@/app/providers/http.provider";
import {parseErrorList} from "@/app/helpers/error-list.helpers";
import {setItem} from "@/app/helpers/storage.helpers";
import {AUTH_TOKEN_KEY} from "@/app/constants/common.constants";
import {emailValidator, simpleControlValidator} from "@/app/constants/validator.constants";

export default function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (payload: any) => {
    try {
      const response = await httpClient.post('/users', {user: payload})
      const token = response.data.user.token;
      setItem(AUTH_TOKEN_KEY, token);

      // TODO!: made redirect to home page
    } catch (error) {
      const errors = parseErrorList(error);
      console.log(errors);
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
            {...register("username", simpleControlValidator)}
          />
          <input
            id="email"
            placeholder="Email"
            className="w-[540px] mb-[1rem] rounded-[0.3rem] border-[1px]
          px-[24px] py-[12px]"
            {...register("email", emailValidator)}
          />
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="w-[540px] mb-[1rem] rounded-[0.3rem] border-[1px]
          px-[24px] py-[12px]"
            {...register("password", simpleControlValidator)}
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
