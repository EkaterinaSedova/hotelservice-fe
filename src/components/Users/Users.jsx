import React from 'react';
import {useDispatch} from "react-redux";
import {changeUserRole} from "../../store/user/userSlice";

const Users = ({users}) => {
    const dispatch = useDispatch();
    const handleUserClick = (id) => {
        dispatch(changeUserRole({id}))
    }
    return (
        <div>
            {users.map(user =>
                <div key={user.id} onClick={() => handleUserClick(user.id)}>{user.name}</div>
            )}
        </div>
    );
};

export default Users;