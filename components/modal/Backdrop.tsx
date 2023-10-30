import { motion } from "framer-motion";

export default function Backdrop({ children, onClick }: { children: any; onClick: any }) {
  return (
    <motion.div className="fixed top-0 mx-auto z-30 flex h-full w-full max-w-[420px] items-center justify-center bg-black bg-opacity-50" onClick={onClick} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {children}
    </motion.div>
  );
}
