import React from 'react';
import styles from './Feedbacks.module.css'
import {useDispatch, useSelector} from "react-redux";
import {toggleFeedbacks} from "../../store/feedbacks/feedbacksSlice";
import Feedback from "./Feedback";

const Feedbacks = ({feedbacks}) => {
    const {showFeedbacks} = useSelector(({feedbacks}) => feedbacks)
    const dispatch = useDispatch();
    const closeForm = () => {
        dispatch(toggleFeedbacks(false));
    }

    return showFeedbacks ? (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <div onClick={closeForm} className={styles.closeButton}>
                    ✖
                </div>
                <div className={styles.title}>Feedbacks:</div>
                {feedbacks.map(feedback =>
                    <Feedback key={feedback.id} feedback={feedback}></Feedback>
                )
                }
            </div>
        </div>
    ) : (
      <></>
    );
};

export default Feedbacks;