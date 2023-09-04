import React, {useEffect, useState} from 'react';
import Header from "../Header/Header";
import InputField from "../InputField/InputField";
import {useDispatch, useSelector} from "react-redux";
import {getHotels} from "../../store/hotels/hotelsSlice";
import Hotels from "./ListOfHotels/Hotels";
import styles from "../SearchPage/Search.module.css";
import Search from "../SearchField/Search";

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
            <Search></Search>
            <InputField></InputField>
            <Hotels hotels={hotels}></Hotels>
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

export default MainPage;