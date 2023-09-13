import React, {useEffect, useState} from 'react';
import Header from "../Header/Header";
import InputField from "../InputField/InputField";
import {useDispatch, useSelector} from "react-redux";
import {getHotels} from "../../store/hotels/hotelsSlice";
import Hotels from "./ListOfHotels/Hotels";
import styles from "../SearchPage/Search.module.css";
import Search from "../SearchField/Search";
import firstScreenBg from "../../img/firstScreenBg.jpg"
import LineWithPolygon from '../../img/LineWithPolygon.svg'
import Left from '../../img/Left.svg'
import Right from '../../img/North.svg'
import Footer from "../Footer/Footer";

const MainPage = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(getHotels({page}))
    }, [page, dispatch])

    const handleNextClick = () => {
        setPage(page+1);
        dispatch(getHotels({page}))
    }

    const handlePrevClick = () => {
        setPage(page-1);
        dispatch(getHotels({page}))
    }

    const isAvailable = () => {
        if(hotels.length < 10) return false;
        return true;
    }

    const { hotels } = useSelector(({hotels}) => hotels);

    return (
        <>
            <Header></Header>
            <div>
                <div style={{ background :`url(${firstScreenBg})`}}>
                    <div className={styles.firstScreenText}>
                        <h3>GET LUXURY AND COMFORT</h3>
                        <h1>Welcome To The Place Where You Will Find Room Of Your Dream</h1>
                        <Search></Search>
                    </div>
                </div>
                <InputField></InputField>
            </div>
            <div className={styles.hotelsText}>
                <div>HOTELS</div>
                <img src={LineWithPolygon} alt=""/>
            </div>
            <Hotels hotels={hotels}></Hotels>
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

export default MainPage;