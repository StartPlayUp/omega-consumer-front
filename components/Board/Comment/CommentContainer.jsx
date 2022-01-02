import React, { useState } from "react";
import Comment from "../Comment/Comment";
import WriteComment from "../Comment/WriteComment";
import { useQuery } from "react-query";
import axios from "axios";
import { useRouter } from "next/router";

const CommentContainer = () => {
    const router = useRouter();
    const { postContent } = router.query;
    const [isOpen, setIsOpen] = useState([]);
    const { isLoading, error, data, isFetching } = useQuery(["getComments", postContent], () =>
        axios
            .get(
                `/api/comment/getComments?postUuid=${postContent}`
            )
            .then((res) => {
                return res.data.data;
            })
    );
    console.log("isFetching", isFetching, isOpen);
    if (isLoading) return "Loading...";
    if (error) return "An error has occurred: " + error.message;
    return (
        <>
            {data &&
                data.comments.map((value, index) => (
                    <div key={index}>
                        <Comment
                            key={index}
                            commentValue={value}
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                        />
                        {isOpen.includes(value.uuid) && <>
                            {value.childComments.map((chileValue, chileIndex) => (
                                <div key={chileIndex} className="ml-10">
                                    <Comment
                                        key={chileIndex}
                                        commentValue={chileValue}
                                    />
                                </div>
                            ))}
                            <div className="ml-10">
                                <WriteComment parentUuid={value.uuid} />
                            </div>
                        </>}
                    </div>
                ))}
        </>
    );
}
export default CommentContainer;