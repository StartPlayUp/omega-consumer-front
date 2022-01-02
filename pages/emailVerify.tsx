import type { GetServerSideProps, NextPage } from 'next';
import { Button, Input } from 'antd';
import axios from 'axios';
import wrapper, { SagaStore } from '../store/configureStore';
import { LOAD_MY_INFO_REQUEST } from 'reducer/user';
import { END } from 'redux-saga';
import { useState } from 'react';

const EmailVerify = ({ user }: { user: { email: string } }): any => {
    const [email, setEmail] = useState(user.email)
    const onClickHandler = async (email: string) => {
        const { data: { success, message } } = await axios.post("/api/user/sendVerifyEmail", {
            email
        })
        console.log(message)
        alert(message);
    }
    return (
        <div className="flex flex-col">
            <div className="self-center mx-50">
                <div className="self-center">현재 인증 메일은 {user.email}로 발송되었습니다.</div>
                <div className="flex flex-col">
                    <div className="self-center">인증메일을 받지 못하셨나요?</div>
                    <Input className="h-10 text-center" onChange={(e) => setEmail(e.target.value)} placeholder={email}></Input>
                    <div >메일 주소 변경 하려면 위 이메일 주소를 바꿔주세요.</div>
                    <Button type="primary" block onClick={() => onClickHandler(email)}>{email} 로 인증메일 재전송</Button>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async ({ req }): Promise<any> => {
    const cookie = req ? req.headers.cookie : '';
    axios.defaults.headers.common['Cookie'] = '';
    if (req && cookie) {
        axios.defaults.headers.common['Cookie'] = cookie;
    }
    store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
    });
    store.dispatch(END);
    await (store as SagaStore).sagaTask.toPromise();
    try {
        const { data: { success, data: { user } } } = await axios.get("/api/user/getUser");
        if (success && !user.isVerified) {
            return {
                props: {
                    user,
                },
            };
        } else {
            return {
                redirect: {
                    permanent: false,
                    destination: "/",
                },
            };
        }
    } catch (err) {
        console.log("post get error : ", err);
        console.log("서버가 이상이 생겨 포스트를 못가져옴");
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
        };
    }
});

export default EmailVerify
