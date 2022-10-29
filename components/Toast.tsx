import { useImperativeHandle, useState, forwardRef } from "react";

const Toast = forwardRef(function Inside({ message }: any, ref: any) {
  const [show, setShow] = useState(false);

  useImperativeHandle(ref, () => ({
    show() {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
    },
  }));

  return show ? (
    <div className={`fixed top-10 flex items-center justify-center right-0 mx-auto left-0 z-[100] animate-fadeToast select-none rounded-md px-2 py-3 text-lg w-3/4 font-medium tracking-wide text-white bg-darkRed`}>
      <p>{message}</p>
    </div>
  ) : (
    <></>
  );
});

export default Toast;
