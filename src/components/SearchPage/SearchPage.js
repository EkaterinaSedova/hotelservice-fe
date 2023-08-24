import React, {useEffect, useState} from 'react';
import Header from "../Header/Header";
import InputField from "../InputField/InputField";
import {useDispatch, useSelector} from "react-redux";
import {getAvailableRooms} from "../../store/rooms/roomsSlice";
import Rooms from "./Rooms";
import {useLocation, useParams} from "react-router-dom";

const SearchPage = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const { search } = useLocation();
    const country = new URLSearchParams(search).get('country');
    const city = new URLSearchParams(search).get('city');
    const inDate = new URLSearchParams(search).get('inDate');
    const outDate = new URLSearchParams(search).get('outDate');

    useEffect(() => {
        dispatch(getAvailableRooms( { page, country, city, inDate, outDate } ))
    }, [page, dispatch])

    const { list } = useSelector(({rooms}) => rooms);

    return (
        <>
            <Header></Header>
            <InputField></InputField>
            <Rooms rooms={list}></Rooms>
            {page>1 && <button>prev</button>}
            <button>next</button>
        </>
    );
};

export default SearchPage;