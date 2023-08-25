import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {createUser} from "../../store/user/userSlice";

const UserRegistrationForm = ({ toggleCurrentFormType, closeForm }) => {
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        isAdmin: "false"
    });

    const handleChange = ({ target: { value, name } }) => {
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isNotEmpty = Object.values(values).some((val) => val);

        if (!isNotEmpty) return;

        dispatch(createUser(values));
        closeForm();
    };

    return (
        <div>
            <div onClick={closeForm}>
                CLOSE ME
            </div>

            <div>Sign Up</div>

            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="email"
                        placeholder="Your email"
                        name="email"
                        value={values.email}
                        autoComplete="off"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <input
                        type="name"
                        placeholder="Your name"
                        name="name"
                        value={values.name}
                        autoComplete="off"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="Your password"
                        name="password"
                        value={values.password}
                        autoComplete="off"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div
                    onClick={() => toggleCurrentFormType("login")}
                >
                    I already have an account
                </div>

                <button type="submit">
                    Create an account
                </button>
            </form>
        </div>
    );
};


export default UserRegistrationForm;