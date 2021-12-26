import React, { useState, useEffect } from 'react'
import styles from '../../../styles/Header.module.css'


function Header() {

    const [color, setColor] = useState(false)

    useEffect(() => {
        const changeColor = () => {
            if (window.scrollY >= 100) {
                setColor(true)
            } else {
                setColor(false)
            }
        }

        window.addEventListener('scroll', changeColor)
    }, []);



    return (
        <>
            <div className={styles.shade}></div>
            <div style={color ? {
                backgroundColor: "rgba(0, 0, 0, .85)",
                transition: "1.5s",
            } : { }}
                className={styles.header} >

                <div>
                    <h1 className="font-medium text-lg	antialiased	">AkatzukI</h1>
                </div>
                <div className={styles.login}>
                    <a>LOGIN</a>

                </div>
            </div>
        </>
    )
}

export default Header
