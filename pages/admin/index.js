import React from 'react'
import Content from '../../components/adminpanel/Content';
import LeftNavbar from '../../components/adminpanel/LeftSideBar';
import Header from '../../components/adminpanel/Header';
import styles from "../../styles/Home.module.css";

function Admin() {
  return (
    <div className={styles.container}>
				<LeftNavbar />
				<Header />
				<Content />
			</div>
  )
}

export default Admin