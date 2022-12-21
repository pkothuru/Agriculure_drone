import Navbar from "../components/Navbar";
import styles from "../styles/Layout.module.css";

export default function Layout({ children }) {
  return (
    <div className="">
      <Navbar />
      <div className="w-4/5 m-auto max-w-6xl py-12">{children}</div>
    </div>
  );
}
