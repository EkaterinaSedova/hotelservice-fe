import {HOTEL_ROUTE, MAIN_ROUTE} from "./paths";
import MainPage from "../components/Main/MainPage";
import Hotel from "../components/Hotel/Hotel";

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: MainPage,
    },
    {
        path: HOTEL_ROUTE + '/:id',
        Component: Hotel,
    },
]