import axios from "axios";

const devEnv = process.env.NODE_ENV !== "production";

const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;

const API = axios.create({
  baseURL: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}`,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
export const googleSignIn = (result) => API.post("/users/googleSignIn", result);

export const getColls = () => API.get("/coll");
export const getColl = (id) => API.get(`/coll/${id}`);

export const createColl = (collData) => API.post("/coll", collData);
export const getCollsByUser = (userId) => API.get(`/coll/userColls/${userId}`);
export const deleteColl = (id) => API.delete(`/coll/${id}`);
export const updateColl = (updatedCollData, id) =>
  API.patch(`/coll/${id}`, updatedCollData);

export const searchColls = (searchQuery) =>
  API.get(`/coll/search?searchQuery=${searchQuery}`);

export const likeColl = (id) => API.patch(`/coll/like/${id}`);
