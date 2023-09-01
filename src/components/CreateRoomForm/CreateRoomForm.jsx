import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from '../CreateHotelForm/CreateHotel.module.css'
import {createRoom, toggleCreateRoomForm} from "../../store/rooms/roomsSlice";
const CreateRoomForm = () => {
    const dispatch = useDispatch();
    const {hotel} = useSelector(({hotels}) => hotels);
    const {showCreateRoomForm} = useSelector(({rooms}) => rooms);

    const [values, setValues] = useState({
        price: '',
        fridge: false,
        places: '',
    })

    const [img, setImg] = useState();
    const selectFile = e => {
        let images = [];
        for (let i = 0; i < e.target.files.length; i++)
        {
            images.push(e.target.files[i])
        }
        setImg(images)
    }
    const closeForm = () => {
        dispatch(toggleCreateRoomForm(false));
    }
    const handleCheckboxChange = ({ target: { checked, name } }) => {
        setValues({...values, [name]: checked});
    }
    const handleChange = ({ target: { value, name } }) => {
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isNotEmpty = Object.values(values).some((val) => val);

        if (!isNotEmpty) return;
        const formData = new FormData();
        const options = `{
            "price": ${values.price},
            "places": ${values.places},
            "fridge": ${values.fridge}
        }`;
        formData.append('options', options);
        if (!img) setImg(null)
        for (let i = 0; i < img.length; i++) {
            formData.append(`images`, img[i]);
        }
        formData.append('hotelId', hotel.id);
        dispatch(createRoom(formData));
        dispatch(toggleCreateRoomForm(false))
    }

    return showCreateRoomForm ? (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <div onClick={closeForm} className={styles.closeButton}>
                    ✖
                </div>
                <div className={styles.title}>Create room</div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label>Price (one day):</label>
                    <input
                        type="number"
                        min={0}
                        placeholder="price"
                        name="price"
                        value={values.price}
                        autoComplete="off"
                        onChange={handleChange}
                        required
                    />
                    <label>Places:</label>
                    <input
                        type="number"
                        min={1}
                        placeholder="places"
                        name="places"
                        value={values.places}
                        autoComplete="off"
                        onChange={handleChange}
                        required
                    />
                    <p>
                        Fridge:
                        <input
                            name={"fridge"}
                            type={"checkbox"}
                            onChange={handleCheckboxChange}
                        />
                    </p>
                    <input
                        type='file' multiple
                        onChange={selectFile}
                    />
                    <button type='submit'>Create room</button>
                </form>
            </div>
        </div>
    ) : (
        <></>
    );
};

export default CreateRoomForm;