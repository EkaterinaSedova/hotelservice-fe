import React from 'react';
import styles from './Footer.module.css'
import twitter from '../../img/twitter.svg'
import facebook from '../../img/facebook.svg'
import instagram from '../../img/instagram.svg'

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.footerComponent}>
                <div className={styles.name}>
                    Ekaterina Sedova
                </div>
                <div className={styles.socials}>
                    <a href="https://twitter.com"><img src={twitter} alt="twitter"/></a>
                    <a href="https://vk.com/s.katena"><img src={facebook} alt="facebook"/></a>
                    <a href='https://www.instagram.com/kate.ssedova/'><img src={instagram} alt="instagram"/></a>
                </div>
                <div className={styles.email}>
                    katena.sedova@gmail.com
                </div>
            </div>
            <div>

            </div>
        </div>
    );
};

export default Footer;