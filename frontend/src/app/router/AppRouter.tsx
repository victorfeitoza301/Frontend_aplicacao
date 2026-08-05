import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../../components/routing/ProtectedRoute";

import Login from "../../pages/Login/Login";
import Register from "../../pages/Register";
import Dashboard from "../../pages/Dashboard/Dashboard";
import Chat from "../../pages/Chat";
import Missions from "../../pages/Missions";
import Inventory from "../../pages/Inventory";
import Profile from "../../pages/Profile";
import Game from "../../pages/Game";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Raiz redireciona para o dashboard (que exige login) */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Rotas protegidas */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Chat />
              </MainLayout>
            </ProtectedRoute>
          }
          />
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Profile />
              </MainLayout>
            </ProtectedRoute>
          }
        />
<Route
    path="/game"
    element={
        <ProtectedRoute>
            <Game />
        </ProtectedRoute>
    }
/>


        <Route
          path="/inventario"
          element={
            <ProtectedRoute>
              <MainLayout>
                 <Inventory />
              </MainLayout>
            </ProtectedRoute>
        }
        />

      <Route
  path="/missoes"
  element={
    <ProtectedRoute>
      <MainLayout>
        <Missions />
      </MainLayout>
    </ProtectedRoute>
  }
/>   
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
