import { useRouter } from "next/router";
import { FormEvent } from "react";

export default function SignUpForm({ emailInputRef, isPasswordValid, passwordState, nameInputRef, setPassword, onSubmit, isUserExist, test }: any) {
  const router = useRouter();
  return (
    <form className="w-full" onSubmit={onSubmit}>
      <div className="mb-6">
        <label htmlFor="email" className="font-medium">
          Email
        </label>
        <div className="flex gap-x-2">
          <input id="email" required spellCheck={false} type="email" className="border-[1px] w-full rounded outline-none p-2 mt-1" placeholder="budi@gmail.com" ref={emailInputRef} />
          {/* <button onClick={test} className="w-[15%] bg-darkGray rounded text-xs text-white">
            Cek
          </button> */}
        </div>
        {isUserExist !== null && (isUserExist ? <p className="text-red-500 text-xs">Email sudah terdaftar</p> : <p className="text-green text-xs">Email belum terdaftar</p>)}
      </div>
      <label htmlFor="name" className="font-medium mb-2">
        Nama
      </label>
      <input required id="name" type="text" className="border-[1px] mb-7 w-full rounded outline-none p-2 mt-1" maxLength={20} placeholder="Budi" ref={nameInputRef} />
      
      <div>
        <label htmlFor="pass" className="font-medium mb-2 darkGray">
          Password
        </label>
        <input
          required
          id="pass"
          type="password"
          className="border-[1px] w-full rounded outline-none p-2 mt-1"
          placeholder="**********"
          onChange={(e) => {
            isPasswordValid(e.currentTarget.value);
            setPassword(e.currentTarget.value);
          }}
        />
        <ul className="list-disc mx-4 text-sm mt-1 text-darkGray">
          <li className={passwordState.length ? "text-green" : "text-darkGray"}>Minimal 8 karakter</li>
          <li className={passwordState.uppercase ? "text-green" : "text-darkGray"}>Menggunakan huruf besar</li>
          <li className={passwordState.number ? "text-green" : "text-darkGray"}>Menggunakan angka</li>
        </ul>
      </div>
      <button type="submit" className="w-full py-3 text-sm mt-7 font-semibold text-white bg-customRed-600 rounded-full">
        Buat Akun
      </button>
      <div className="flex items-center justify-evenly my-5">
          <hr className="border-t-[2px] w-1/4" />
          <p className="font-medium text-darkGray text-opacity-80"> atau</p>
          <hr className="border-t-[2px] w-1/4" />
        </div>
      <div className="bg-white text-sm flex justify-between mt-5">
        <p>Udah punya akun?</p>
        <p
          className="text-brandPrimary600 text-sm font-semibold cursor-pointer"
          onClick={() => {
            router.push("/login");
          }}
        >
          Masuk disini
        </p>
      </div>
    </form>
    
  );
}
