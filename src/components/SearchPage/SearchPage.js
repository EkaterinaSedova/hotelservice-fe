import React, {useEffect, useState} from 'react';
import Header from "../Header/Header";
import InputField from "../InputField/InputField";
import {useDispatch, useSelector} from "react-redux";
import {getAvailableRooms} from "../../store/rooms/roomsSlice";
import Rooms from "../ListOfRooms/Rooms";
import {useLocation} from "react-router-dom";
import styles from './Search.module.css'

const SearchPage = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const { search } = useLocation();
    const country = new URLSearchParams(search).get('country');
    const city = new URLSearchParams(search).get('city');
    const inDate = new URLSearchParams(search).get('inDate');
    const outDate = new URLSearchParams(search).get('outDate');
    const fridge = new URLSearchParams(search).get('fridge');
    const places = new URLSearchParams(search).get('places');
    const price = new URLSearchParams(search).get('price');

    const { list } = useSelector(({rooms}) => rooms);

    useEffect(() => {
        dispatch(getAvailableRooms( { page, country, city, inDate, outDate, fridge, places, price } ))
    }, [page, country, city, inDate, outDate, fridge, places, price, dispatch])


    const handleNextClick = () => {
        setPage(page+1);
        dispatch(getAvailableRooms( { page, country, city, inDate, outDate, fridge, places, price } ))
    }

    const handlePrevClick = () => {
        setPage(page-1);
        dispatch(getAvailableRooms( { page, country, city, inDate, outDate, fridge, places, price } ))
    }

    const isAvailable = () => {
        if(list.length < 10) return false;
        return true;
    }

    return (
        <>
            <Header></Header>
            <InputField></InputField>
            {list.length ?
                <Rooms rooms={list}></Rooms>
                :
                <div>No rooms. :(</div>
            }
            <div className={styles.pageButtons}>
                {page>1 ?
                    <button onClick={() => handlePrevClick()}>{`< < < prev`}</button>
                    :
                    <span>{`< < < prev`}</span>
                }
                {isAvailable() ?
                    <button onClick={() => handleNextClick()}>next > > ></button>
                    :
                    <span>next > > ></span>}
            </div>

        </>
    );
};

export default SearchPage;