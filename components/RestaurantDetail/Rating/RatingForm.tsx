import React, { useRef, useState } from "react";
import LoginPage from "../../login/LoginPage";

export default function RatingForm({ commentRef, submitRating, setImageUpload, imageUpload }: any) {
  const fileRef = useRef<HTMLInputElement>(null);
  const fileHandler = (e: any) => {
    if (!e.target.files && !e.target.files[0]) return;
    const maxAllowedSize = 2 * 1024 * 1024;
    if (e.target.files[0].size > maxAllowedSize) {
      e.target.value = "";
      return;
    }
    setImageUpload(e.target.files[0]);
  };
  return (
    <>
      <form className="rounded-md" onSubmit={submitRating}>
        <p className="font-semibold mb-2">Ceritain dong pengalaman kamu tadi</p>
        <textarea placeholder="Makannya enak, pelayannya oke, tapi berisik aja musiknya" className="outline-none rounded-md w-full p-4 border-2" ref={commentRef} spellCheck={false} />
        {/* <input type="file" className="outline-none rounded-md w-full p-4 border-2 border-dashed" accept="image/*" onChange={fileHandler} /> */}
        <button
          className="rounded-md px-12 p-4 mt-1 border-2 border-dashed w-full text-black text-opacity-40"
          onClick={() => {
            fileRef.current?.click();
          }}
          type="button"
        >
          <input accept={"image/*"} hidden id="input-file" type="file" onChange={fileHandler} placeholder="test" ref={fileRef} />
          {imageUpload ? (
            <>
              <p>{imageUpload?.name}</p>
            </>
          ) : (
            <div className="flex gap-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 opacity-50">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
              </svg>

              <p>Upload makanan kamu dong~</p>
            </div>
          )}
        </button>
        <button className="bg-darkRed w-full py-3 rounded mt-5 text-white" type="submit">
          Kirim review
        </button>
      </form>
    </>
  );
}
