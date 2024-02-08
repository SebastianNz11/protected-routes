import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Navbar } from "./pages/Navbar";
import { Home } from "./pages/Home";
import { Admin } from "./pages/Admin";
import { Analytics } from "./pages/Analytics";
import { Dashboard } from "./pages/Dashboard";
import { Landing } from "./pages/Landing";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const App = () => {
  const [user, setUser] = useState(null);

  const login = () => {
    setUser({
      id: 1,
      user: "John",
      permissions: [""],
      role: ["admin"],
    });
  };

  const logOut = () => {
    setUser(null);
  };

  return (
    <div>
      <BrowserRouter>
        <Navbar />

        {user ? (
          <button onClick={logOut}>LogOut</button>
        ) : (
          <button onClick={login}>Login</button>
        )}

        <Routes>
          <Route path="/landing" element={<Landing />} />
          <Route
            element={
              <ProtectedRoute isAllowed={!!user} redirectTo="/landing" />
            }
          >
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route
            path="/analytics"
            element={
              <ProtectedRoute
                isAllowed={!!user && user.permissions.includes("analize")}
                redirectTo="/home"
              >
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute
                isAllowed={!!user && user.role.includes("admin")}
                redirectTo="/home"
              >
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
