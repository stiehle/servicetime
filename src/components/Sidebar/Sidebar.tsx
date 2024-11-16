import Logo from "../Logo/Logo";
import "./Sidebar.scss";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <Logo />
      </div>
      <div className="sidebar__items">
        <div className="sidebar__items-text">
          <h3>zu Planen</h3>
        </div>
        <div className="sidebar__items-test">
          <p>items</p>
        </div>
        <div className="sidebar__items-test">
          <p>items</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
