import { useImperativeHandle, useState, forwardRef } from "react";

const Toast = forwardRef(function Inside({ message }: any, ref: any) {
  const [show, setShow] = useState(false);

  useImperativeHandle(ref, () => ({
    show() {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 2500);
    },
  }));

  return show ? (
    <div className={`fixed top-10 flex items-center max-w-[420px] gap-x-3 right-0 left-0 z-[100] animate-fadeToast select-none rounded-md px-4 py-3 text-lg mx-4 font-medium tracking-wide text-white bg-white border-[1px] shadow-lg`}>
      <div className="bg-red-50 rounded-full p-3">
        <svg viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.7587 4.31292e-07H10.2413C11.0463 -1.23241e-05 11.7106 -2.28137e-05 12.2518 0.0441945C12.8139 0.0901197 13.3306 0.188684 13.816 0.435975C14.5686 0.819468 15.1805 1.43139 15.564 2.18404C15.8113 2.66937 15.9099 3.18608 15.9558 3.74817C16 4.28938 16 4.95374 16 5.75873V19C16 19.3565 15.8102 19.686 15.5019 19.8649C15.1936 20.0438 14.8134 20.0451 14.5039 19.8682L8 16.1518L1.49614 19.8682C1.18664 20.0451 0.806389 20.0438 0.498074 19.8649C0.189759 19.686 9.08129e-07 19.3565 9.08129e-07 19L4.31292e-07 5.7587C-1.23241e-05 4.95373 -2.28137e-05 4.28937 0.0441945 3.74817C0.0901197 3.18608 0.188684 2.66937 0.435975 2.18404C0.819468 1.43139 1.43139 0.819468 2.18404 0.435975C2.66937 0.188684 3.18608 0.0901197 3.74817 0.0441945C4.28937 -2.28137e-05 4.95373 -1.23241e-05 5.7587 4.31292e-07Z"
            fill="#C03D35"
          />
        </svg>
      </div>
      <div className="text-xs space-y-1">
        <p className="font-semibold text-slate-700">Tambah Bookmark Berhasil</p>
        <p className="text-slate-500 font-regular">Sip, restonya udah masuk ke koleksimu.</p>
      </div>
    </div>
  ) : (
    <></>
  );
});

export default Toast;
