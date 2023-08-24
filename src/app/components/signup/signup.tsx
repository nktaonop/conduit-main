export default function SignUp() {
  return (
    <div className="flex justify-center">
      <div className="max-w-[540px]">
        <h1 className="text-center text-[40px] mb-[0.5rem]">Sign up</h1>
        <a
          className="flex justify-center text-[16px] text-primary hover:text-primaryHover hover:underline mb-[1rem]"
          href="#signup"
        >
          Have an accound?
        </a>
        <div className="flex flex-col">
          <input
            className="w-[540px] mb-[1rem] rounded-[0.3rem] border-[1px]
          px-[24px] py-[12px]"
            type="text"
            placeholder="Username"
          />
          <input
            className="w-[540px] mb-[1rem] rounded-[0.3rem] border-[1px]
          px-[24px] py-[12px]"
            type="text"
            placeholder="Email"
          />
          <input
            className="w-[540px] mb-[1rem] rounded-[0.3rem] border-[1px]
          px-[24px] py-[12px]"
            type="text"
            placeholder="Password"
          />
        </div>
        <button className="float-right px-6 py-3 bg-primary hover:bg-primaryHover text-white rounded-[0.3rem]">
          Sign in
        </button>
      </div>
    </div>
  );
}
