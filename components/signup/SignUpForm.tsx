import { useRouter } from "next/router";
import { FormEvent } from "react";

export default function SignUpForm({ emailInputRef, isPasswordValid, passwordState, nameInputRef, setPassword, onSubmit, isUserExist, test }: any) {
  const router = useRouter();
  return (
    <form className="w-full" onSubmit={onSubmit}>
      <label htmlFor="name" className="font-medium mb-2">
        Name
      </label>
      <input required id="name" type="text" className="border-[1px] mb-7 w-full rounded outline-none p-2" maxLength={20} placeholder="Enter your name" ref={nameInputRef} />
      <div className="mb-6">
        <label htmlFor="email" className="font-medium">
          Email
        </label>
        <div className="flex">
          <input id="email" required spellCheck={false} type="email" className="border-[1px] w-full rounded outline-none p-2" placeholder="Enter your email" ref={emailInputRef} />
          <button onClick={test} className="w-[15%] bg-red-600 rounded text-xs text-white">
            check
          </button>
        </div>
        {isUserExist !== null && (isUserExist ? <p className="text-red-500 text-xs">Email already exist</p> : <p className="text-green text-xs">Email could be used</p>)}
      </div>
      <div>
        <label htmlFor="pass" className="font-medium mb-2">
          Password
        </label>
        <input
          required
          id="pass"
          type="password"
          className="border-[1px] w-full rounded outline-none p-2"
          placeholder="Enter your password"
          onChange={(e) => {
            isPasswordValid(e.currentTarget.value);
            setPassword(e.currentTarget.value);
          }}
        />
        <ul className="list-disc mx-4 text-sm mt-1">
          <li className={passwordState.length ? "text-green" : "text-red-500"}>Password must contain at least 8 character</li>
          <li className={passwordState.uppercase ? "text-green" : "text-red-500"}>Password must contain uppercase letters</li>
          <li className={passwordState.number ? "text-green" : "text-red-500"}>Password must contain number</li>
        </ul>
      </div>
      <div className="bg-white text-xs flex justify-between mt-5">
        <p>Already have an account?</p>
        <p
          className="text-red-600 font-semibold"
          onClick={() => {
            router.push("/login");
          }}
        >
          Sign In
        </p>
      </div>
      <button type="submit" className="w-full py-4 mt-7 font-semibold text-white bg-customRed-600 rounded-full">
        Sign Up
      </button>
    </form>
  );
}
