import React from 'react';
import styles from './Feedbacks.module.css'

const Feedback = ({feedback}) => {
    return (
        <div className={styles.feedback}>
            <div>
                {feedback.message}
            </div>
            <div className={feedback.rate >= 8 ? styles.goodRate : feedback.rate <= 3 ? styles.badRate : styles.mediumRate}>
                {feedback.rate}
            </div>
        </div>
    );
};

export default Feedback;