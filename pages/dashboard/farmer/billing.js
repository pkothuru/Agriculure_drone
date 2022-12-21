import React from "react";
import Layout from "../../../layout/farmerDashboardLayout";
import Head from "next/head";
import { getSession } from "next-auth/react";
import BillingTable from "../../../components/Dashboards/farmerDashboard/billing/BillingTable";
const billing = ({ session }) => {
  return (
    <>
      <Head>
        <title>Billing</title>
      </Head>
      <Layout>
        <BillingTable user={session.user} />
      </Layout>
      ;
    </>
  );
};

export default billing;

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

    return {
      props: { session, data },
    };
  }
}
