import React from 'react';
import styles from './InputField.module.css'

const InputField = () => {
    return (
        <>
            <div className={styles.InputField}>
                <input placeholder={'Country'} className={styles.InputText}/>
                <input placeholder={'City'} className={styles.InputText}/>
                <input type={"date"} min={'2023-08-22'} className={styles.InputDate}/>
                <input type={"date"} min={'2023-08-22'} className={styles.InputDate}/>
                <button className={styles.InputButton}>Find</button>
            </div>
        </>
    );
};

export default InputField;