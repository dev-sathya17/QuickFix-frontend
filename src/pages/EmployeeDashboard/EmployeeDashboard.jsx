import { useLoaderData } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Tickets from "../Tickets/Tickets";
import ticketService from "../../services/ticket.service";
import { useEffect, useState } from "react";

const EmployeeDashboard = () => {
  const { role } = useLoaderData();
  const [data, setData] = useState([]);

  useEffect(() => {
    ticketService
      .getAllEmployeeTickets()
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        alert(error.message);
        console.log(error);
      });
  }, []);

  return (
    <>
      <Navbar role={role} />
      <Tickets ticketsData={data} />
    </>
  );
};

export default EmployeeDashboard;
