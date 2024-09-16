import { useLoaderData } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Tickets from "../Tickets/Tickets";
import { useEffect, useState } from "react";
import ticketService from "../../services/ticket.service";
const UserDashboard = () => {
  const { role } = useLoaderData();
  const [data, setData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    ticketService
      .getAllUserTickets()
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        alert(error.message);
        console.log(error);
      });
  }, []);

  const handleEditTicket = (id, newTitle, newDescription, status) => {
    ticketService
      .updateTicket(id, {
        title: newTitle,
        description: newDescription,
        status: status,
      })
      .then((response) => {
        if (response.status === 200) {
          alert(response.data.message);
          const updatedTickets = data.map((t) => {
            return t._id === id
              ? { ...t, title: newTitle, description: newDescription, status }
              : t;
          });
          setData(updatedTickets);
        } else {
          alert(response);
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to update ticket");
      });
  };

  const handleAddTicket = (newTicket) => {
    ticketService
      .addTicket(newTicket)
      .then((response) => {
        if (response.status === 201) {
          alert(response.data.message);
          setData([...data, response.data.ticket]);
        } else {
          alert(response);
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to create ticket");
      });
  };

  const handleDeleteTicket = (id) => {
    ticketService
      .deleteTicket(id)
      .then((response) => {
        if (response.status === 200) {
          alert(response.data.message);
          setData(data.filter((t) => t._id !== id));
        } else {
          alert(response);
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to delete ticket");
      });
  };

  return (
    <>
      <Navbar role={role} />
      <Tickets
        ticketsData={data}
        handleEditTicket={handleEditTicket}
        handleAddTicket={handleAddTicket}
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        handleDeleteTicket={handleDeleteTicket}
      />
    </>
  );
};

export default UserDashboard;
