import {HOTEL_ROUTE, MAIN_ROUTE, PROFILE_ROUTE, SEARCH_ROUTE} from "./paths";
import MainPage from "../components/Main/MainPage";
import Hotel from "../components/Hotel/Hotel";
import SearchPage from "../components/SearchPage/SearchPage";
import ProfilePage from "../components/ProfilePage/ProfilePage";

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: MainPage,
    },
    {
        path: HOTEL_ROUTE + '/:id',
        Component: Hotel,
    },
    {
        path: SEARCH_ROUTE,
        Component: SearchPage,
    },
]

export const authRoutes = [
    {
        path: PROFILE_ROUTE,
        Component: ProfilePage,
    }
]