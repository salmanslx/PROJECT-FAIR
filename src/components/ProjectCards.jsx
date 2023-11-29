import React, { useState } from 'react'
import { Card, Modal } from 'react-bootstrap'
import projectPic from '../Assets/project1.png'
import { Row,Col } from 'react-bootstrap'
import { BASE_URL } from '../Services/baseurl'

function ProjectCards({ project }) {

    const [show,setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
  return (
    <div className='px-4'>
        { project && <Card className='shadow mb-5 btn' onClick={handleShow}>
        <Card.Img height={'260px'} variant="top" src={project?`${BASE_URL}/uploads/${project.projectImage}` : projectPic} />
        <Card.Body>
            <Card.Title>{project.title}</Card.Title>
        </Card.Body>
        </Card>}

        <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{project.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col md={6}>
                    <img style={{height:'200px'}} src={project?`${BASE_URL}/uploads/${project.projectImage}` : projectPic} alt="" />
                </Col>
                <Col md={6}>
                    <h2>{project.title}</h2>
                    <p>{project.overview}</p>
                    <p>Languages Used : <span className='fw-bold'>{project.languages}</span></p>
                </Col>
            </Row>
            <div className='mt-3'>
                <a className='me-3 btn' href={project.github} target='_blank'>
                    <i class="fa-brands fa-github fa-2x"></i>
                </a>
                <a className='me-3 btn' href={project.website} target='_blank'>
                    <i class="fa-solid fa-link fa-2x"></i>
                </a>
            </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default ProjectCards