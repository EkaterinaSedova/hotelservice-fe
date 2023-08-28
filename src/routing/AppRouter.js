import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {authRoutes, publicRoutes} from "./routes";
import {MAIN_ROUTE} from "./paths";
import {useSelector} from "react-redux";

const AppRouter = () => {
    const {currentUser} = useSelector(({user}) => user);
    return (
        <Routes>
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} exact element={<Component />}/>
            )}
            {currentUser && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} exact element={<Component />}/>
            )}
            <Route path='*' element={<Navigate to={MAIN_ROUTE} />} />
        </Routes>
    );
};

export default AppRouter;