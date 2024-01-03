import { useImperativeHandle, useState, forwardRef } from "react";

const Toast = forwardRef(function Inside({ message, color }: any, ref: any) {
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
    <div
      className={`fixed top-10 flex items-center justify-center right-0 mx-auto left-0 z-[100] animate-fadeToast select-none rounded-md px-2 py-3 text-lg w-[90%] max-w-[420px] font-medium tracking-wide text-white ${
        color ? `bg-${color}` : "bg-gray-50"
      }`}
    >
      <p className="text-slate-700">{message}</p>
    </div>
  ) : (
    <></>
  );
});

export default Toast;
