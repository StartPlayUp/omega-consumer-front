import React from "react";
import { Button } from "antd";
import Content from '../ContentPage/Content'
import {
  useMutation,
  useQueryClient,
} from "react-query";
import { useRouter } from "next/router";
import axios from 'axios'

const CommentContainer = ({ commentValue, isOpen, setIsOpen }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { postContent: postUuid } = router.query;
  const { uuid: commentUuid, content } = commentValue;
  const nickname = commentValue.isMember ? commentValue.nickname : "익명 ㅇㅇ"
  const mutation = useMutation(
    ({ commentUuid }) =>
      axios
        .post("/api/comment/deleteMemberComment", {
          commentUuid
        })
        .then((res) => {
          return res.data.data;
        }),
    {
      onMutate: async ({ commentUuid }) => {
        await queryClient.cancelQueries(["getComments", postUuid]);
        const previousValue = queryClient.getQueryData([
          "getComments",
          postUuid,
        ]);
        queryClient.setQueryData(["getComments", postUuid], (old) => {
          console.log(old.comments.filter((i) => i.uuid === commentUuid))
          return {
            comments: old.comments.map((comment) => {
              if (comment.uuid === commentUuid) {
                comment.content = "삭제된 글 입니다."
              }
              return comment;
            })
          };
        });

        return previousValue;
      },
      onError: (err, variables, previousValue) =>
        queryClient.setQueryData(["getComments", postUuid], previousValue),
      onSettled: () => {
        queryClient.invalidateQueries(["getComments", postUuid]);
      },
    }
  );
  return (
    <div className="w-full mt-2 mb-2 border-2 border-black">
      <div className="flex w-full bg-gray-900 bg-opacity-10">
        <div className="ml-3">{nickname}</div>
        <div className="flex justify-end ml-auto mr-5 items-center">
          {isOpen !== undefined && <div className="mr-10">
            <Button onClick={() => {
              if (isOpen.includes(commentUuid)) {
                setIsOpen(isOpen.filter((i) => i !== commentUuid));
              }
              else {
                setIsOpen([...isOpen, commentUuid]);
              }
            }
            }>펼치기({commentValue.childComments.length})</Button>
          </div>}
          <div>
            {mutation.isLoading && <div>loding....</div>}
            {mutation.isError && <div>current error</div>}
            <Button onClick={() => { mutation.mutate({ commentUuid }) }}>삭제</Button>
          </div>
        </div>
      </div>
      <div className="m-2">
        <Content content={content} />
      </div>
      {isOpen && <></>}
    </div >
  );
};

export default CommentContainer;
