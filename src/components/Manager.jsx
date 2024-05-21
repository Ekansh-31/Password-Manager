import React,{ useState,useEffect } from 'react'
import myImage from "./image.jpg"
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = ({setPasswordArray,passwordArray,form,setForm}) => {
  const [ showPassword,setShowPassword ] = useState(false);


  const getPasswords = async()=>{
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    console.log(passwords);
    setPasswordArray(passwords);
  }

  useEffect(()=>{
    getPasswords();
    },[]);

  const togglePassword = ()=>{
    setShowPassword(!showPassword);
  }

  const savePassword = async()=>{
    if(form.link.length >3 && form.username.length >3 && form.password.length > 3){

      //if any such id is present,delete it
      // await fetch("http://localhost:3000/",{
      //   method : "DELETE",
      //   headers : {"Content-Type" : "application/json"},
      //   body : JSON.stringify({id : form.id})
      //  });

      setPasswordArray([...passwordArray,{...form, id : uuidv4()}]);
      
      // localStorage.setItem("passwords",JSON.stringify([...passwordArray,{...form, id : uuidv4()}]));
      //  console.log([[...passwordArray,{...form, id : uuidv4()}]]);
      
      await fetch("http://localhost:3000/",{
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({...form, id : uuidv4()})})
      
      setForm({link:"",username:"",password:""});
      toast('Password Added Successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
    else{
      toast('The Length of the Fields Must be Greater than 3', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  }

  const handleChange = (e)=>{
    setForm({...form,[e.target.name]: e.target.value})
  }

  return (
    <>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />


<div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>

      


    <div className='bg-opacity-0 min-h-[50vh] flex justify-center mt-10'>
      <div className='bg-gradient-to-r from-indigo-500 ... flex rounded-2xl shadow-lg max-w-3xl p-5'>

        <div className='w-1/2 font-sans flex justify-center flex-col text-center'>
          <p className='text-gray-800 text-2xl font-bold mb-[31px]'>Your Digital Guardian</p>

          <div className='flex flex-col justify-center items-center'>
            <label className='relative font-sans mb-[31px]'>
              <input type="text" name="link" value={form.link} onChange={handleChange} className='h-10 w-[21rem] flex justify-center px-6 text-lg bg-white border-2 rounded-xl border-white border-opacity-50 outline-none focus:border-blue-500 focus:text-black transition duration-200'/>
              <span className='text-xl text-black text-opacity-80 absolute left-0 top-1 mx-6 px-2 transition duration-200 input-text'>Link</span>
            </label>
            <label className='relative font-sans mb-[31px]'>
              <input type="text" name="username" value={form.username} onChange={handleChange} className='h-10 w-[21rem] flex justify-center px-6 text-lg bg-white border-2 rounded-xl border-white border-opacity-50 outline-none focus:border-blue-500 focus:text-black transition duration-200'/>
              <span className='text-xl text-black text-opacity-80 absolute left-0 top-1 mx-6 px-2 transition duration-200 input-text'>Username</span>
            </label>
            <label className='relative font-sans mb-[31px]'>
              <input type={showPassword ? "text" : "password"} name="password" value={form.password} onChange={handleChange} className='h-10 w-[21rem] flex justify-center px-6 text-lg bg-white border-2 rounded-xl border-white border-opacity-50 outline-none focus:border-blue-500 focus:text-black transition duration-200'/>
              <span className='text-xl text-black text-opacity-80 absolute left-0 top-1 mx-6 px-2 transition duration-200 input-text'>Password</span>
              <span className='text-xl text-opacity-80 text-black absolute right-3 top-2 text-center cursor-pointer' onClick={togglePassword}>
                {showPassword ? <FaEyeSlash />:<FaEye />}
              </span>
            </label>

            <div className='flex justify-center'>
              <button className='bg-gray-800 text-white h-[3.25rem] font-sans w-44  text-opacity-80  border-2 rounded-xl border-white border-opacity-50 outline-none' onClick={savePassword} >Save Password</button>
             </div>

          </div>

        </div>

        <div className='w-1/2'>
        <img src={myImage} alt="" className='rounded-2xl'/>
        </div>

      </div>
    </div>
    <div>
    
    </div>
    </>
  )
}

export default Manager

// <div class="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>

