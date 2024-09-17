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
      const response = await protectedInstance.get("/admin/count/users");
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
};

export default adminService;
