import React from "react";

export default function CategoryHero({ name }: any) {
  return (
    <div
      className="h-56 bg-right flex pl-3 flex-col justify-end pb-10 space-y-3 text-white"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80')` }}
    >
      <p className="font-semibold text-lg">For {name.toLowerCase()} addict</p>
      <p className="text-sm">Most-loved & highly-reviewed restaurant, by and for Jakartans!</p>
    </div>
  );
}
