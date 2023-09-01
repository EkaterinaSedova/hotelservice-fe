import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createHotelAddress, createHotelInfo} from "../../utils/consts";
import styles from './CreateHotel.module.css'
import {createHotel, toggleCreateHotelFormStage, toggleShowCreateHotelForm} from "../../store/hotels/hotelsSlice";
import {createAddress} from "../../store/address/addressSlice";

const CreateHotelForm = () => {
    const {showCreateHotelForm, createHotelFormStage} = useSelector(({hotels}) => hotels);
    const dispatch = useDispatch();
    const {address} = useSelector(({address}) => address);

    const [values, setValues] = useState({
        country: "",
        city: "",
        address: "",
        name: "",
        description: "",
        starRating: "",
        contacts: "",
    });

    const [img, setImg] = useState();
    const selectFile = e => {
        let images = [];
        for (let i = 0; i < e.target.files.length; i++)
        {
            images.push(e.target.files[i])
        }
        setImg(images)
    }

    const handleChange = ({ target: { value, name } }) => {
        setValues({ ...values, [name]: value });
    };

    const handleAddressSubmit = (e) => {
        e.preventDefault();

        const isNotEmpty = Object.values(values).some((val) => val);

        if (!isNotEmpty) return;

        dispatch(createAddress({
            country: values.country,
            city: values.city,
            address: values.address
        }));
        dispatch(toggleCreateHotelFormStage(createHotelInfo));
    };

    const handleHotelSubmit = (e) => {
        e.preventDefault();

        const isNotEmpty = Object.values(values).some((val) => val);

        if (!isNotEmpty) return;
        const formData = new FormData();
        formData.append('name', values.name)
        formData.append('description', values.description)
        formData.append('starRating', values.starRating)
        formData.append('contacts', values.contacts)
        formData.append('addressId', address.id)
        if (!img) setImg(null)
        for (let i = 0; i < img.length; i++) {
            formData.append(`images`, img[i]);
        }
        dispatch(createHotel(formData));
        dispatch(toggleShowCreateHotelForm(false));
        dispatch(toggleCreateHotelFormStage(createHotelAddress))
    };
    const closeForm = () => dispatch(toggleShowCreateHotelForm(false));

    return showCreateHotelForm ? (
        <>
            {createHotelFormStage === createHotelAddress ?
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <div onClick={closeForm} className={styles.closeButton}>
                            ✖
                        </div>

                        <div className={styles.title}>At first, create address:</div>
                        <form className={styles.form} onSubmit={handleAddressSubmit}>
                            <label>Country: </label>
                            <input
                                type="text"
                                placeholder="country"
                                name="country"
                                value={values.country}
                                autoComplete="off"
                                onChange={handleChange}
                                required
                            />
                            <label>City: </label>
                            <input
                                type="text"
                                placeholder="city"
                                name="city"
                                value={values.city}
                                autoComplete="off"
                                onChange={handleChange}
                                required
                            />
                            <label>Address: </label>
                            <input
                                type="text"
                                placeholder="address"
                                name="address"
                                value={values.address}
                                autoComplete="off"
                                onChange={handleChange}
                                required
                            />
                            <button type="submit">confirm</button>
                        </form>
                    </div>
                </div>
                :
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <div onClick={closeForm} className={styles.closeButton}>
                            ✖
                        </div>

                        <div className={styles.title}>Now, create hotel:</div>
                        <form className={styles.form} onSubmit={handleHotelSubmit}>
                            <label>Country: </label>
                            <input
                                type="text"
                                placeholder="name"
                                name="name"
                                value={values.name}
                                autoComplete="off"
                                onChange={handleChange}
                                required
                            />
                            <label>Description: </label>
                            <input
                                type="text"
                                placeholder="description"
                                name="description"
                                value={values.description}
                                autoComplete="off"
                                onChange={handleChange}
                                required
                            />
                            <input
                                   type='file' multiple
                                   onChange={selectFile}
                            />
                            <label>Star rating: </label>
                            <input
                                type="number"
                                min={1}
                                max={5}
                                placeholder="0"
                                name="starRating"
                                value={values.starRating}
                                autoComplete="off"
                                onChange={handleChange}
                                required
                            />
                            <label>Contacts: </label>
                            <input
                                type="text"
                                placeholder="contacts"
                                name="contacts"
                                value={values.contacts}
                                autoComplete="off"
                                onChange={handleChange}
                                required
                            />
                            <button type="submit">confirm</button>
                        </form>
                    </div>
                </div>
            }
        </>
    ) : (
        <></>
    );
};

export default CreateHotelForm;