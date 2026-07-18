import uploadCloudinary from "../config/cloudinary.js"
import User from "../model/userModel.js"

export const getCurrentUser = async (req, res) => {
   try {
      const user = await User.findById(req.userId).select("-password").populate("enrolledCourses")  //this userId comes from authentication middleware and populate is use for replace course id with actual course data
      //   console.log(user);

      if (!user) {
         return res.status(404).json({ message: "User not found" })
      }
      return res.status(200).json(user)
   } catch (error) {
      return res.status(500).json({ message: `Get current user error ${error}` })
   }
}

export const updateProfile = async (req, res) => {
   try {
      const userId = req.userId
      const { description, name } = req.body
      let photoUrl
      if (req.file) { //req.file is come from multer -> upload.single("photoUrl")
         photoUrl = await uploadCloudinary(req.file.path)
      }
      const user = await User.findByIdAndUpdate(userId, { name, description, photoUrl }, {new:true})
      if (!user) {
         return res.status(404).json({ message: "User not found" })
      }
      return res.status(200).json(user)
   } catch (error) {
      console.log(error);
      
      return res.status(500).json({ message: `UpdateProfile error ${error}` })


   }

}