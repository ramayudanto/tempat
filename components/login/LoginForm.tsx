import React from "react";

export default function LoginForm({ loginInputRef, onSubmit }: any) {
  return (
    <form className="px-4 w-full" onSubmit={onSubmit}>
      <p className="font-medium mb-2">Email</p>
      <input required spellCheck={false} type="email" className="border-[1px] w-full rounded outline-none p-2" placeholder="Enter your email" ref={loginInputRef} />
      <button type="submit" className="w-full py-4 mt-7 font-semibold text-white bg-darkRed rounded-full">
        lanjut
      </button>
    </form>
  );
}
