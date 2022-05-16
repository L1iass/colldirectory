import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import { useDispatch } from "react-redux";
import { useEffect} from "react";
import { setUser } from "./redux/features/authSlice";
import SingleColl from "./pages/SingleColl";
import Dashboard from "./pages/Dashboard";
import AddColl from "./pages/AddColl";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(setUser(user));
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/coll/:id" element={<SingleColl />} />
          <Route 
            path="/addColl"
            element={
              <PrivateRoute>
                <AddColl />
              </PrivateRoute>
            }
          />
          <Route
            path="/editColl/:id"
            element={
              <PrivateRoute>
                <AddColl />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
