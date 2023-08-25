import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {toggleForm, toggleFormType} from "../../store/user/userSlice";
import UserLoginForm from "./UserLoginForm";
import UserRegistrationForm from "./UserRegistrationForm";
const UserForm = () => {
    const dispatch = useDispatch();
    const { showForm, formType } = useSelector(({ user }) => user);

    const closeForm = () => dispatch(toggleForm(false));
    const toggleCurrentFormType = (type) => dispatch(toggleFormType(type));

    return showForm ? (
        <>
            <div onClick={closeForm} />
            {formType === "signup" ? (
                <UserRegistrationForm
                    toggleCurrentFormType={toggleCurrentFormType}
                    closeForm={closeForm}
                />
            ) : (
                <UserLoginForm
                    toggleCurrentFormType={toggleCurrentFormType}
                    closeForm={closeForm}
                />
            )}
        </>
    ) : (
        <></>
    );
};

export default UserForm;