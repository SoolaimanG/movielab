import "./index.css";
import Login from "./Pages/Login/login";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { SelectedAll } from "./Redux/allSlice";
import SignUp from "./Pages/SignUp/signup";
import ForgetPassword from "./Pages/ForgetPassword/forgetpassword";
import Home from "./Pages/Home/home";
import Genre from "./Pages/Genre/genre";
import GenrePage from "../src/Pages/GenrePage/genrepage";
import Review from "./Pages/Review/review";
import Setting from "./Pages/Settings/settings";
import WatchList from "./Pages/WatchList/watchlist";
import ComingSoon from "./Pages/ComingSoon/comingsoon";
import Support from "./Pages/Support/support";
import SinglePage from "./Pages/singlePage/singlepage";

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
        <Route
          path="/home"
          element={
            <Protection>
              <Home />
            </Protection>
          }
        />
        <Route
          path="/genrepage"
          element={
            <Protection>
              <GenrePage />
            </Protection>
          }
        />
        <Route
          path="/review"
          element={
            <Protection>
              <Review />
            </Protection>
          }
        />
        <Route
          path="/settings"
          element={
            <Protection>
              <Setting />
            </Protection>
          }
        />
        <Route
          path="/watchlist"
          element={
            <Protection>
              <WatchList />
            </Protection>
          }
        />
        <Route
          path="/comingsoon"
          element={
            <Protection>
              <ComingSoon />
            </Protection>
          }
        />
        <Route
          path="/support"
          element={
            <Protection>
              <Support />
            </Protection>
          }
        />
        <Route
          path="/moviepage/:id"
          element={
            <Protection>
              <SinglePage />
            </Protection>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
