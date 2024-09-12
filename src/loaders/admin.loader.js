import adminService from "../services/admin.service";
import categoryService from "../services/category.service";

const adminLoader = {
  fetchAllUsers: async () => {
    try {
      const response = await adminService.getAllUsers();
      return { data: response };
    } catch (error) {
      return error.response.data.message;
    }
  },
  fetchAllEmployees: async () => {
    try {
      const response = await adminService.getAllEmployees();
      return { data: response };
    } catch (error) {
      return error.response.data.message;
    }
  },
  fetchAllCategories: async () => {
    try {
      const response = await categoryService.getAllCategories();
      return { data: response };
    } catch (error) {
      return error.response.data.message;
    }
  },
};

export default adminLoader;
