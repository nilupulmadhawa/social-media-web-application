import React from 'react'
import { useAuthContext } from '../context/AuthContext'
import { useMyPost } from '../hooks/useMyPost';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useAlert } from 'react-alert'

import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Profile() {
    const { user } = useAuthContext();
    const { isLoading, mutate: deletePost, data } = useMyPost();

    const alert = useAlert();
    const _deletePost = (id) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to delete.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        deletePost(id);
                        alert.success('Post deleted successfully');
                    }
                },
                {
                    label: 'No',
                }
            ]
        });
    }

    return (
        <div className=" h-auto px-48 flex flex-col justify-center mt-5">
            <div className="flex flex-row justify-center">
                <div className="p-4 text-center flex justify-center">
                    <button
                        className="flex rounded-full "
                        id="user-menu"
                        aria-label="User menu"
                        aria-haspopup="true"
                    >
                        <img
                            className="h-40 w-40 rounded-full"
                            src={user.photo_url}
                            alt
                        />
                    </button>
                </div>
                <div className="text-left ml-4 flex flex-col justify-center">
                    <div className="text-left flex aline-center">
                        <span className="text-lg font-bold text-gray-700 mr-2">{user.first_name + " " + user.last_name}</span>
                    </div>
                    <div className="text-left">
                        <span className="text-base text-gray-700 text-2xl mr-2">{user.username}</span>

                    </div>
                    <div className="text-left">
                        <span className="text-base font-semibold text-gray-700 mr-2">
                            <b>{data?.length}</b> posts
                        </span>
                    </div>
                </div>


            </div>


            <div className="flex  justify-center">

                <hr className="border-gray-500 mt-6 mb-6 w-8/12" />
            </div>
            <div className="flex  justify-center">
                <div className="grid grid-cols-3 gap-4 w-8/12">
                    {data && data.map((post) => (
                        <div className="flex-1 text-center px-4 py-2 m-2 group relative block overflow-hidden rounded-md transition-all duration-500">

                            <LazyLoadImage
                                key={post._id}
                                alt={"image"}
                                src={post.image_url} // use normal <img> attributes as props
                                width="100%"
                                placeholderSrc="./assets/gray.png"
                                className="object-cover aspect-square w-full" />
                            <div className="absolute -bottom-52 group-hover:bottom-2 right-2 left-2 transition-all duration-500 bg-white dark:bg-[#ffffffb8] p-4 rounded shadow dark:shadow-gray-">
                                <button onClick={() => _deletePost(post._id)}>
                                    <FontAwesomeIcon icon={regular('trash-can')} className="h-7 w-7 mx-5 flex text-center text-[#ec4b4a]" />
                                </button>
                            </div>
                        </div>
                    ))
                    }
                    {!data && <span className="text-lg font-bold text-gray-700 mr-2">Posts Not Found</span>}
                </div>
            </div>
        </div>
    )
}
