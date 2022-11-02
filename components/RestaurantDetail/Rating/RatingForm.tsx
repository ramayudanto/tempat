import React, { FormEvent, useState } from "react";
import LoginPage from "../../login/LoginPage";

export default function RatingForm({ commentRef, submitRating }: any) {
  return (
    <>
      <form className="rounded-md" onSubmit={submitRating}>
        <p className="font-semibold mb-2">Ceritain dong pengalaman kamu tadi</p>
        <textarea placeholder="Makannya enak, pelayannya oke, tapi berisik aja musiknya" className="outline-none rounded-md w-full p-4 border-2" ref={commentRef} spellCheck={false} />
        <button className=" bg-darkRed w-full py-3 rounded mt-5 text-white" type="submit">
          Kirim review
        </button>
      </form>
    </>
  );
}
