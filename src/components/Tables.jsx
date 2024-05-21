import React from 'react';
import { FaCopy } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Tables = ({passwordArray,setPasswordArray,form,setForm}) => {
  const navigate = useNavigate();

  const copyText = (text) =>{
    navigator.clipboard.writeText(text);
    toast('Copied to Clipboard', {
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

  const handelDelete = async(id)=>{
    setPasswordArray(passwordArray.filter(item=>item.id !== id));

    // localStorage.setItem("passwords",JSON.stringify(passwordArray.filter(item=>item.id !== id)));

    let res = await fetch("http://localhost:3000/",{
        method : "DELETE",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({ id})
       });

    toast('Password Deleted Successfully', {
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

  const handleEdit = (id)=>{
    setForm({...passwordArray.filter(item => item.id === id)[0], id : id});
    setPasswordArray(passwordArray.filter(item => item.id !== id));
  };

 

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
    
   

   <table className="table-auto w-full rounded-xl overflow-hidden mt-[50px]">
  <thead className='bg-gradient-to-r from-indigo-700 to-indigo-600 ... font-roboto font-2xl text-black' style={{ opacity: 0.8 }}>
    <tr className=' font-roboto'>
      <th className='py-2'>Username</th>
      <th className='py-2'>Link</th>
      <th className='py-2'>Password</th>
      <th className='py-2'>Actions</th>
    </tr>
  </thead>
  <tbody>
    {passwordArray.map((item,index)=>(
      <tr key={index} className='font-roboto w-screen'>
      <td className="py-2 px-4 w-1/3">  <div className="flex items-center justify-content-center ml-[162px] gap-x-[25px]"><span className="text-left">{item.username}</span><FaCopy className="mr-1 text-xl cursor-pointer" onClick={()=>{copyText(item.username)}}/></div></td>
      <td className='text-center w-32 py-2'><a href={item.link} target="_blank">{item.link}</a></td>
      <td className="py-2 px-4 w-1/3">  <div className="flex items-center justify-content-center ml-[162px] gap-x-[25px]"><span className="text-left">{item.password}</span><FaCopy className="mr-1 text-xl cursor-pointer" onClick={()=>{copyText(item.password)}}/></div></td>
      <td className="py-2 px-4 w-1/3">  <div className="flex items-center justify-content-center ml-[162px] gap-x-[25px]"><RiEdit2Fill className="mr-1 cursor-pointer text-3xl" onClick={()=>{handleEdit(item.id)}}/><MdDelete className="mr-1 cursor-pointer text-3xl" onClick={()=>{handelDelete(item.id)}}/></div></td>
    </tr>
    ))}
    
  </tbody>
</table>

    </>
  )
}

export default Tables
