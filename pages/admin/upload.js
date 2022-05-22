import React from 'react'
import LeftNavbar from '../../components/adminpanel/LeftSideBar'
import Header from '../../components/adminpanel/Header';
import Uploadform from '../../components/adminpanel/uploadform';


function Upload() {
  return (
    <div>
        <LeftNavbar />
        <Header />

        <Uploadform/>
    </div>
  )
}

export default Upload