import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {loginUser} from "../../store/user/userSlice";
import styles from './User.module.css'

const UserLoginForm = ({ toggleCurrentFormType, closeForm }) => {
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        login: "",
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
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <div onClick={closeForm} className={styles.closeButton}>
                    ✖
                </div>

                <div className={styles.title}>Log In</div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div>
                        <input
                            type="text"
                            placeholder="Your login"
                            name="login"
                            value={values.login}
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
                        className={styles.formChange}
                    >
                        Create an account
                    </div>
                    <button type="submit">
                        Login
                    </button>
                </form>
            </div>

        </div>
    );
};


export default UserLoginForm;