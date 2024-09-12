import userServices from "../services/user.service";

// Defining a user loader object
const userLoader = {
  checkAuth: async () => {
    try {
      const { role } = await userServices.checkAuth();
      if (role) {
        return { isAuthenticated: true, role };
      } else {
        return { isAuthenticated: false, role: null };
      }
    } catch (error) {
      return { isAuthenticated: false, role: null };
    }
  },
  fetchUser: async () => {
    try {
      const response = await userServices.getProfile();
      return { user: response.data, status: response.status };
    } catch (error) {
      return {
        error: error.response.data.message,
        status: error.response.status,
      };
    }
  },
};

// Exporting the user loader object
export default userLoader;
