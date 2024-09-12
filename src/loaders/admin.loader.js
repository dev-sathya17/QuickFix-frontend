import adminService from "../services/admin.service";

const adminLoader = {
  fetchAllUsers: async () => {
    try {
      const response = await adminService.getAllUsers();
      return { data: response };
    } catch (error) {
      return error.response.data.message;
    }
  },
  // fetchAllTodos: async () => {
  //   try {
  //     const response = await adminService.getAllTodos();
  //     return { data: response };
  //   } catch (error) {
  //     return error.response.data.message;
  //   }
  // },
};

export default adminLoader;
