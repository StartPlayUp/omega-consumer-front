import SearchComponent from './SearchComponent';
import UserComponent from './UserComponent';
import { useQuery } from 'react-query'
import axios from 'axios';
import { useRouter } from "next/router";

const AdminPage = () => {
    const router = useRouter();
    const { postContent } = router.query;
    const { isLoading, refetch, error, data } = useQuery(['getPosts', ""], () =>
        axios.get(`/api/post/getPosts`)
            .then(res => {
                return res.data.data
            })
        , {
            enabled: false
        }
    )
    const onSearchHandler = () => {
        refetch();
    }
    return (
        <div className=" w-full m-10" >
            <div className=" w-full" >
                <SearchComponent onSearchHandler={onSearchHandler} loading={isLoading} />
            </div>
            <div>
                {data && <UserComponent users={data.posts} />}
            </div>
        </div>
    )
}

export default AdminPage