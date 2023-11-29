import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Row, Col } from 'react-bootstrap'
import ProjectCards from '../components/ProjectCards'
import { allProjectsAPI } from '../Services/allAPI'

function Projects() {

  const [allProjects, setAllProjects] = useState([])
  const [searchKey,setSearchKey] = useState("")

  const getAllProjects = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-type": "application/json", "Authorization": `Bearer ${token}`
      }
      const result = await allProjectsAPI(searchKey, reqHeader)
      if (result.status === 200) {
        setAllProjects(result.data)
      } else {
        console.log(result);
      }
    }
  }

  useEffect(() => {
    getAllProjects()
  },[searchKey])

  return (
    <>
      <Header />
      <div style={{ marginTop: '100px' }}>
        <h1 className='text-center mb-3'>All Projects</h1>
        <div className='d-flex justify-content-center align-items-center w-100'>
          <div className='d-flex border w-50 rounded'>
            <input className='form-control' type="text" placeholder='search project by technology used' value={searchKey} onChange={e=>setSearchKey(e.target.value)} />
            <i style={{ marginLeft: '-50px' }} class="fa-solid fa-magnifying-glass fa-rotate-90 p-3"></i>
          </div>
        </div>
        <Row className='mt-5'>
          {allProjects?.length >0 ? allProjects?.map(project => (
            <Col sm={12} md={6} lg={4}>
              <ProjectCards project={project} />
            </Col>
          )) : !searchKey && <p style={{fontSize:'50px'}} className='fw-bolder text-danger text-center'>Please Login!!!</p> 
        }
        </Row>
      </div>
    </>
  )
}

export default Projects