import axios from "axios"
import { useState } from "react"
import { API_URL } from "../constants/Api"


const UploadFile = () => {

  const [myFile, setMyFile] = useState('')
  const [data, setData] = useState([])
  const URL = `${API_URL}/v1/auth/upload-dp`
  const changeFile = (e) =>{
    let reader = new FileReader()
    let myImage = e.target.files[0]
    reader.readAsDataURL(myImage)
   
    reader.onload = () =>{
      setMyFile(reader.result)
    }
  }

  const uploadIt = () =>{
  
    axios.post(URL , {myFile})
    .then((res)=>{
      console.log(res.data);
      setData(res.data)
    })
  }
  return (
    <div>
      <input type="file" name="" id="" onChange={(e)=>changeFile(e)}/>
      <button classNameName="" onClick={uploadIt}>Upload file</button>


      <img src={data.storedImage} alt="" />
      {/* <div className="mb-4 md">
                <p className="text-gray-300 font-bold mb-2">Bio</p>
                <input type="text" width={500} height={500} className="bg-[#626565] w-full md:w-80 h-40 focus:outline-none rounded-lg text-white font-bold hover:border border-blue-400" />
              </div>
              <div className="ml-36">
                <button className="bg-green-700 text-gray-300 rounded border-none p-2 cursor-pointer">Save</button>
              </div> */}
      </div>
  )
}

export default UploadFile