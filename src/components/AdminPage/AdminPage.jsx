import React, {useState} from 'react';
import Header from "../Header/Header";
import {useDispatch, useSelector} from "react-redux";
import {toggleShowCreateHotelForm} from "../../store/hotels/hotelsSlice";
import CreateHotelForm from "../CreateHotelForm/CreateHotelForm";
import Users from "../Users/Users";
import {getUsersByName} from "../../store/user/userSlice";

const AdminPage = () => {
    const {users} = useSelector(({user}) => user);
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const handleFindClick = () => {
        dispatch(getUsersByName({name: name}));
    }

    const handleCreateHotelClick = () => {
        dispatch(toggleShowCreateHotelForm(true));
    }
    return (
        <>
            <Header/>
            <button onClick={handleCreateHotelClick}>CREATE HOTEL</button>
            <br/>
            <div>
                <input
                    placeholder={'input name'}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <button onClick={handleFindClick}>Find users</button>
            </div>
            <Users users={users}></Users>
            <CreateHotelForm/>
        </>
    );
};

export default AdminPage;