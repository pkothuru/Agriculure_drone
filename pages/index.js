import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useState } from "react";
import RoleSelection from "../components/RoleSelection";
import { getSession, useSession, signOut } from "next-auth/react";
import FarmerDashboard from "../components/Dashboards/farmerDashboard/FarmerDashboard";
import PilotDashboard from "../components/Dashboards/PilotDashboard/PilotDashboard";
import AdminDashboard from "../components/Dashboards/adminDashboard/AdminDashboard";
export default function Home({ session, data }) {
  // const { data: session } = useSession();

  function handleSignOut() {
    signOut();
  }

  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>

      {data.message.role ? (
        User({ session, handleSignOut, data })
      ) : (
        <RoleSelection
          handleSignOut={handleSignOut}
          session={session}
          data={data}
        />
      )}
    </div>
  );
}

// Guest
// function Guest() {
//   return (
//     <main className="container mx-auto text-center py-20">
//       <h3 className="text-4xl font-bold">Guest Homepage</h3>

//       <div className="flex justify-center">
//         <Link href={"/login"}>
//           <a className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50">
//             Sign In
//           </a>
//         </Link>
//       </div>
//     </main>
//   );
// }

// Authorize User
function User({ session, handleSignOut, data }) {
  if (data.message.role === "farmer")
    return (
      <>
        <FarmerDashboard user={data.message} />
      </>
    );
  if (data.message.role === "pilot") {
    return (
      <>
        <PilotDashboard user={data.message} />;
      </>
    );
  }
  if (data.message.role === "admin") {
    return <AdminDashboard user={data.message} />;
  }
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">Authorize User Homepage</h3>

      <div className="details">
        <h5>{session.user.name}</h5>
        <h5>{session.user.email}</h5>
        <h5>{data.message.role}</h5>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSignOut}
          className="mt-5 px-10 py-1 rounded-sm bg-gray-50"
        >
          Sign Out
        </button>
      </div>

      <div className="flex justify-center">
        <Link href={"/profile"}>
          <a className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50">
            Profile Page
          </a>
        </Link>
      </div>
    </main>
  );
}

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
