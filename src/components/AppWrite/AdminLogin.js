import React, { useState } from "react";
import { account } from "../AppWrite/appwriteLoginConfig";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";

import "./adminLogin.css"; // Create a CSS file to include your styles
// import bgImg from "../../img/section/section.jpg";
import logo from "../Images/flyyourtechlogo.png";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");
  let navigate = useNavigate();
  // Admin credentials (for validation)
  // const adminEmail = "lakkakulababblu@gmail.com";

  // Check if the user is already logged in

  //   useEffect(() => {
  //     if (status === "Already logged in:") {
  //       navigate("/");
  //       console.log("yes yes");
  //     }
  //   }, [status]);

  // uncomment after completing all the things
  useEffect(() => {
    account.get().then(
      (response) => {
        console.log("Already logged in:", response.status);
        Cookies.set("loginStatus", "loggedIn", { expires: 1 });
        setStatus(`Already logged in:`);
      },
      (error) => {
        console.log("Not logged in", error);
        setStatus(`Not logged in please Login`);
      }
    );
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    // if (email !== adminEmail) {
    //   setError("Invalid admin credentials");
    //   return;
    // }

    try {
      // Log in with email and password
      await account.createEmailPasswordSession(email, password);
      console.log("Admin logged in successfully");
      setStatus("Admin logged in successfully ");
      Cookies.set("loginStatus", "loggedIn", { expires: 1 });
      navigate("/");
      // Redirect to admin dashboard or some other page
    } catch (err) {
      // Display specific error message from Appwrite
      setError(`Login failed: ${err.message}`);
      setStatus(`Login failed: ${err.message}`);
      console.error(err);
    }
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      console.log("Logged out successfully");
      Cookies.remove("loginStatus");
      setStatus("Logged out successfully");
      // Redirect to login page
    } catch (err) {
      console.error("Logout failed", err);
      setStatus(`Logout failed, ${err}`);
    }
  };
  return (
    <div className="sign bg-cover bg-center min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-lg shadow-lg p-8">
              {/* Authorization form */}
              <form onSubmit={handleLogin} className="space-y-6">
                <div
                  href="index.html"
                  className="bg-black bg-opacity-75 rounded-full p-3 flex items-center justify-center space-x-3 "
                >
                  <img src={logo} alt="Logo" className="h-12 w-auto" />
                  <h1 className="font-bold text-gray-50 font-sans text-xl">
                    FLY Your Tech
                  </h1>
                </div>
                <p className="text-center text-gray-600">
                  Login Status: {status}
                </p>

                <div className="space-y-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Email"
                  />
                </div>

                <div className="space-y-2">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Password"
                  />
                </div>

                <p className="text-red-500 text-center">{status}</p>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
                >
                  Log in
                </button>

                <span className="block text-center text-gray-600 mt-4">
                  Want to logout?{" "}
                  <a
                    onClick={handleLogout}
                    className="text-blue-500 hover:underline cursor-pointer"
                  >
                    Logout
                  </a>
                </span>
              </form>
              {/* End authorization form */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
