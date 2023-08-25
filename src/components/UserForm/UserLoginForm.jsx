import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {loginUser} from "../../store/user/userSlice";

const UserLoginForm = ({ toggleCurrentFormType, closeForm }) => {
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const handleChange = ({ target: { value, name } }) => {
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isNotEmpty = Object.values(values).some((val) => val);

        if (!isNotEmpty) return;

        dispatch(loginUser(values));
        closeForm();
    };

    return (
        <div>
            <div onClick={closeForm}>
                CLOSE ME
            </div>

            <div>Log In</div>

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
                    onClick={() => toggleCurrentFormType("signup")}
                >
                    Create an account
                </div>

                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    );
};


export default UserLoginForm;