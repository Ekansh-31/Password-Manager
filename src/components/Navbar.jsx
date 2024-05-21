import React, { useState,useEffect } from 'react';
import { CiMenuFries } from "react-icons/ci";
import { MdOutlineClose } from "react-icons/md";
import clsx from 'clsx';

import {Link} from "react-router-dom";


const Navbar = ({passwordArray,setPasswordArray}) => {
   const [isMenuOpen,setMenu] = useState(false);
   useEffect(()=>{
    let passwords = localStorage.getItem("passwords");
    if(passwords){
      setPasswordArray(JSON.parse(passwords));
    }
    },[]);
   const nav = [
    {
        label : "Home",
        to : "/"
    },
    {
        label : "About",
        to : "/"
    },
    {
        label : "All Passwords",
        to : "/allpasswords",
        disabled : passwordArray.length === 0,
    }
   ]

  return (
    <>
    <nav className="flex justify-between items-center px-8 py-6 lg:px-24">
     
     <div className='flex items-center gap-8'>
      <section className='flex items-center gap-4'>
        <Link to="/"><img src="https://cdn3.iconfinder.com/data/icons/tiny-line/48/Line_ui_icons_Svg-16-256.png" alt="" className="w-12 h-auto"/></Link>
        <Link to="/" className='text-4xl font-roboto'>SecureKey</Link>
      </section>
      {nav.map((d,i)=>(
         <Link to={d.to} key={i} className={clsx('hidden lg:block text-gray-400 hover:text-black', { 'opacity-50 cursor-not-allowed': d.disabled })} disabled={d.disabled}>{d.label}</Link>
        ))}
      </div>

      <div className={clsx('fixed h-full w-screen lg:hidden bg-black/50 backdrop-blur-sm top-0 right-0 transform transition-transform', isMenuOpen ? 'translate-x-0' : 'translate-x-full')}>
        <section className='text-black bg-white  flex-col absolute right-0 top-0 h-screen gap-8 p-8 z-50 w-56 flex'>
        <div className="flex justify-end">
         <MdOutlineClose onClick={()=>{setMenu(false)}} className='mt-0 mb-8 text-3xl cursor-pointer'/>
         </div>
        {nav.map((d,i)=>(
         <Link to={d.to} key={i} className='hidden lg:block text-gray-400 hover:text-black opacity-50 cursor-not-allowed' disabled={d.disabled}>{d.label}</Link>
        ))}
        </section>
      </div>

      <section className='flex items-center gap-4'>
       <CiMenuFries onClick={()=>{setMenu(true)}} className='text-3xl cursor-pointer lg:hidden'/>
      </section>

    </nav>
    <hr className='lg:mx-24'/>
    </>
  )
}

export default Navbar


// import React,{ useState } from 'react';
// import { CiMenuFries } from "react-icons/ci";
// import { MdOutlineClose } from "react-icons/md";
// import clsx from 'clsx';

// import {Link} from "react-router-dom";


// const Navbar = ({passwordArray}) => {
//    const [isMenuOpen,setMenu] = useState(false);
//    const nav = [
//     {
//         label : "Home",
//         to : "/"
//     },
//     {
//         label : "About",
//         to : "/"
//     },
//     {
//         label : "All Passwords",
//         to : "/allpasswords",
//         disabled : passwordArray.length === 0,
//     }
//    ]

//   return (
//     <>
//     <nav className="flex justify-between items-center px-8 py-6 lg:px-24">
     
//      <div className='flex items-center gap-8'>
//       <section className='flex items-center gap-4'>
//         <Link to="/"><img src="https://cdn3.iconfinder.com/data/icons/tiny-line/48/Line_ui_icons_Svg-16-256.png" alt="" className="w-12 h-auto"/></Link>
//         <Link to="/" className='text-4xl font-roboto'>SecureKey</Link>
//       </section>
//       {nav.map((d,i)=>(
//          <Link to={d.to} key={i} className='hidden lg:block text-gray-400 hover:text-black' disabled={d.disabled}>{d.label}</Link>
//         ))}
//       </div>

//       <div className={clsx('fixed h-full w-screen lg:hidden bg-black/50 backdrop-blur-sm top-0 right-0 transform transition-transform', isMenuOpen ? 'translate-x-0' : 'translate-x-full')}>
//         <section className='text-black bg-white  flex-col absolute right-0 top-0 h-screen gap-8 p-8 z-50 w-56 flex'>
//         <div className="flex justify-end">
//          <MdOutlineClose onClick={()=>{setMenu(false)}} className='mt-0 mb-8 text-3xl cursor-pointer'/>
//          </div>
//         {nav.map((d,i)=>(
//          <Link to={d.to} key={i} className='font-bold' disabled={d.disabled}>{d.label}</Link>
//         ))}
//         </section>
//       </div>

//       <section className='flex items-center gap-4'>
//        <CiMenuFries onClick={()=>{setMenu(true)}} className='text-3xl cursor-pointer lg:hidden'/>
//       </section>

//     </nav>
//     <hr className='lg:mx-24'/>
//     </>
//   )
// }

// export default Navbar
