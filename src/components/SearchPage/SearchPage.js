import React, {useEffect, useState} from 'react';
import Header from "../Header/Header";
import InputField from "../InputField/InputField";
import {useDispatch, useSelector} from "react-redux";
import {getAvailableRooms} from "../../store/rooms/roomsSlice";
import Rooms from "../ListOfRooms/Rooms";
import {useLocation} from "react-router-dom";
import styles from './Search.module.css'
import firstScreenBg from "../../img/firstScreenBg.jpg";
import Left from "../../img/Left.svg";
import Right from "../../img/North.svg";
import Footer from "../Footer/Footer";

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
            <div style={{ background :`url(${firstScreenBg})`}}>
                <div className={styles.firstScreenText}>
                    <h3>GET LUXURY AND COMFORT</h3>
                </div>
            </div>
            <InputField></InputField>
            {list.length ?
                <Rooms rooms={list}></Rooms>
                :
                <div>No rooms. :(</div>
            }
            <div className={styles.pageButtons}>
                {page>1 ?
                    <button onClick={() => handlePrevClick()}><img src={Left} alt="prev"/></button>
                    :
                    <span><img src={Left} alt="prev"/></span>
                }
                {isAvailable() ?
                    <button onClick={() => handleNextClick()}><img src={Right} alt="prev"/></button>
                    :
                    <span><img src={Right} alt="prev"/></span>}
            </div>
            <Footer></Footer>
        </>
    );
};

export default SearchPage;