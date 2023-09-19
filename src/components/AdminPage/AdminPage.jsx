import React, {useEffect, useState} from 'react';
import Header from "../Header/Header";
import {useDispatch, useSelector} from "react-redux";
import {clearHotels, getHotels, toggleShowCreateHotelForm} from "../../store/hotels/hotelsSlice";
import CreateHotelForm from "../CreateHotelForm/CreateHotelForm";
import Users from "../Users/Users";
import {getUsersByName, toggleUsersForm} from "../../store/user/userSlice";
import Line from '../../img/LineWithPolygon.svg'
import styles from './Admin.module.css'
import Footer from "../Footer/Footer";
import Hotels from "../Main/ListOfHotels/Hotels";

const AdminPage = () => {
    const {users} = useSelector(({user}) => user);
    const {hotels} = useSelector(({hotels}) => hotels);
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [hotelName, setHotelName] = useState('')

    useEffect(() => {
        dispatch(clearHotels());
    }, [dispatch])
    const handleFindClick = () => {
        dispatch(getUsersByName({name: name}));
        dispatch(toggleUsersForm(true));
    }

    const handleCloseHotelsClick = () => {
        dispatch(clearHotels());
    }

    const handleFindHotelClick = () => {
        dispatch(getHotels({
            page: 1,
            name: hotelName,
        }))
    }

    const handleCreateHotelClick = () => {
        dispatch(toggleShowCreateHotelForm(true));
    }
    return (
        <>
            <Header/>
            <div className={styles.hello}>
                <div>Hello, admin! </div>
                <img src={Line} alt=""/>
            </div>
            <div className={styles.function}>
                Create new address and hotel:
                <button onClick={handleCreateHotelClick}>Create hotel</button>
            </div>
            <br/>
            <div className={styles.function}>
                Find hotels:
                <input
                    placeholder={'input name'}
                    value={hotelName}
                    onChange={e => setHotelName(e.target.value)}
                />
                <button onClick={handleFindHotelClick}>Find hotels</button>
            </div>
            <Hotels hotels={hotels}/>
            {hotels.length ? <div className={styles.hideBtn} onClick={handleCloseHotelsClick}>hide hotels</div> : <></>}
            <div className={styles.function}>
                Find users:
                <input
                    placeholder={'input name'}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <button onClick={handleFindClick}>Find users</button>
            </div>
            <Users users={users}></Users>
            <CreateHotelForm/>
            <Footer/>
        </>
    );
};

export default AdminPage;