import "./index.css";
import Login from "./Pages/Login/login";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { SelectedAll } from "./Redux/allSlice";
import SignUp from "./Pages/SignUp/signup";
import ForgetPassword from "./Pages/ForgetPassword/forgetpassword";
import Genre from "./Pages/Genre/genre";

const App = () => {
  const condition = useSelector(SelectedAll).condition;

  //Function For Protecting Routes
  const Protection = ({ children }) => {
    return condition ? children : <Navigate to={"/"} />;
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route
          path="/genre"
          element={
            <Protection>
              <Genre />
            </Protection>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
