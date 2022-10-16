export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};

export default function Restos() {
  return <div>index</div>;
}
