import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";

const App = () => {
  return (
    <div className="app-container">

        <hr className="app-divider" />
        <div className="app-content">
          <Sidebar />
        </div>

    </div>
  )
}

export default App
