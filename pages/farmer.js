import React, { useEffect } from "react";
import Layout from "../layout/navbarLayout";
import { getSession } from "next-auth/react";
import FarmerStepper from "../components/farmerRegistration/FarmerStepper";
import Head from "next/head";
const farmer = ({ data }) => {
  return (
    <>
      <Head>
        <title>Farmer Registration</title>
      </Head>
      <Layout>
        <div className="mt-8">
          <FarmerStepper user={data.message} />
        </div>
      </Layout>
    </>
  );
};

export default farmer;

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
    if (data.message.role === "pilot") {
      return {
        redirect: {
          destination: "/pilot",
          permanent: false,
        },
      };
    }

    return {
      props: { session, data },
    };
  }
}
