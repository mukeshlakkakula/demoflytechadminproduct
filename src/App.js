import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import PageNotFound from "./components/Home/PageNotFound";
import Home from "./components/Home/Index";
import AdminLogin from "./components/AppWrite/AdminLogin";
import Sidebar from "./components/Navbar";
import AddProduct from "./components/Product Management/AddProduct";
import CreateMobile from "./components/Product Management/Mobiles/CreateMobile";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <BrowserRouter>
      <div className="flex h-screen">
        {/* Sidebar with responsive classes */}
        <Sidebar
          className={`fixed top-0 left-0 h-full w-64 bg-gray-800 p-4 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 md:translate-x-0`}
        />

        {/* Main content with responsive margin */}
        <div className="flex-grow p-6 md:ml-64">
          {/* Burger Menu for mobile screens */}
          <button
            className="md:hidden p-2 bg-blue-500 text-white rounded"
            onClick={toggleSidebar}
          >
            ☰
          </button>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/mobiles" element={<CreateMobile />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
