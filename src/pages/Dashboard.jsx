import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Row,Col } from 'react-bootstrap'
import MyProject from '../components/MyProject'
import Profile from '../components/Profile'

function Dashboard() {

  const [username, setUsername] = useState()

  useEffect(()=>{
    if(sessionStorage.getItem('existingUser')){
      setUsername(JSON.parse(sessionStorage.getItem("existingUser")).username)
    }
  },[])
  return (
    <>
      <Header  insideDashboard />
      <Row style={{marginTop:'100px'}} className='container-fluid px-4'>
        <Col sm={12} md={8}>
          <h1>Welcome <span className='text-warning'>{username}</span></h1>
          {/* my project */}
          <MyProject />
        </Col>
        <Col sm={12} md={4}>
          {/* my-profile */}
          <Profile />
        </Col>
      </Row>
    </>

  )
}

export default Dashboard