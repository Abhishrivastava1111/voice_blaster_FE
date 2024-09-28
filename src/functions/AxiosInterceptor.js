import axios from "axios";

const setupAxiosInterceptors = () => {

  axios.interceptors.response.use(
    (response) => {
        if (response && response.data && response.data.error_code === 463) {
            localStorage.clear();
    
            
            window.location.href = "/login";
            console.error("Session expired. You have been logged out.");
        }
      return response;
    },
    (error) => {
      if (error.response && error.response.error_code === 463) {
        localStorage.clear();

        
        window.location.href = "/login";
        console.error("Session expired. You have been logged out.");
      }

      return Promise.reject(error);
    }
  );
};

export default setupAxiosInterceptors;
