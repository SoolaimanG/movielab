import "./index.css";
import Login from "./Pages/Login/login";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { SelectedAll } from "./Redux/allSlice";
import SignUp from "./Pages/SignUp/signup";

const App = () => {
  const condition = useSelector(SelectedAll);

  //Function For Protecting Routes
  const Protection = ({ children }) => {
    return condition ? children : <Navigate to={"/"} />;
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default App;
