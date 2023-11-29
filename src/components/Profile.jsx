import React, { useEffect } from 'react'
import { useState } from 'react';
import profileImg from '../Assets/profile-img.png'
import { Collapse } from 'react-bootstrap';
import { BASE_URL } from '../Services/baseurl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editUserAPI } from '../Services/allAPI';

function Profile() {

    const [open, setOpen] = useState(false);


    const [userProfile, setUserProfile] = useState({
        username: "",
        email: "",
        password: "",
        profile: "",
        github: "",
        linkedin: ""
    })

    const [existingImage, setExistingImage] = useState("")
    const [preview, setPreview] = useState("")

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("existingUser"))
        setUserProfile({ ...userProfile, username: user.username, email: user.email, password: user.password, profile: "", github: user.github, linkedin: user.linkedin })
        setExistingImage(user.profile)
    }, [open])

    // user upload
    useEffect(() => {
        if (userProfile.profile) {
            setPreview(URL.createObjectURL(userProfile.profile))
        } else {
            setPreview("")
        }
    }, [userProfile.profile])


    const handleProfileUpdate = async () => {
        const { username, email, password, profile, github, linkedin } = userProfile
        if (!github || !linkedin) {
            toast.info("Please fill the form completely")
        }
        else {
            const reqBody = new FormData()
            reqBody.append("username", username)
            reqBody.append("email", email)
            reqBody.append("password", password)
            reqBody.append("github", github)
            reqBody.append("linkedin", linkedin)
            preview ? reqBody.append("profileImage", profile) : reqBody.append("profileImage", existingImage)

            const token = sessionStorage.getItem("token")
            if (preview) {

                const reqHeader = {
                    "Content-type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }

                // api call
                const res = await editUserAPI(reqBody, reqHeader)
                if (res.status===200) {
                    setOpen(!open)
                    sessionStorage.setItem("existingUser", JSON.stringify(res.data))
                } else {
                    setOpen(!open)
                    console.log(res);
                    console.log(res.response.data);
                }
            }
            else {
                const reqHeader = {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                }

                // api call
                const res = await editUserAPI(reqBody, reqHeader)
                if (res.status===200) {
                    setOpen(!open)
                    sessionStorage.setItem("existingUser", JSON.stringify(res.data))
                } else {
                    setOpen(!open)
                    console.log(res);
                    console.log(res.response.data);
                }
            }
        }


    }

    return (
        <div className='p-2 border border-1 mt-5 rounded'>
            <div className='d-flex  p-2 rounded justify-content-between align-items-center'>
                <h2>My Profile</h2>
                <button onClick={() => setOpen(!open)} className='btn btn-outline-info d-flex align-items-center'>
                    <i class="fa-solid fa-chevron-down"></i>
                </button>
            </div>
            <Collapse in={open}>
                <div className='row justify-center p-4'>
                    <label className='text-center'>
                        <input style={{ display: 'none' }} type="file" onChange={e => setUserProfile({ ...userProfile, profile: e.target.files[0] })} />
                        {
                            existingImage !== "" ?
                                <img width={'200px'} height={'200px'} src={preview ? preview : `${BASE_URL}/uploads/${existingImage}`} className='rounded-circle' alt="Upload" />
                                :
                                <img width={'200px'} height={'200px'} src={preview ? preview : profileImg} className='rounded-circle' alt="Upload" />
                        }
                    </label>
                    <div className='mt-3'>
                        <input type="text" className='form-control' placeholder='GitHub' value={userProfile.github} onChange={e => setUserProfile({ ...userProfile, github: e.target.value })} />
                    </div>
                    <div className='mt-3'>
                        <input type="text" className='form-control' placeholder='LinkedIn' value={userProfile.linkedin}  onChange={e => setUserProfile({...userProfile, linkedin: e.target.value})} />
                    </div>
                    <div className='mt-3'>
                        <button style={{ fontSize: '16px' }} className='btn btn-warning  p-2  w-100' onClick={handleProfileUpdate}>Update</button>
                    </div>
                </div>
            </Collapse>
            <ToastContainer
                position="top-center"
                theme="colored"
            />
        </div>
    )
}

export default Profile