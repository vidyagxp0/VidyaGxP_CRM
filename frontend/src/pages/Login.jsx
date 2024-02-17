
import {  useSelector } from 'react-redux';

import useLanguage from '@/locale/useLanguage';

import { Form } from 'antd';

import { selectAuth } from '@/redux/auth/selectors';
import LoginForm from '@/forms/LoginForm';
import Loading from '@/components/Loading';
import AuthModule from '@/modules/AuthModule';

import React from 'react';


const LoginPage = () => {
  const translate = useLanguage();
  const { isLoading, isSuccess } = useSelector(selectAuth);

  const FormContainer = () => {
    return (
      <Loading isLoading={isLoading}>
        <Form
          layout="vertical"
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={()=>{}}
        >
          <LoginForm />
          <Form.Item>
            {translate('Or')} <a href="/register">{translate('register now')}!</a>
          </Form.Item>
        </Form>
      </Loading>
    );
  };

  return <AuthModule authContent={<FormContainer />} AUTH_TITLE="Log in" />;
};

export default LoginPage;
