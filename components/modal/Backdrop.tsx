import { motion } from "framer-motion";

export default function Backdrop({ children, onClick }: { children: any; onClick: any }) {
  return (
    <motion.div className="fixed top-0 bg-black z-30 flex h-screen w-screen bg-opacity-50 max-w-[420px] mx-auto left-0 right-0" onClick={onClick} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {children}
    </motion.div>
  );
}
