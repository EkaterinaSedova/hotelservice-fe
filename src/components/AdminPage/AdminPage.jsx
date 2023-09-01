import React from 'react';
import Header from "../Header/Header";
import {useDispatch} from "react-redux";
import {toggleShowCreateHotelForm} from "../../store/hotels/hotelsSlice";
import CreateHotelForm from "../CreateHotelForm/CreateHotelForm";

const AdminPage = () => {
    const dispatch = useDispatch();
    const handleCreateHotelClick = () => {
        dispatch(toggleShowCreateHotelForm(true));
    }
    return (
        <>
            <Header/>
            <button onClick={handleCreateHotelClick}>CREATE HOTEL</button>
            <CreateHotelForm/>
        </>
    );
};

export default AdminPage;