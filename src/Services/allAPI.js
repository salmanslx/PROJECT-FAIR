
import { BASE_URL } from "./baseurl"
import { commonAPI } from "./commonAPI"

// Register
export const registerAPI = async(user) => {
    return await commonAPI("POST",`${BASE_URL}/user/register`,user,"")
} 

// login
export const loginAPI = async(user) => {
    return await commonAPI("POST",`${BASE_URL}/user/login`,user,"")
} 

// Add project
export const addProjectAPI = async(reqBody,reqHeader) => {
    return await commonAPI("POST",`${BASE_URL}/project/add`,reqBody,reqHeader) 
}

// homeproject
export const homeProjectAPI = async () => {
    return await commonAPI("GET",`${BASE_URL}/projects/home-projects`,"","")
}

// allProjects
export const allProjectsAPI = async (searchKey, reqHeader) => {
    return await commonAPI("GET",`${BASE_URL}/projects/all?search=${searchKey}`,"",reqHeader)
}

// userProjects
export const UserProjectsAPI = async (reqHeader) => {
    return await commonAPI("GET",`${BASE_URL}/user/all-projects`,"",reqHeader)
}

// editProject
export const editProjectAPI = async (projectId, reqBody, reqHeader) => {
    return await commonAPI("PUT",`${BASE_URL}/projects/edit/${projectId}`,reqBody,reqHeader)
}

// deleteProject

export const deleteProjectAPI = async (projectId,reqHeader) => {
    return await commonAPI("DELETE",`${BASE_URL}/projects/remove/${projectId}`,{},reqHeader)
}

// edit user

export const editUserAPI = async (reqBody,reqHeader) => {
    return await commonAPI("PUT",`${BASE_URL}/user/edit`,reqBody,reqHeader)
}