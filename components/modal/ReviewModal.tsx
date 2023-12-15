import React from "react";
import Backdrop from "./Backdrop";
import { motion } from "framer-motion";
import Link from "next/link";
import Divider from "../design-system/Divider";

export default function ReviewModal({ closeModal }: any) {
  const dropIn = {
    hidden: {
      y: "100%",
      opacity: 1,
    },
    visible: {
      y: 0,
      transition: {
        duration: 0.3,
      },
      opacity: 1,
    },
    exit: {
      y: "100%",
      opacity: 1,
    },
  };
  return (
    <Backdrop onClick={closeModal}>
      <motion.div onClick={(e) => e.stopPropagation()} className="rounded-t-3xl p-6 bg-white w-full max-w-[420px] absolute bottom-0 space-y-6" initial="hidden" animate="visible" exit="exit" variants={dropIn}>
        <div className="flex flex-col w-full gap-y-4 items-center">
        <svg width="64" height="64" viewBox="0 0 149 166" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M148.874 83.2406V64.2915L148.877 58.7019V57.6539C148.877 54.5556 147.479 51.8475 144.99 50.0141L111.675 25.8248L80.0189 2.85948C76.658 0.414028 72.2898 0.414028 68.9723 2.85948L37.3166 25.8248L35.2638 27.3089V18.0524C35.2638 14.8215 32.645 12.2027 29.4141 12.2027H27.0987C23.8679 12.2027 21.2057 14.8215 21.2082 18.0524V37.5242L4.00594 50.0115C1.47379 51.845 0.119738 54.5505 0.119738 57.6513V58.6994L0.117188 64.2915V83.2406L0.119738 94.5906C6.31879 98.5635 13.6118 102.406 21.5576 105.767L28.3686 108.475C30.3755 109.307 32.3415 109.48 34.481 109.044L42.0341 107.517C44.5229 106.994 46.8791 107.211 49.2812 108.129L69.9056 116.355H69.9489V116.398H69.9923H70.0356L70.079 116.442H70.1223L70.1657 116.485L70.209 116.528H70.2524H70.2957V116.572H70.3391L70.3824 116.615L70.4258 116.658H70.4691V116.702H70.5125V116.745H70.5558L70.5992 116.788L70.6425 116.832L70.6859 116.875L70.7292 116.918L70.7726 116.962H70.8159V117.005L70.8593 117.048L70.9026 117.092L70.946 117.135V117.179L70.9893 117.222V117.265L71.076 117.352V117.395H71.1194V117.439L71.1627 117.482V117.525L71.2061 117.569L71.2494 117.655V117.699V117.742L71.2928 117.785V117.829L71.3361 117.872V117.915V117.959V118.002C71.3795 118.046 71.3795 118.132 71.3795 118.176V118.219H71.4228V118.262V118.306V118.349V118.392V118.436V118.479V118.522V118.566V118.652V118.696V118.739V118.782V118.826V118.869C71.3795 119.088 71.3361 119.305 71.2494 119.525L70.7267 120.879C70.2473 122.146 68.8065 122.755 67.5392 122.276L46.4073 113.892C45.4026 113.456 44.2679 113.978 43.8752 114.983H43.8318C43.4391 115.988 43.9619 117.122 44.9232 117.515L66.0551 125.943C67.3224 126.422 67.9319 127.863 67.4525 129.13L66.9297 130.484C66.407 131.752 64.9662 132.361 63.6989 131.882L42.567 123.454C41.6057 123.061 40.4276 123.584 40.0349 124.545V124.589C39.6422 125.594 40.1216 126.728 41.1263 127.121L62.2581 135.549C63.5255 136.028 64.1349 137.469 63.6555 138.736L63.0869 140.09C62.6075 141.358 61.1667 141.967 59.8994 141.444L39.2903 133.279C36.8882 132.318 35.0547 130.877 33.5706 128.781L28.9857 122.276C28.2437 121.228 27.4149 120.399 26.4536 119.7C21.606 117.78 17.1104 115.901 12.9182 113.981C8.28994 111.885 4.05439 109.745 0.124839 107.519V108.917V127.603V156.609C0.124839 161.804 4.35784 165.996 9.55474 165.996H139.452C144.646 165.996 148.882 161.806 148.882 156.609V108.493C142.114 112.16 134.255 115.654 124.955 119.321C123.514 119.887 122.51 120.848 121.898 122.289C119.845 127.05 114.913 131.634 108.319 134.253C97.8408 138.402 87.1002 136.133 84.3488 129.146C84.1754 128.753 84.0428 128.36 83.9561 127.968C83.9344 127.924 83.9236 127.869 83.9127 127.815C83.9019 127.76 83.8911 127.705 83.8694 127.662C83.8694 127.588 83.8561 127.529 83.8443 127.476C83.8347 127.433 83.826 127.394 83.826 127.356V127.312C83.8195 127.279 83.813 127.247 83.8066 127.216C83.7706 127.04 83.7393 126.886 83.7393 126.7V126.657C83.6067 125.259 83.7393 123.819 84.1754 122.378H84.2187C84.2636 122.164 84.3473 121.952 84.4319 121.738L84.438 121.723V121.679C84.4688 121.604 84.494 121.529 84.5193 121.454C84.5674 121.31 84.6154 121.168 84.7007 121.024C85.2234 119.713 86.0088 118.405 86.9702 117.138L87.0569 117.094L87.2303 116.875L87.317 116.745L87.447 116.572L87.5771 116.442L87.7505 116.222L87.8372 116.136L88.0565 115.916L88.1432 115.83L88.3166 115.61L88.4033 115.48L88.6226 115.261L88.7093 115.218L88.9286 114.998L89.0586 114.868L89.232 114.695L89.4054 114.521L89.5355 114.391L89.6655 114.261L89.8848 114.088L89.9715 114.001L90.2342 113.782H90.2775L90.5835 113.519C90.6702 113.433 90.8028 113.3 90.9329 113.213L91.2822 112.951L91.3689 112.864L91.6749 112.645L91.7616 112.558L92.0243 112.385L92.2436 112.254L92.417 112.124L92.6363 111.994L92.8097 111.864L93.029 111.734L93.2024 111.604L93.4217 111.474L93.5951 111.344L93.8144 111.214L94.0337 111.084L94.253 110.997L94.4264 110.867L94.689 110.737L94.8624 110.651L95.0817 110.52L95.3444 110.39L95.5178 110.304L95.7371 110.174L95.9997 110.044L96.1731 109.957L96.4358 109.827L96.6551 109.74L96.8744 109.61L97.137 109.523L97.3563 109.437V109.393C97.3686 109.389 97.3813 109.385 97.3943 109.381C97.4087 109.376 97.4235 109.372 97.4386 109.367C97.5545 109.331 97.6882 109.289 97.7924 109.22H97.8357C97.9008 109.198 97.9773 109.166 98.0538 109.133C98.1303 109.101 98.2068 109.068 98.2718 109.047C104.909 106.425 111.634 106.338 116.349 108.435C117.703 109.001 119.054 109.044 120.365 108.565L120.628 108.478C131.236 104.548 140.928 100.348 148.874 95.2402V83.2406Z"
              fill="url(#paint0_linear_1882_14872)"
            />
            <defs>
              <linearGradient id="paint0_linear_1882_14872" x1="22.8835" y1="172.157" x2="129.233" y2="21.3753" gradientUnits="userSpaceOnUse">
                <stop stop-color="#F31212" />
                <stop offset="1" stop-color="#F39C12" />
              </linearGradient>
            </defs>
          </svg>
          <div className="flex flex-col items-center align-middle pt-2">
            <p className="font-semibold text-[#101828]">Yuk masuk atau bikin akun!</p>
            <p className="text-sm text-[#475467] text-center">Setelah itu, baru bisa menulis review ya </p>
          </div>

          <div className="font-semibold w-full">
          <Link legacyBehavior href="/signup">
            <a className="bg-red-600 text-white rounded-full w-full px-4 py-2 mt-4 block text-center">Daftar Akun</a>
          </Link>
          <Link legacyBehavior href="/login">
            <a className="bg-red-50 text-red-600 rounded-full px-4 py-2 mt-4 block text-center">Masuk</a>
          </Link>
        </div>
        </div>

      </motion.div>
    </Backdrop>
  );
}
