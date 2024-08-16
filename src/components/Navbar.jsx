import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-purple-600 flex justify-between items-center px-11 h-20 rounded-full w-4/6 m-auto my-8 '>
            <div className='logo font-extrabold text-white text-5xl flex justify-center items-center'>
                <span>
                    <img className='mx-2' src="public/icons/logo.svg" alt="" width="64px" />
                </span>
                Pass
                <span className='text-green-500'>GUARD</span>
            </div>
            <ul className=''>
                <li className='flex gap-4 text-xl font-semibold'>
                    <a className='hover:font-bold' href='/'>Home</a>
                    <a className='hover:font-bold' href=''>About</a>
                    <a className='hover:font-bold' href=''>Contact us</a>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
