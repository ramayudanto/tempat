export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};

export default function NotFound() {
  return <div>index</div>;
}
