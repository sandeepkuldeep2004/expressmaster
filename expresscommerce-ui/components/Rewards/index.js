import { useState } from "react";
import Dashboard from "./Dashboard";

import Home from "./Home";
import SignUp from "./SignUp";

export default function Rewards(props) {
  const [showRw, setShowRw] = useState(false);
  const [showRwReg, setShowRwReg] = useState(false);
  const [showRwDashboard, setShowRwDashboard] = useState(true);

  const dashboardActions = (action) => {
    if (action == "close") setShowRw(false);
    else if (action == "terms") {
      setShowRw(false);
      setShowRwReg(true);
    }
  };

  const homeActions = (action) => {
    if (action == "close") setShowRw(false);
    else if (action == "terms") {
      setShowRw(false);
      setShowRwReg(true);
    }
  };

  const termsAction = (action) => {
    if (action == "close") setShowRwReg(false);
    if (action == "join") { setShowRwReg(false); setShowRwDashboard(true); }
  };

  return (
    <>
      {showRwDashboard && <Dashboard action={dashboardActions} />}
      {showRw && <Home action={homeActions} />}
      {showRwReg && <SignUp action={termsAction} />}
    </>
  );
}
