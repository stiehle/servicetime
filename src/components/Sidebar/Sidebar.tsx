import Logo from "../Logo/Logo";
import ServiceblockOpen from "../ServiceblockOpen/ServiceblockOpen";
import "./Sidebar.scss";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <Logo />
      </div>
      <div className="sidebar__header">
        <h3>zu Planen</h3>
      </div>
      <div className="sidebar__item-wrapper">
        <div className="sidebar__items">
          <ServiceblockOpen />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
