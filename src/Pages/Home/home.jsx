import { useEffect, useState } from "react";
import "./home.css";

const Home = () => {
  //State For Loading
  const [loading, setLoading] = useState(true);
  //Synchronous Loading to allow everything to settle
  useEffect(() => {
    const LoadingTimers = [2000, 3000, 4000, 5500, 6000];
    const randomSelectTimer = Math.floor(Math.random() * LoadingTimers.length);
    const timer = setTimeout(() => {
      setLoading(false);
    }, LoadingTimers[randomSelectTimer]);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="home_one">
      <div className="home_two">
        {loading ? (
          <div className="centerLoader">
            <div className="spinnerSecond"></div>
          </div>
        ) : (
          <div className="home_three">GeeCodes</div>
        )}
      </div>
    </div>
  );
};

export default Home;
