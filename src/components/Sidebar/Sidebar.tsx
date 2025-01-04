import Logo from "../Logo/Logo";
// import Serviceblock from "../Serviceblock/Serviceblock";
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
      <div className="sidebar__items">
        <ServiceblockOpen />
      </div>
    </div>
  );
}

export default Sidebar;
