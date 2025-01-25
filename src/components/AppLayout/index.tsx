import { Outlet, useLocation, useNavigate } from "react-router";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { ROUTERS } from "../../router";

import "./index.scss";

const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnChange = (_: any, newValue: string) => {
    navigate(newValue);
  };

  return (
    <div className="app-layout">
      <div className="app-layout__header">
        <Tabs value={location.pathname} onChange={handleOnChange}>
          <Tab label="HOME" value={ROUTERS.HOME} />
          <Tab label="CHARTS" value={ROUTERS.CHARTS} />
        </Tabs>
      </div>
      <Outlet />
    </div>
  );
};

export default AppLayout;
