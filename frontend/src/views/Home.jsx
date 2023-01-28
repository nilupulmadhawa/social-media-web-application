import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useAuthContext } from "../context/AuthContext"
import { usePostData } from "../hooks/usePostData"

import Feeds from "../components/Feeds";
import FeedLoading from "../components/FeedLoading";
import FeedUpload from "../components/FeedUpload";

export default function Home() {
    const { user } = useAuthContext();
    const { isLoading, error, data } = usePostData();
    const [posts, setPosts] = React.useState(data)

    useEffect(() => {
        setPosts(data)
    }, [data])

    return (<div className="flex ">
        <div className="w-1/4 flex justify-end ">
            {/* <Link to="/" className=" mt-10 fixed">
                <img src="../assets/logo.png" alt="logo" className="w-60" />
            </Link> */}

        </div>
        <div className="w-1/2 flex justify-center">
            <div className="page-content pt-6 h-full w-full">
                <div className="container mx-auto flex justify-center h-full">
                    <div className=" w-8/12 pr-4">
                        <FeedUpload />
                        <select class="text-xl mb-4 focus:outline-none" defaultValue={'Newest'}>
                            <option>Newest</option>
                            <option>Featured</option>
                            <option>Popular</option>
                            <option>Unpopular</option>
                        </select>

                        {isLoading && <FeedLoading />}
                        {posts && posts.map((item) =>
                            <Feeds
                                key={item._id}
                                id={item._id}
                                likes={item.likes}
                                created_at={item.created_at}
                                userName={"u__graphics"}
                                imageUrl={item.image_url}
                            />
                        )}

                    </div>

                </div>
            </div>
        </div>
        <div className="w-1/4 flex justify-strat">
            <Link to={'/profile'}>
                <div className=" h-screen overflow-visible h-full  mt-10">
                    <div className="fixed flex flex-col items-center pt-3 mb-4">
                        <div className="avatar rounded-full overflow-hidden mr-3">
                            <img width="75px" height="75px" src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80" alt="" />
                        </div>
                        <div className="user-name text-center">
                            <span className="text-2xl font-semibold">{user.first_name + " " + user.last_name}</span>
                            <span className="text-lg text-gray-600  block">{user.username}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    </div>
    )
}
