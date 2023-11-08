import logo from "./logo.svg";
import "./App.css";
import SideMenu from "./components/SideMenu";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import OTF from "./pages/otf/OTF";
import Admin from "./pages/admin/Admin";

function App() {
  return (
    <div className="App">
      <SideMenu />
      {/* main contents */}
      <Routes>
        {/* dashboard */}
        <Route path="/dashboard" element={<Dashboard />}></Route>
        {/* admin */}
        <Route path="/admin/customer-master" element={<Admin />}></Route>
        {/* otf */}
        <Route
          path="/sales/order-to-delivery/booking-form"
          element={<OTF />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
