import { useEffect, useState } from 'react'
import Loading from 'react-fullscreen-loading';

import { storage } from '../services/firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { useAlert } from 'react-alert'
import { useAuthContext } from '../context/AuthContext'
import { updateUser } from '../services/user'

export default function ProfileEdit() {
    const { user, setUser } = useAuthContext();
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [uname, setUsername] = useState('')
    const alert = useAlert()

    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null)
    useEffect(() => {
        setFname(user.first_name)
        setLname(user.last_name)
        setUsername(user.username)
    }, [user])

    const onEdit = async (e) => {
        e.preventDefault()


        const data = {
            id: user._id,
            first_name: fname,
            last_name: lname,
            username: uname,
        }

        await updateUser(data).then((res) => {
            if (res.success) {
                // console.log(res);
                setUser(res.data)
                alert.success(res.message);
            } else {
                alert.error(res.message);
            }
        })
    }

    const uploadFile = async () => {

        setLoading(true);
        if (file == null) {
            alert.error("Please select a file to upload");
            return;
        }
        if ("jpg|jpeg|png|svg".indexOf(file.type.split("/")[1]) == -1) {
            alert.error("Please select a valid image file");
            return;
        }
        const name = new Date().getTime() + file.name;
        const storageRef = ref(storage, name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        await uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        // console.log("Upload is paused");
                        break;
                    case "running":
                        // console.log("Upload is running");
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    await updateUser({ id: user._id, photo_url: downloadURL }).then((res) => {
                        if (res.success) {
                            // console.log(res);
                            setUser(res.data)
                            alert.success("Profile picture updated successfully");
                        } else {
                            alert.error(res.message);
                        }
                        setLoading(false);
                    })
                });
            }
        );
    };

    useEffect(() => {
        if (file != null) {

            uploadFile();
        }
    }, [file])

    const changePassword = () => {
        alert.info("This feature is not available yet");
    }

    return (
        <div className=' flex justify-center'>

            <Loading loading={loading} background="#ffffffb8" loaderColor="#ec4b4a" />
            <div className='w-7/12'>
                <form onSubmit={onEdit}>
                    <div className="grid grid-flow-row auto-rows-max divide-y">
                        <div className="row-auto">
                            <div className="my-auto">
                                <ul
                                    role="list"
                                    className="p-6 divide-y divide-slate-200"
                                >
                                    <li className="flex py-4 first:pt-0 last:pb-0 items-center ">
                                        <div className="relative">
                                            <label for="dropzone-file" >

                                                <img
                                                    className="w-20 h-20 rounded-full object-cover hover:shadow hover:opacity-75 transition duration-300 ease-in-out cursor-pointer border-2 border-slate-200 hover:border-red-600"
                                                    src={user.photo_url}
                                                    alt=""
                                                />
                                            </label>
                                            <input
                                                id="dropzone-file"
                                                type="file"
                                                className="hidden"
                                                accept=".jpg,.jpeg,.png,.SVG"
                                                onChange={async (e) =>
                                                    setFile(e.target.files[0])} />
                                        </div>
                                        <div className="ml-3 overflow-hidden">
                                            <p className="text-lg font-medium text-slate-900">
                                                {user.first_name} {user.last_name}
                                            </p>
                                            <p className="text-sm text-slate-500 truncate">
                                                {user.email}
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="row-auto ">
                            <div className="my-auto p-6">
                                <div className="items-center md:flex md:items-center pb-2">
                                    <div className="flex w-full ">
                                        <div className="flex items-center md:w-1/6">
                                            <label
                                                className="block text-base text-slate-700 font-medium md:mb-0"
                                                for="inline-password"
                                            >
                                                First Name
                                            </label>
                                        </div>
                                        <div className="md:w-2/3">
                                            <input
                                                className="shadow-sm py-2 px-4 bg-white border border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                                id="first-name"
                                                type="text"
                                                placeholder="First Name"
                                                onChange={(e) => setFname(e.target.value)}
                                                value={fname}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex w-full">
                                        <div className="flex items-center md:w-1/6">
                                            <label
                                                className="block text-base text-slate-700 font-medium md:mb-0"
                                                for="inline-password"
                                            >
                                                Last Name
                                            </label>
                                        </div>
                                        <div className="md:w-2/3">
                                            <input
                                                className="shadow-sm py-2 px-4 bg-white border border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                                id="last-name"
                                                type="text"
                                                onChange={(e) => setLname(e.target.value)}
                                                placeholder="Last Name"
                                                value={lname}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="items-center md:flex md:items-center pb-2">
                                    <div className="flex w-full ">
                                        <div className="flex items-center md:w-1/6">
                                            <label
                                                className="block text-base text-slate-700 font-medium md:mb-0"
                                                for="user-name"
                                            >
                                                Username
                                            </label>
                                        </div>
                                        <div className="md:w-2/3">
                                            <input
                                                className="shadow-sm py-2 px-4 bg-white border border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                                id="user-name"
                                                type="text"
                                                placeholder="Username"
                                                onChange={(e) => setUsername(e.target.value)}
                                                value={uname}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex w-full">
                                        <div className="flex items-center md:w-1/6">
                                            <label
                                                className="block text-base text-slate-700 font-medium md:mb-0"
                                                for="email"
                                            >
                                                Email
                                            </label>
                                        </div>
                                        <div className="md:w-2/3">
                                            <input
                                                className="shadow-sm py-2 px-4 bg-gray border border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                                id="email"
                                                type="email"
                                                placeholder="Email"
                                                disabled
                                                value={user.email}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Change Profile
                        </button>
                    </div>
                </form>
                <hr className="my-2" />
                {/* change password title */}
                <h1 className="text-xl font-bold">Change Password</h1>
                <form onSubmit={changePassword}>
                    <div className="grid grid-flow-row auto-rows-max divide-y">
                        <div className="row-auto">
                            <div className="my-auto p-6">
                                <div className="flex w-full pb-2">
                                    <div className="flex items-center md:w-2/12">
                                        <label className="flex items-center mb-2">
                                            <span className="block text-base font-medium text-slate-700">
                                                Current Password
                                            </span>
                                        </label>
                                    </div>
                                    <div className="md:w-1/3">
                                        <input
                                            className="shadow-sm py-2 px-4 bg-white border border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                            id="password"
                                            name="cPassword"
                                            type="password"
                                            placeholder="******************"
                                        />
                                    </div>
                                </div>
                                <div className="flex w-full pb-2">
                                    <div className="flex items-center md:w-2/12">
                                        <label className="flex items-center mb-2">
                                            <span className="block text-base font-medium text-slate-700">
                                                New Password
                                            </span>
                                        </label>
                                    </div>
                                    <div className="md:w-1/3">
                                        <input
                                            className="shadow-sm py-2 px-4 bg-white border border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                            id="password"
                                            name="nPassword"
                                            type="password"
                                            placeholder="******************"
                                        />
                                    </div>
                                </div>
                                <div className="flex w-full pb-2">
                                    <div className="flex items-center md:w-2/12">
                                        <label className="flex items-center mb-2">
                                            <span className="block text-base font-medium text-slate-700">
                                                Repeat Password
                                            </span>
                                        </label>
                                    </div>
                                    <div className="md:w-1/3">
                                        <input
                                            className="shadow-sm py-2 px-4 bg-white border border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                            id="password"
                                            name="rPassword"
                                            type="password"
                                            placeholder="******************"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Change Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
