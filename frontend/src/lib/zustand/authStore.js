import { create } from "zustand";
import api from "../axios";

const useAuthStore = create((set,get) => ({
    user : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    token : null,
    isAuthenticated : !!localStorage.getItem("token"),

    login : async (email, password) => {
      try {
          const response = await api.post('/users/login',{email,password});
          const {success, message, data} = response?.data;
          if(!success){
              return { success: false , message}
          }
  
          const {token , user } = data;
          localStorage.setItem("token",token);
           localStorage.setItem("user",JSON.stringify(user));
          set({user , token , isAuthenticated: true});
          return {success: true , message}
      } catch (error) {
        return {
         success: false,
         message: error.response?.data?.message || "Login failed",
        }
      }
    },

    register: async (name, email, password) => {
       try {
         const response = await api.post("/users/",{email,name,password});
         console.log("response --", response);
         
         const {success,message, data} = response?.data;
         console.log("response",response?.data);
         
         if(!success) return { success: false, message};
 
         return  {success: true, message}
       } catch (error) {
        return {
         success: false,
         message: error.response?.data?.message || "Login failed",
        }
       }
    },

    logout : () => {
        localStorage.removeItem("token");
        set({user: null, isAuthenticated: false});
        return({
            success:true,
            message:"Successfully logout"
        })
    },

  updateUser: async () => {
  const token = localStorage.getItem("token");
  if (!token) return;
//   console.log("token",token);
  
//    return
  try {
    const res = await api.get("/users/me"); // fetch latest user
    console.log("res",res);
    
    const { success, data } = res.data;
    if (!success) throw new Error("Failed to fetch user");

    localStorage.setItem("user", JSON.stringify(data));
    set({ user: data, token , isAuthenticated:true });
  } catch (err) {
    console.error("Failed to update user:", err);
    set({ user: null, token: null, isAuthenticated: false });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
},

}))

export default useAuthStore;