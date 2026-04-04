import { useDispatch, useSelector } from "react-redux"
import { serverUrl } from "../App"
import { useEffect } from "react"
import axios from "axios"
import { setCreatorCourseData } from "../redux/courseSlice"


 const getCreatorCourse = () => {
    const dispatch = useDispatch()
    const{userData} = useSelector(state=>state.user)
   useEffect(()=>{
    const fetchCreatorCourses = async () =>{
        try {
            const result = await axios.get(serverUrl + "/api/course/getcreator", {withCredentials:true})
            console.log(result.data);
            
            dispatch(setCreatorCourseData(result.data))
        } catch (error) {
            // console.log(error);
            dispatch(setCreatorCourseData(null))
            
        }
    }
    fetchCreatorCourses()
   }, [userData])
 }

 export default getCreatorCourse