import { useDispatch, useSelector } from "react-redux"
import { serverUrl } from "../App"
import { useEffect } from "react"
import axios from "axios"
import { setCourseData } from "../redux/courseSlice"


 const getPublishedCourse = () => {
    const dispatch = useDispatch()
    // const{userData} = useSelector(state=>state.user)
   useEffect(()=>{
    const fetchCoursesData = async () =>{
        try {
            const result = await axios.get(serverUrl + "/api/course/getpublished", {withCredentials:true})
            console.log(result.data);
            
            dispatch(setCourseData(result.data))
        } catch (error) {
            // console.log(error);
            dispatch(setCourseData(null))
            
        }
    }
    fetchCoursesData()
   }, [])
 }

 export default getPublishedCourse