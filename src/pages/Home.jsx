import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import titleImage from "../Assets/landing-image-project.png"
import ProjectCards from '../components/ProjectCards'
import { Link } from 'react-router-dom'
import { homeProjectAPI } from '../Services/allAPI'

function Home() {

  const [loggedIn, setLoggedIn] = useState(false)
  const [homeProjects, setHomeProjects] = useState([])

  const getHomeProjects = async () => {
    const result = await homeProjectAPI()
    if (result.status === 200) {
      setHomeProjects(result.data)
    }
    else {
      console.log(result);
      console.log(result.response.data);
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setLoggedIn(true)
    }
    else {
      setLoggedIn(false)
    }
    getHomeProjects()
  }, [])

  return (
    <>
      {/* landing section */}
      <div style={{ width: '100%', height: '100vh', backgroundColor: '#99ee90' }} className='container-fluid rounded'>
        <Row className='align-items-center p-5'>
          <Col sm={12} md={6}>
            <h1 style={{ fontSize: '80px' }} className='fw-bold text-light mb-4'>
              <i class="fa-brands fa-stack-overflow fa-bounce"></i> Project Fair
            </h1>
            <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia natus perferendis at iusto totam. Sequi sunt, et vitae ab aut quaerat optio facere nam consequatur rem praesentium beatae autem. Illum, consequatur necessitatibus. Mollitia, aspernatur magnam recusandae voluptates dignissimos fugit.</p>
            {
              loggedIn ?
                <Link to={'/dashboard'} className='btn btn-warning'>Manage Your Project<i class='fa-solid fa-right-long fa-beat ms-2'></i></Link>
                :
                <Link to={'/login'} className='btn btn-warning'>Start to Explore<i class='fa-solid fa-right-long fa-beat ms-2'></i></Link>
            }
          </Col>
          <Col sm={12} md={6}>
            <img style={{ marginTop: '100px' }} className='w-100' src={titleImage} alt="" />
          </Col>
        </Row>
      </div>
      <div className='all-projects mt-5'>
        <h1 className='text-center mb-5'>Explore Our Projects</h1>
        <marquee scrollAmount={18}>
          <Row className='d-flex justify-content-between'>
            {
              homeProjects?homeProjects.map(project => (
                <Col sm={12} md={6} lg={4}>
                  <ProjectCards project={project} />
                </Col>
              )) : null
            }
          </Row>
        </marquee>
        <div className='text-center'> <Link to={'/projects'}>View More Projects</Link></div>
      </div>
    </>
  )
}

export default Home