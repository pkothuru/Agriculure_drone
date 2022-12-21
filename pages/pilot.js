import React from "react";
import Layout from "../layout/navbarLayout";
import { getSession } from "next-auth/react";
import PilotStepper from "../components/pilotReg/PilotStepper";
const pilot = ({ session }) => {
  return (
    <Layout>
      <div className="mt-8">
        <PilotStepper user={session.user} />
      </div>
    </Layout>
  );
};

export default pilot;

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
      `${process.env.HOST}api/user?email=${session.user.email}`
    );
    const data = await res.json();
    if (data.message.role === "farmer") {
      return {
        redirect: {
          destination: "/farmer",
          permanent: false,
        },
      };
    }
    return {
      props: { session, data },
    };
  }
}
