export default function Backdrop({ children, onClick }: any) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 mx-auto flex h-full w-full items-center justify-center bg-black bg-opacity-50 animate-fadeIn" onClick={onClick}>
      {children}
    </div>
  );
}
