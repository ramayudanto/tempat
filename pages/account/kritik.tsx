import React from "react";

export default function Example() {
  return (
    
    <div className="px-4 bg-white h-screen max-w-[420px] mx-auto align-middle">
        
        <div className="flex w-full pt-6 space-x-4">
          <svg viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" >
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>  
          <h1 className="text-2xl font-bold text-slate-700">Kritik & Saran</h1>
        </div>
        <iframe 
        src="https://tally.so/embed/mZ27Ba?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" 
        className="w-full h-[500px] bg-white"
        >
        </iframe>  
    </div>
  );
}
