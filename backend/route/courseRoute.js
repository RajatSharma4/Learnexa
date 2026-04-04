import express from 'express'
import { createCourse, createLecture, deleteLecture, editCourse, editLecture, getCourseById, getCourseLecture, getCreatorById, getCreatorCourses, getPublishedCourses, removeCourse } from '../controller/CourseController.js'
import { isAuth } from '../middleware/isAuth.js'
import upload from '../middleware/multer.js'
import { searchWithAi } from '../controller/searchController.js'

const courseRouter = express.Router()

//for courses
courseRouter.post("/create", isAuth, createCourse)
courseRouter.get("/getpublished", getPublishedCourses)
courseRouter.get("/getcreator",isAuth, getCreatorCourses)
courseRouter.post("/editcourse/:courseId", isAuth, upload.single("thumbnail"), editCourse)
courseRouter.get("/getcourse/:courseId", isAuth, getCourseById)
courseRouter.delete("/remove/:courseId", isAuth, removeCourse)

//for lectures
courseRouter.post("/createlecture/:courseId", isAuth, createLecture)
courseRouter.get("/getcourselecture/:courseId", isAuth, getCourseLecture)
courseRouter.post("/editlecture/:lectureId", isAuth, editLecture)
courseRouter.delete("/deletelecture/:lectureId", isAuth, deleteLecture)
courseRouter.post("/creator", isAuth, getCreatorById)

// for search
courseRouter.post("/search", searchWithAi)

export default courseRouter


//  upload.single("videoUrl"),