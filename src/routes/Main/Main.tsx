// import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Main.scss";
import Calendar from "../../components/Calendar/Calendar";
import { Outlet } from "react-router-dom";

function Main() {
  return (
    <div className="main">
      <Outlet />

      <div className="main__wrapper-view">
        {/* <Outlet /> */}

        <div className="main__wrapper-content">
          <div className="main__sidebar">
            <Sidebar />
          </div>
          <div className="main__content">
            <Calendar />
            {/* <Outlet /> */}
          </div>
        </div>

        <div className="main__footer">
          <p>Footer</p>
        </div>
      </div>
    </div>
  );
}

export default Main;
