import { useImperativeHandle, useState, forwardRef } from "react";

const Toast = forwardRef(function Inside({ message }: any, ref: any) {
  const [show, setShow] = useState(false);

  useImperativeHandle(ref, () => ({
    showToast() {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 2500);
    },
  }));

  return show ? (
    <div
      className={`fixed top-10 flex items-center max-w-[420px] gap-x-3 right-0 left-0 z-[100] animate-fadeToast select-none rounded-md px-4 py-3 text-lg mx-4 font-medium tracking-wide  bg-[#FFF5F6] border-[1px] border-[#C01048] shadow-lg`}
    >
      <div className="bg-red-50 rounded-full p-3">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.2413 2H9.7587C8.95374 1.99999 8.28937 1.99998 7.74818 2.04419C7.18608 2.09012 6.66937 2.18868 6.18404 2.43598C5.43139 2.81947 4.81947 3.43139 4.43598 4.18404C4.18868 4.66937 4.09012 5.18608 4.04419 5.74818C3.99998 6.28937 3.99999 6.95372 4 7.75869V21C4 21.3565 4.18976 21.686 4.49807 21.8649C4.80639 22.0438 5.18664 22.0451 5.49614 21.8682L12 18.1518L18.5039 21.8682C18.8134 22.0451 19.1936 22.0438 19.5019 21.8649C19.8102 21.686 20 21.3565 20 21V7.75873C20 6.95376 20 6.28937 19.9558 5.74818C19.9099 5.18608 19.8113 4.66937 19.564 4.18404C19.1805 3.43139 18.5686 2.81947 17.816 2.43598C17.3306 2.18868 16.8139 2.09012 16.2518 2.04419C15.7106 1.99998 15.0463 1.99999 14.2413 2ZM8.79289 6.79289C9.18342 6.40237 9.81658 6.40237 10.2071 6.79289L12 8.58579L13.7929 6.79289C14.1834 6.40237 14.8166 6.40237 15.2071 6.79289C15.5976 7.18342 15.5976 7.81658 15.2071 8.20711L13.4142 10L15.2071 11.7929C15.5976 12.1834 15.5976 12.8166 15.2071 13.2071C14.8166 13.5976 14.1834 13.5976 13.7929 13.2071L12 11.4142L10.2071 13.2071C9.81658 13.5976 9.18342 13.5976 8.79289 13.2071C8.40237 12.8166 8.40237 12.1834 8.79289 11.7929L10.5858 10L8.79289 8.20711C8.40237 7.81658 8.40237 7.18342 8.79289 6.79289Z"
            fill="#F63D68"
          />
        </svg>
      </div>
      <div className="text-xs space-y-1">
        <p className="font-semibold text-[#C01048]">Hapus Review Berhasil!</p>
        <p className="text-[#F63D68]">Sip, reviewnya udah berhasil dihapus.</p>
      </div>
    </div>
  ) : (
    <></>
  );
});

export default Toast;
