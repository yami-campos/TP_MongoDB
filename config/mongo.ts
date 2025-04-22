import mongoose from "mongoose"

process.loadEnvFile()
const URI_DB = process.env.URI_DB || ""


const connectDB = async () => {
   try{
    await mongoose.connect(URI_DB)
   } catch(error){
   }
}


export {connectDB}