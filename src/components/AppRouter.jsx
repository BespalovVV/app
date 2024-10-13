import React, { useContext } from "react";
import About from "../pages/About";
import Posts from "../pages/Posts";
import Error from "../pages/Error";
import { Route, Routes } from "react-router-dom";
import PostShow from "../pages/PostShow";
import { publicRoutes, privateRoutes } from "../router/routes";
import { AuthContext } from "../context";
import Login from "../pages/Login";

const AppRouter = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext);
    return (
        isAuth
            ? <Routes>
                {privateRoutes.map(route =>
                    <Route
                        Component={route.component}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />
                )}
                <Route path="*" element={<Error />}>
                </Route>
            </Routes>
            : <Routes>
                {publicRoutes.map(route =>
                    <Route
                        Component={route.component}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />
                )}
                <Route path="*" element={<Login />}>
                
                </Route>
            </Routes>
    )
}

export default AppRouter;