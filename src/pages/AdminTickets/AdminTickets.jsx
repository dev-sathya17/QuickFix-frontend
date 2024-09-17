import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import ticketService from "../../services/ticket.service";
import Navbar from "../../components/Navbar/Navbar";
import Tickets from "../Tickets/Tickets";
import adminService from "../../services/admin.service";
import socket from "../../utils/socket";

const AdminTickets = () => {
  const { role } = useLoaderData();
  const [data, setData] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.on("ticket added", (ticket) => {
        setData([...data, ticket]);
      });

      socket.on("ticket updated", (ticket) => {
        const updatedData = data.map((item) =>
          item._id === ticket._id ? ticket : item
        );
        setData(updatedData);
      });

      socket.on("ticket deleted", (id) => {
        const filteredTickets = data.filter((item) => item._id !== id);
        setData(filteredTickets);
      });
    }

    return () => {
      socket.off("ticket added");
      socket.off("ticket updated");
      socket.off("ticket deleted");
    };
  }, [data]);

  useEffect(() => {
    ticketService
      .getAllTickets()
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        alert(error.message);
        console.log(error);
      });
  }, []);

  useEffect(() => {
    adminService
      .getUnassignedEmployees()
      .then((response) => {
        setEmployees(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleEditTicket = (id, employee) => {
    if (!id || !employee || employee.toLowerCase() === "select an employee") {
      alert("Please select an employee");
      return;
    }

    ticketService
      .updateTicket(id, {
        assignedTo: employee,
      })
      .then((response) => {
        if (response.status === 200) {
          alert(response.data.message);
        } else {
          alert(response);
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to update ticket");
      });
  };

  return (
    <>
      <Navbar role={role} active={"tickets"} />
      <Tickets
        ticketsData={data}
        employees={employees}
        handleEditTicket={handleEditTicket}
      />
    </>
  );
};

export default AdminTickets;
