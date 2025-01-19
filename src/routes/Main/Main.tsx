import Sidebar from "../../components/Sidebar/Sidebar";
import "./Main.scss";
import Calendar from "../../components/Calendar/Calendar";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { useContext, useEffect, useState } from "react";
import { checkUser, signInWithPassword } from "../../database/supabase";
import { NewServiceBlockContext } from "../../context/ServiceBlockProvider";
import { NewPersonContext } from "../../context/PersonContextProvider";

function Main() {
  const [userLogIn, setUserLogIn] = useState<{ user: string; logIn: boolean; user_id: string }>({ user: "", logIn: false, user_id: "" });
  const { fetchServiceBlockData } = useContext(NewServiceBlockContext);
  const { fetchPersonsData } = useContext(NewPersonContext);

  useEffect(() => {
    checkUserLogIn();
  }, []);

  async function checkUserLogIn() {
    const logIn = await checkUser();

    if (logIn.session !== null) {
      setUserLogIn({ user: String(logIn.session.user.email), logIn: true, user_id: logIn.session.user.id });
    } else {
      const data = await signInWithPassword();

      if (data) {
        setUserLogIn({ user: String(data.user.email), logIn: true, user_id: data.user.id });
        // window.location.reload();
        fetchPersonsData();
        fetchServiceBlockData();
      }
    }
  }

  return (
    <div className="main">
      <Outlet />

      <div className="main__wrapper-view">
        <div className="main__wrapper-content">
          <div className="main__sidebar">
            <Sidebar />
          </div>
          <div className="main__content">
            <Calendar />
          </div>
        </div>
        <div className="main__footer">
          <Footer name={userLogIn.user} />
        </div>
      </div>
    </div>
  );
}

export default Main;
