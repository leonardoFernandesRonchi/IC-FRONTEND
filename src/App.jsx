import { Routes, Route } from "react-router-dom";
import { Login, Register, Coletas, Analises } from "@/pages";
import { Main } from "@/layouts";
import { ProtectedRoute, LoggedRoute } from "./routes";
export default function App() {
  return (
    <Routes>
      <Route element={<LoggedRoute />}>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<Main />}>
          <Route path="/dashboard" element={<Coletas />} />
        </Route>
        <Route element={<Main />}>
          <Route path="/analises" element={<Analises />} />
        </Route>
      </Route>
    </Routes>
  );
}
