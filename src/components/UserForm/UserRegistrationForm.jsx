import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {createUser} from "../../store/user/userSlice";
import styles from './User.module.css'

const UserRegistrationForm = ({ toggleCurrentFormType, closeForm }) => {
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        name: "",
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

        dispatch(createUser(values));
        closeForm();
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <div onClick={closeForm} className={styles.closeButton}>
                    ✖
                </div>

                <div className={styles.title}>Sign Up</div>

                <form onSubmit={handleSubmit} className={styles.form}>
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
                        onClick={() => toggleCurrentFormType("login")}
                        className={styles.formChange}
                    >
                        I already have an account
                    </div>

                    <button type="submit" className={styles.confirmButton}>
                        Create an account
                    </button>
                </form>
            </div>
        </div>
    );
};


export default UserRegistrationForm;