import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useAuthContext } from "../context/AuthContext"
import { usePostData, useSortPostData } from "../hooks/usePostData"
import Loading from 'react-fullscreen-loading';

import Feeds from "../components/Feeds";
import FeedLoading from "../components/FeedLoading";
import FeedUpload from "../components/FeedUpload";

export default function Home() {
    const { user } = useAuthContext();
    const spost = useSortPostData();
    const { isLoading, error, data } = usePostData();
    const [posts, setPosts] = useState(data)
    const [sort, setSort] = useState("Newest")

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setPosts(data)
    }, [data])


    const dynamicSort = (property) => {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            /* next line works with strings and numbers, 
             * and you may want to customize it to your needs
             */
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }


    useEffect(() => {
        // setLoading(true)
        console.log(sort);
        let p = posts;
        if (sort == "Newest") {
            setPosts(data)

        }
        if (sort == "Oldest") {
            setPosts(spost.data)
        }
        if (sort == "Popular") {
            // setPosts(p.sort((a, b) => parseFloat(a.likes.length) - parseFloat(b.likes.length)))
            setPosts(p.sort(function (a, b) {
                return parseFloat(a.likes.length) - parseFloat(b.likes.length)
            }))
        }
    }, [sort])

    return (<div className="flex ">
        <Loading loading={loading} background="#ffffffb8" loaderColor="#ec4b4a" />
        <div className="w-1/4 flex justify-end ">
        </div>
        <div className="w-1/2 flex justify-center">
            <div className="page-content pt-6 h-full w-full">
                <div className="container mx-auto flex justify-center h-full">
                    <div className=" w-8/12 pr-4">
                        <FeedUpload />
                        <select className="text-xl mb-4 focus:outline-none px-5" defaultValue={'Newest'} onChange={(e) => setSort(e.target.value)}>
                            <option>Newest</option>
                            <option >Oldest</option>
                            {/* <option>Popular</option> */}
                        </select>

                        {isLoading && <FeedLoading />}
                        {posts && posts.map((item) =>
                            <Feeds
                                key={item._id}
                                id={item._id}
                                likes={item.likes}
                                created_at={item.created_at}
                                userName={item.user_id.username}
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
                            <img width="75px" height="75px" src={user.photo_url} alt="" />
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
