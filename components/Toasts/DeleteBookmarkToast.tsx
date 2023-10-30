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
    <div className={`fixed top-10 flex max-w-[420px] items-center gap-x-3 right-0 left-0 z-[100] animate-fadeToast select-none rounded-md px-4 py-3 text-lg mx-4 font-medium tracking-wide text-white bg-white border-[1px] shadow-lg`}>
      <div className="bg-black bg-opacity-10 rounded-full p-3">
        <svg viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.2413 4.11943e-07H5.7587C4.95374 -1.19578e-05 4.28937 -2.21655e-05 3.74818 0.0441949C3.18608 0.0901201 2.66937 0.188684 2.18404 0.435975C1.43139 0.819469 0.819469 1.43139 0.435975 2.18404C0.188684 2.66937 0.0901201 3.18608 0.0441949 3.74818C-2.21543e-05 4.28937 -1.19522e-05 4.95372 4.11645e-07 5.75869V19C4.11645e-07 19.3565 0.18976 19.686 0.498074 19.8649C0.806389 20.0438 1.18664 20.0451 1.49614 19.8682L8 16.1518L14.5039 19.8682C14.8134 20.0451 15.1936 20.0438 15.5019 19.8649C15.8102 19.686 16 19.3565 16 19V5.75873C16 4.95376 16 4.28937 15.9558 3.74818C15.9099 3.18608 15.8113 2.66937 15.564 2.18404C15.1805 1.43139 14.5686 0.819469 13.816 0.435975C13.3306 0.188684 12.8139 0.0901201 12.2518 0.0441949C11.7106 -2.21655e-05 11.0463 -1.19578e-05 10.2413 4.11943e-07ZM4.79289 4.79289C5.18342 4.40237 5.81658 4.40237 6.20711 4.79289L8 6.58579L9.79289 4.79289C10.1834 4.40237 10.8166 4.40237 11.2071 4.79289C11.5976 5.18342 11.5976 5.81658 11.2071 6.20711L9.41421 8L11.2071 9.79289C11.5976 10.1834 11.5976 10.8166 11.2071 11.2071C10.8166 11.5976 10.1834 11.5976 9.79289 11.2071L8 9.41421L6.20711 11.2071C5.81658 11.5976 5.18342 11.5976 4.79289 11.2071C4.40237 10.8166 4.40237 10.1834 4.79289 9.79289L6.58579 8L4.79289 6.20711C4.40237 5.81658 4.40237 5.18342 4.79289 4.79289Z"
            fill="black"
          />
        </svg>
      </div>
      <div className="text-[#344054] text-xs space-y-1">
        <p className="font-semibold">Hapus Bookmark Berhasil!</p>
        <p>Bookmarknya udah dihapus. Yuk, tambah lainnya!</p>
      </div>
    </div>
  ) : (
    <></>
  );
});

export default Toast;
