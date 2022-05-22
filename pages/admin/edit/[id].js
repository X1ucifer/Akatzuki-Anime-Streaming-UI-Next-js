import React, { useState, useEffect } from 'react'
import Editform from "../../../components/adminpanel/edit"
import LeftNavbar from '../../../components/adminpanel/LeftSideBar'
import Header from '../../../components/adminpanel/Header'
import { useRouter } from 'next/router'
import axios from "axios"

function Edit() {

  const [series, setSeries] = useState([])
  const [update, setUpdate] = useState([])

  const router = useRouter();

  const fetchdata = async () => {
   
      const { data } = await axios.get(`/api/v1/all`)

      console.log("-->", data)
      setSeries(data)
   
  }

  useEffect(() => {
    fetchdata();

  }, [])

  const watch = () => {
    setUpdate(series.find((value) =>  value.id === Number(router.query.id)))
  }


  useEffect(() => {
    watch();

  }, [fetchdata])

  console.log("fsdf",update)

  return (
    <div>
      <LeftNavbar />
      <Header />
      <Editform  info={update}/>
    </div>
  )
}

export default Edit