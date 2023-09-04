import React, {useState} from 'react';
import styles from './Feedbacks.module.css'
import {useDispatch, useSelector} from "react-redux";
import {createFeedback, toggleFeedbacks} from "../../store/feedbacks/feedbacksSlice";
import Feedback from "./Feedback";
import {useParams} from "react-router-dom";
import {toggleForm} from "../../store/user/userSlice";

const Feedbacks = ({feedbacks}) => {
    const {id} = useParams();
    const {currentUser} = useSelector(({user}) => user);
    const [values, setValues] = useState({
        message: '',
        rate: '',
    })
    const {showFeedbacks} = useSelector(({feedbacks}) => feedbacks)
    const dispatch = useDispatch();
    const closeForm = () => {
        dispatch(toggleFeedbacks(false));
    }

    const handleChange = ({ target: { value, name } }) => {
        setValues({ ...values, [name]: value });
    };

    const handleSubmitClick = () => {
        if (!currentUser) {
            dispatch(toggleFeedbacks(false));
            dispatch(toggleForm(true));
            return;
        }
        if (!values.rate || !values.message) {
            alert("Сначала введите текст сообщения и выберите оценку.")
            return;
        }
        dispatch(createFeedback({
            ...values,
            userId: currentUser.id,
            hotelId: id,
        }))
    }

    return showFeedbacks ? (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <div onClick={closeForm} className={styles.closeButton}>
                    ✖
                </div>
                <div className={styles.title}>Feedbacks:</div>
                <div className={styles.feedbacks}>
                    {feedbacks.map(feedback =>
                        <Feedback key={feedback.id} feedback={feedback}></Feedback>
                    )
                    }
                </div>
                <div className={styles.footer}>
                    <input
                        required
                        name={"message"}
                        placeholder={'Leave feedback'}
                        value={values.message}
                        onChange={handleChange}
                    />
                    <input
                        required
                        name={"rate"}
                        type={"number"}
                        min={1}
                        max={10}
                        placeholder={'rate'}
                        value={values.rate}
                        onChange={handleChange}
                    />
                    <button onClick={handleSubmitClick}>-></button>
                </div>
            </div>
        </div>
    ) : (
      <></>
    );
};

export default Feedbacks;