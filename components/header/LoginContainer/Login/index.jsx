import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginRequestAction } from "../../../../reducer/user";
import { Form, Input, Button } from "antd";
const Login = () => {
  const dispatch = useDispatch();
  const { logInLoading, logInError } = useSelector((state) => state.user);

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

  const onSubmitForm = useCallback((values) => {
    const { id, password } = values;
    console.log(id, password);
    dispatch(loginRequestAction({ id, password }));
  }, [dispatch]);
  // 시도해보기
  return (
    <>
      <div>로그인 입니다</div>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onSubmitForm}
      >
        <Form.Item
          label="ID"
          name="id"
          rules={[
            {
              required: true,
              message: "아이디를 작성해주십시오.",
            },
          ]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "비밀번호를 작성해주십시오.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" loading={logInLoading}>
            로그인
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
