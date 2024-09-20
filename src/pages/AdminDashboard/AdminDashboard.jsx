import { useLoaderData } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./AdminDashboard.css";
import { useEffect, useState } from "react";
import adminService from "../../services/admin.service";
import PieChartComponent from "../../components/pie chart/PieChartComponent";
import BarChartComponent from "../../components/bar chart/BarChart";
import { FaUsers } from "react-icons/fa6";
import { IoToday } from "react-icons/io5";

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [employeesCount, setEmployeesCount] = useState(0);
  const [ticketsByStatus, setTicketsByStatus] = useState([]);
  const [completionData, setCompletionData] = useState([]);

  useEffect(() => {
    adminService
      .getUsersCount()
      .then((response) => {
        setUserCount(response.users);
        setEmployeesCount(response.employees);
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });

    adminService
      .getTicketsByStatus()
      .then((response) => {
        const data = [
          {
            name: "open",
            value: response.openTickets,
          },
          {
            name: "assigned",
            value: response.assignedTickets,
          },
          {
            name: "closed",
            value: response.closedTickets,
          },
        ];
        setTicketsByStatus(data);
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });

    adminService
      .getCompletionData()
      .then((response) => {
        const data = [];
        for (let i in response) {
          data.push({
            date: i,
            value: response[i],
          });
        }
        setCompletionData(data);
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  }, []);

  const { role } = useLoaderData();
  return (
    <>
      <Navbar role={role} />
      <main className="adm-dashboard">
        <section className="adm-dashboard-row">
          <div className="adm-dashboard-cell adm-bar-graph">
            <p className="adm-dashboard-title">Ticket closing analytics</p>
            {completionData && completionData.length > 0 ? (
              <BarChartComponent data={completionData} />
            ) : (
              <h3>No tickets closed</h3>
            )}
          </div>
        </section>
        <section className="adm-dashboard-row">
          <div className="adm-dashboard-cell">
            <p className="adm-dashboard-title">Tickets By Status</p>
            {ticketsByStatus && ticketsByStatus.length > 0 ? (
              <PieChartComponent data={ticketsByStatus} />
            ) : (
              <h3>There are no tickets.</h3>
            )}
          </div>
          <div className="adm-dashboard-cell adm-box">
            <p className="adm-dashboard-title">Total Users:</p>
            <FaUsers className="adm-dashboard-icon" />
            <h1 className="adm-dashboard-value">{userCount}</h1>
          </div>
          <div className="adm-dashboard-cell adm-box">
            <p className="adm-dashboard-title">Total Employees:</p>
            <FaUsers className="adm-dashboard-icon" />
            <h1 className="adm-dashboard-value">{employeesCount}</h1>
          </div>
        </section>
      </main>
    </>
  );
};

export default AdminDashboard;
