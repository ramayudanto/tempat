import React from "react";

export default function RatingForm({ userNameRef, commentRef, submitRating }: any) {
  return (
    <form className="rounded-md flex flex-col justify-between items-start space-y-2" onSubmit={submitRating}>
      <input type="text" placeholder="name" className="p-1 outline-none rounded-md resize-y w-[70%] border-2" required ref={userNameRef} spellCheck={false} />
      <textarea placeholder="Enter a comment!" className="pl-1 outline-none rounded-md resize-y w-[70%] border-2" ref={commentRef} spellCheck={false} rows={2} />
      <button className="border-[1px] bg-darkRed p-2 rounded-md text-white font-semibold" type="submit">
        Post review
      </button>
    </form>
  );
}
