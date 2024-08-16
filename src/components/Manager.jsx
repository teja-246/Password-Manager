import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
    const ref = useRef()
    const passwordref = useRef()
    const showpassword = () => {
        passwordref.current.type = "text"
        console.log(ref.current.src)
        if (ref.current.src == "src/assets/noeye.svg") {
            ref.current.src = "src/assets/eye.svg"
            passwordref.current.type = "text"
        }
        else {
            ref.current.src = "src/assets/noeye.svg"
            passwordref.current.type = "password"
        }
    }


    const [form, setform] = useState({ site: "", username: "", password: "" })

    const [passwordarray, setpasswordarray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("password")
        // console.log(passwords)
        let passwordarray;
        if (passwords) {
            setpasswordarray(JSON.parse(passwords))
        }
        else {
            passwordarray = []
        }
    }, [])

    const savepassword = () => {
        if (form.site.length > 3 && form.username.length > 0 && form.password.length > 0) {
            setpasswordarray([...passwordarray, { ...form, id: uuidv4() }])
            localStorage.setItem("password", JSON.stringify([...passwordarray, { ...form, id: uuidv4() }]))
            console.log(...passwordarray, { ...form, id: uuidv4() })
        //    toast ('Saved Successfully!', {
        //         position: "top-right",
        //         autoClose: 2000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: false,
        //         draggable: true,
        //         progress: undefined,
        //         theme: "dark",
        //         // transition: "Bounce"
        //     });
        }
        else {
            // toast('Enter valid credentials', {
            //     position: "top-right",
            //     autoClose: 2000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: false,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "dark",
            //     // transition: "Bounce"
            // });
        }
    }

    const editpassword = (id) => {
        setform(passwordarray.filter(item => item.id === id)[0])
        // setpasswordarray(passwordarray.filter(item=>item.id!==id))
    }

    const deletepassword = (id) => {
        let conf = confirm("Are you sure, you want to delete this password?")
        if (conf) {
            setpasswordarray(passwordarray.filter(item => item.id !== id))
            localStorage.setItem("password", JSON.stringify(passwordarray.filter(item => item.id !== id)))
        }
        // toast('Password Deleted', {
        //     position: "top-right",
        //     autoClose: 2000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: false,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "dark",
        //     // transition: "Bounce"
        // });
    }

    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const imgref = useRef()
    const copytext = (text) => {
        // toast('Copied to clipboard', {
        //     position: "top-right",
        //     autoClose: 2000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: false,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "light",
        //     // transition: "Bounce"
        // });
        navigator.clipboard.writeText(text)
        // imgref.current.src = "/copied.svg"
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />
            <div>
                <div className="fixed inset-0 z-[-10] h-full w-full flex items-center justify-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

                <div className=" mx-auto max-w-4xl gap-4 text-black">
                    <h1 className='text-green-500 text-3xl font-bold text-center '>
                        Your Personalised Password Manager!
                    </h1>
                    <div className='flex flex-col p-4 gap-4 mycontainer'>

                        <input value={form.site} onChange={handlechange} placeholder='Enter website URL' className='rounded-full cursor-default px-3 py-1 border-2 border-green-500  w-full' type="text" name='site' id='' />
                        <div className='flex gap-8 w-full'>
                            <div className="username w-full">
                                <input value={form.username} onChange={handlechange} placeholder='Enter username' className='rounded-full px-3 py-1 border-2 border-green-500  w-full' type="text" name='username' id='' />
                            </div>

                            <div className="relative w-full">
                                <input ref={passwordref} value={form.password} onChange={handlechange} placeholder='Enter password' className='rounded-full px-3 py-1 border-2 border-green-500  w-full' type="password" name='password' id='' />
                                <span ref={ref} className='absolute right-2 top-[2px]' onClick={showpassword}>
                                    <img width={32} src="src/assets/eye.svg" alt="" />
                                </span>
                            </div>

                        </div>
                        <button onClick={savepassword} className='text-black rounded-full border border-green-500 bg-green-500 px-3 py-1  w-2/5 m-auto flex justify-center items-center gap-4 text-2xl size-34  hover:bg-green-700'>Add Password
                            <lord-icon
                                src="https://cdn.lordicon.com/taymdfsf.json"
                                trigger="click">
                            </lord-icon>
                        </button>
                    </div>

                    <div className="passwords text-white w-full ">
                        <div className='flex justify-center'>
                            <h2 className='py-4 text-2xl'>Your Passwords</h2>
                        </div>
                        {passwordarray.length === 0 && <div>No Passwords</div>}
                        {passwordarray.length != 0 &&
                            <table className="table-auto w-full rounded-lg overflow-hidden">
                                <thead className='bg-green-700'>
                                    <tr className='py-4'>
                                        <th className='border border-white'>Site</th>
                                        <th className='border border-white'>Username</th>
                                        <th className='border border-white'>Password</th>
                                        <th className='border border-white'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {passwordarray.map((item, index) => {
                                        return <tr key={index} className=''>
                                            <td className='text-center w-1/4 border border-white py-2'><a href={item.site} target='_blank'>{item.site}</a></td>
                                            <td className='text-center w-1/4 border border-white py-2'>{item.username}</td>
                                            <td className='text-center w-full border border-white py-4 flex justify-center items-center gap-14'>{"*".repeat(item.password.length)}
                                                <img ref={imgref} onClick={() => { copytext(item.password) }} className='cursor-pointer' id='copyimg' src="src/assets/copy.svg" alt="" />
                                            </td>
                                            <td className='text-center w-1/4 border border-white py-2'>
                                                <span onClick={() => { editpassword(item.id) }} className='mx-3'>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/wuvorxbv.json"
                                                        trigger="click"
                                                        stroke="bold"
                                                        colors="primary:#ffffff,secondary:#16c72e"
                                                    >
                                                    </lord-icon>
                                                </span>
                                                <span onClick={() => { deletepassword(item.id) }} className='mx-3'>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/drxwpfop.json"
                                                        trigger="click"
                                                        stroke="bold"
                                                        colors="primary:#ffffff,secondary:#16c72e"
                                                    >
                                                    </lord-icon>
                                                </span>
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Manager
