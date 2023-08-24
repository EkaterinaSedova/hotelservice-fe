import React, {useEffect, useState} from 'react';
import Header from "../Header/Header";
import InputField from "../InputField/InputField";
import {useDispatch, useSelector} from "react-redux";
import {getHotels} from "../../store/hotels/hotelsSlice";
import Hotels from "./ListOfHotels/Hotels";

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

    const { list } = useSelector(({hotels}) => hotels);

    return (
        <>
            <Header></Header>
            <InputField></InputField>
            <Hotels hotels={list}></Hotels>
            {page>1 && <button onClick={() => handlePrevClick()}>prev</button>}
            {<button onClick={() => handleNextClick()}>next</button>}
        </>
    );
};

export default MainPage;