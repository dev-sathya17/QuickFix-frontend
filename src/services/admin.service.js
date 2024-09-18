import { protectedInstance } from "./instance";

const adminService = {
  getAllUsers: async () => {
    try {
      const response = await protectedInstance.get("/admin/users");
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  },
  getUsersCount: async () => {
    try {
      const response = await protectedInstance.get("/admin/users/count");
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  },
  getAllEmployees: async () => {
    try {
      const response = await protectedInstance.get("/admin/employees");
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  },
  getUnassignedEmployees: async () => {
    try {
      const response = await protectedInstance.get(
        "/admin/employees/unassigned"
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  },
  getTicketsByStatus: async () => {
    try {
      const response = await protectedInstance.get("/admin/tickets/count");
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  },
  getCompletionData: async () => {
    try {
      const response = await protectedInstance.get("/admin/tickets/completion");
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  },
};

export default adminService;
