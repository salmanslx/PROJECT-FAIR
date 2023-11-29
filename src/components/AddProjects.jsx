import React, { useContext, useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectAPI } from '../Services/allAPI';
import { addProjectResponseContext } from '../Context/ContextShare';

function AddProjects() {
  const { addProjectResponse, setAddProjectResponse } = useContext(addProjectResponseContext)
  const [show, setShow] = useState(false);
  const [preview, ssetPreview] = useState("")
  const [token, setToken] = useState("")

  const [projectDetails, setProjectDetails] = useState({
    title: "",
    languages: "",
    overview: "",
    github: "",
    website: "",
    projectImage: ""
  })

  useEffect(() => {
    if (projectDetails.projectImage) {
      ssetPreview(URL.createObjectURL(projectDetails.projectImage))
    }
  }, [projectDetails.projectImage])

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }
    else {
      setToken("")
    }
  }, [])


  const handleAdd = async (e) => {
    e.preventDefault()
    const { title, languages, overview, github, website, projectImage } = projectDetails
    if (!title || !languages || !overview || !github || !website || !projectImage) {
      toast.info("Please fill the form completely")
    }
    else {
      const reqBody = new FormData()
      reqBody.append("title", title)
      reqBody.append("languages", languages)
      reqBody.append("overview", overview)
      reqBody.append("github", github)
      reqBody.append("website", website)
      reqBody.append("projectImage", projectImage)

      if (token) {
        const reqHeader = {
          "Content-type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        const result = await addProjectAPI(reqBody, reqHeader)
        if (result.status === 200) {
          console.log(result.data);
          handleClose()
          setAddProjectResponse(result.data)
        }
        else {
          console.log(result);
          toast.warning(result.response.data);
        }
      }
    }
  }

  // console.log(projectDetails);

  const handleClose = () => {
    setShow(false);
    setProjectDetails({
      title: "",
      languages: "",
      overview: "",
      github: "",
      website: "",
      projectImage: ""
    })
    ssetPreview("")
  }
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="info" onClick={handleShow}>
        Add Project
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-6">
              <label>
                <input style={{ display: "none" }} type="file" onChange={e => setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] })} />
                <img
                  width={'100%'}
                  className="img-fluid"
                  src={preview ? preview : "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png"}
                  alt=""
                />
              </label>
            </div>

            <div className="col-lg-6 p-3">
              <div className="mb-3 ">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Project Title"
                  value={projectDetails.title}
                  onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Language Used"
                  value={projectDetails.languages}
                  onChange={(e) => setProjectDetails({ ...projectDetails, languages: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="GitHub Link"
                  value={projectDetails.github}
                  onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Website Link"
                  value={projectDetails.website}
                  onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Project Overview"
                  value={projectDetails.overview}
                  onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAdd}>ADD</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer
        position="top-center"
        theme="colored"
      />
    </>
  )
}

export default AddProjects