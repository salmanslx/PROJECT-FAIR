import React, { useContext, useEffect, useState } from 'react'
import AddProjects from './AddProjects'
import { UserProjectsAPI, deleteProjectAPI } from '../Services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectResponseContext, editProjectResponseContext } from '../Context/ContextShare';
import EditProject from './EditProject';
function MyProject() {

    const {addProjectResponse, setAddProjectResponse} = useContext(addProjectResponseContext)
    const {editProjectResponse, setEditProjectResponse} = useContext(editProjectResponseContext)

    const [userProjects, setUserProjects] = useState([])

    const getUserProjects = async () => {
        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem("token")
            const reqHeader = {
                "Content-type": "application/json", "Authorization": `Bearer ${token}`
            }
            const result = await UserProjectsAPI(reqHeader)
            if (result.status === 200) {
                setUserProjects(result.data)
            }
            else {
                console.log(result);
                toast.warning(result.response.data)
            }
        }
    }

    const handleDelete = async (id) => {
        const token = sessionStorage.getItem("token")
        const reqHeader = {
            "Content-type":"application/json",
            "Authorization":`Bearer ${token}`
        }
        const result = await deleteProjectAPI(id,reqHeader)
        if(result.status === 200){
            // page reload
            getUserProjects()
        }
        else{
            toast.warning(result.response.data)
        }

    }

    useEffect(() => {
        getUserProjects()
    }, [addProjectResponse,editProjectResponse])

    return (
        <div className='card shadow mt-3 p-3'>
            <div className='d-flex align-items-center'>
                <h2>My Projects</h2>
                <div className='ms-auto'>
                    <AddProjects />
                </div>
            </div>
            <div className='mt-4'>
                {/* collection of user projects */}
                {userProjects?.length > 0?userProjects.map(project => (
                    <div className="border d-flex align-items-center rounded p-2 mb-2">
                        <h5>{project.title}</h5>
                        <div className="icon ms-auto d-flex align-items-center justify-content-center">
                            <EditProject project={project} />
                            <a href={`${project.github}`} className='btn' target='_blank' rel="noreferrer"><i class="fa-brands fa-github fs-5"></i></a>
                            <button className='btn' onClick={() => handleDelete(project._id)}><i class="fa-solid fa-trash fs-5"></i></button>
                        </div>
                    </div>
                ))
                :
                <p className='text-danger fw-bolder fs-5 mt-3'>No Project Uploaded Yet!!!</p>
                }

            </div>
            <ToastContainer
                position="top-center"
                theme="colored"
            />
        </div>
    )
}

export default MyProject