import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {publicRoutes} from "./routes";
import {MAIN_ROUTE} from "./paths";

const AppRouter = () => {
    return (
        <Routes>
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} exact element={<Component />}/>
            )}
            <Route path='*' element={<Navigate to={MAIN_ROUTE} />} />
        </Routes>
    );
};

export default AppRouter;