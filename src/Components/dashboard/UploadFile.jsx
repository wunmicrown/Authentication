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
      </div>
  )
}

export default UploadFile