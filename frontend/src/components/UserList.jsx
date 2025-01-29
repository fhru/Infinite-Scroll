import axios from 'axios'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

function UserList() {

    const [users, setUsers] = useState([])
    const [lastId, setLastId] = useState(0)
    const [tempId, setTempId] = useState(0)
    const [limit, setLimit] = useState(20)
    const [keyword, setKeyword] = useState('')
    const [hasMore, setHasMore] = useState(true)
    const [query, setQuery] = useState('')

    useEffect(() => {
        getUsers();
    }, [lastId, keyword])

    const getUsers = async () => {
        const response = await axios.get(`http://localhost:5000/users?search_query=${keyword}&lastId=${lastId}&limit=${limit}`);
        const newUsers = response.data.result;
        setUsers([...users, ...newUsers]);
        setTempId(response.data.lastId);
        setHasMore(response.data.hasMore);
    }

    const fetchMore = () => {
        console.log('Fetch more called');
        setLastId(tempId);
    }

    const searchData = (e) => {
        e.preventDefault()
        setLastId(0);
        setUsers([]);
        setKeyword(query);
    }

    return (
        <div className="flex container mx-auto p-12 flex-col">
            <form className="flex w-full mb-12" onSubmit={searchData}>
                <input
                    type="text"
                    placeholder="Search Something Here..."
                    className="py-2.5 px-4 w-full outline-none rounded rounded-e-none bg-gray-900"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)} />
                <button
                    type="submit"
                    className="py-2.5 px-4 bg-blue-950 rounded font-medium text-blue-500 hover:bg-blue-900 transition-all rounded-s-none">
                    Search
                </button>
            </form>

            <InfiniteScroll
                dataLength={users.length}
                next={fetchMore}
                hasMore={hasMore}
                loader={<span className='text-lg'>Loading...</span>}
            >
                <table className="table-auto border-collapse border border-slate-500 w-full">
                    <thead>
                        <tr>
                            <th className="border border-gray-700 bg-gray-900 p-2">No</th>
                            <th className="border border-gray-700 bg-gray-900 p-2">ID</th>
                            <th className="border border-gray-700 bg-gray-900 p-2">Name</th>
                            <th className="border border-gray-700 bg-gray-900 p-2">Email</th>
                            <th className="border border-gray-700 bg-gray-900 p-2">Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td className="border border-gray-700 p-2">{index + 1}</td>
                                    <td className="border border-gray-700 p-2">{user.id}</td>
                                    <td className="border border-gray-700 p-2">{user.name}</td>
                                    <td className="border border-gray-700 p-2">{user.email}</td>
                                    <td className="border border-gray-700 p-2">{user.gender}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </InfiniteScroll>
        </div>
    )
}

export default UserList
