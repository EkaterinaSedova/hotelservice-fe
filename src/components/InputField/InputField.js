import React, {useState} from 'react';
import styles from './InputField.module.css'
import {useDispatch} from "react-redux";
import {getAvailableRooms} from "../../store/rooms/roomsSlice";
import {useNavigate} from "react-router-dom";
import {SEARCH_ROUTE} from "../../routing/paths";

const InputField = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        country: '',
        city: '',
        inDate: '',
        outDate: '',
    });

    const handleChange = ({ target: { value, name } }) => {
        setValues({ ...values, [name]: value });
    };
    const handleFindClick = () => {
        dispatch(getAvailableRooms({ values }));
        navigate(SEARCH_ROUTE + `/?country=${values.country}` + `&city=${values.city}` + `&inDate=${values.inDate}` + `&outDate=${values.outDate}`);
        window.location.reload();
    }

    return (
        <>
            <form className={styles.InputField} onSubmit={() => handleFindClick()}>
                <input
                    required
                    name={"country"}
                    placeholder={'Country'}
                    className={styles.InputText}
                    value={values.country}
                    onChange={handleChange}
                />
                <input
                    required
                    name={"city"}
                    placeholder={'City'}
                    className={styles.InputText}
                    value={values.city}
                    onChange={handleChange}
                />
                <input
                    required
                    name={"inDate"}
                    type={"date"}
                    min={'2023-08-22'}
                    className={styles.InputDate}
                    value={values.inDate}
                    onChange={handleChange}
                />
                <input
                    required
                    name={"outDate"}
                    type={"date"}
                    min={'2023-08-22'}
                    className={styles.InputDate}
                    value={values.outDate}
                    onChange={handleChange}
                />
                <button
                    type={"submit"}
                    className={styles.InputButton}
                >
                    Find
                </button>
            </form>
        </>
    );
};

export default InputField;