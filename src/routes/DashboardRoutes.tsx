import { Suspense } from "react";
import { Routes, Route } from 'react-router-dom';
import NavbarApp from '../modules/Navbar/Navbar';
import Loading from "../modules/Loading/Loading";
import { routes } from "./routes";

export const DashboardRoutes = () => {
  return (
    <div className="">
      <NavbarApp />
      <Suspense fallback={<Loading />}>
        <Routes>
          {routes.map((route) => (
            <Route key={route.to} path={route.path} element={< route.Component />} />
          ))}
        </Routes>
      </Suspense>

    </div>

  )
}
