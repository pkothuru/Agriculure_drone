import React from "react";

const Admin = ({ session, data }) => {
  return <div>index</div>;
};

export default Admin;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    const res = await fetch(
      "http://ec2-52-203-10-77.compute-1.amazonaws.com/flight_data_collect/get-drones/"
    );

    const data = await res.json();

    return {
      props: { session, data },
    };
  }
}
