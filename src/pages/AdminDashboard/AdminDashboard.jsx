import { useLoaderData } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const AdminDashboard = () => {
  const { role } = useLoaderData();
  return (
    <>
      <Navbar role={role} />
    </>
  );
};

export default AdminDashboard;
