import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import loginImg from '../Assets/login-img.jpg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, registerAPI } from '../Services/allAPI';
import { tokenAuthorisationContext } from '../Context/TokenAuth';

function Auth({register}) {

    const {isAuthorized, setIsAuthorized} = useContext(tokenAuthorisationContext)

    const navigate = useNavigate()

    const [userData, setUserData] = useState({
        username:"", email:"", password:""
    })

    const isRegisterForm = register ? true : false

    const handleRegister = async (e) => {
        e.preventDefault();
        const {username, email, password} = userData
        if(!username || !email || !password){
            toast.info("Please fill the form completely")
        }
        else{
            const result = await registerAPI(userData)
            if(result.status === 200){
                toast.success(`${result.data.username} has registered successfully!!`)
                setUserData({
                    username:"",
                    email:"",
                    password:""
                })
                navigate('/login')
            }
            else{
                toast.warning(result.response.data)
                console.log(result);
            }
        }
    }

    const handleLogin = async(e) => {
        const {email, password} = userData
        e.preventDefault()
        if(!email || !password){
            toast.info("Please fill the form completely")
        }
        else{
            const result = await loginAPI(userData)
            if(result.status === 200){
                sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
                sessionStorage.setItem("token",result.data.token)
                setIsAuthorized(true)
                setUserData({
                    email:"",
                    password:""
                })
                navigate('/')
            }
            else{
                toast.warning(result.response.data)
                console.log(result);
            }
        }
    }


  return (
    <div style={{width:'100',height:'100vh'}} className='d-flex justify-content-center align-items-center'>
        <div className='w-75 container'>
            <Link to={'/'} style={{textDecoration:'none', color:'blue'}}><i class="fa-solid fa-arrow-left"></i>Back to home</Link>
            <div className='card shadow p-5 bg-success'>
                <div className='row align-items-center'>
                    <div className='col-lg-6 d-flex'>
                        <img style={{width:'400px'}} src={loginImg} className='img-fluid' alt='' />
                    </div>
                    <div className='col-lg-6'>
                        <div className="d-flex align-items-center flex-column">
                            <h1 className='fw-bolder text-light mt-2'>
                                <i class="fa-brands fa-stack-overflow fa-bounce"></i> Project Fair
                            </h1>
                            <h5 className='fw-bolder mt-2 pb-3 text-light'>
                                {
                                    isRegisterForm ? 'Sign Up to your Account' : 'Sign In to your Account'
                                }
                            </h5>
                            <Form className='text-light w-75'>
                                {
                                    isRegisterForm &&
                                    <Form.Group className="mb-3" controlId="formUserName">
                                        <Form.Control type="text" placeholder="Username" value={userData.username} onChange={e=>{setUserData({...userData,username:e.target.value})}} />
                                    </Form.Group>
                                }
    
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="email" placeholder="Enter Email ID" value={userData.email} onChange={e=>{setUserData({...userData,email:e.target.value})}} />
                                </Form.Group>
    
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="password" placeholder="Enter Password" value={userData.password} onChange={e=>{setUserData({...userData,password:e.target.value})}} />
                                </Form.Group>
                            
                                {
                                    isRegisterForm ? 
                                    <div>
                                        <button className='btn btn-light mb-2' onClick={handleRegister}>Register</button>
                                        <p>Already have Account? Click here to <Link to={'/login'} className='text-primary'>Login</Link></p>
                                    </div> :
                                    <div>
                                    <button className='btn btn-light mb-2' onClick={handleLogin}>Login</button>
                                    <p>New User? Click here to <Link to={'/register'} className='text-primary'>Register</Link></p>
                                </div>
                                }
    
                            </Form> 
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <ToastContainer
            position="top-center"
            theme="colored"
        />
       
    </div>
  )
}

export default Auth