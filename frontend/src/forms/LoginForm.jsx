
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 5px;
  margin-bottom: 10px;


label {
  margin-bottom: 3px;
  font-size: 16px;
}

.input-field {
  padding: 8px;
  margin-bottom: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  height: 42px;
}

input[checkbox] {
  margin-right: 5px;
}

button {
  width: 100%;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
      background-color: #0056b3;
  }
}

.error {
  color: red;
}
`


import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login } from '@/redux/auth/actions';
import { selectAuth } from '@/redux/auth/selectors';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { isLoading, isSuccess } = useSelector(selectAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(login({ loginData: values }));
    navigate('/');
  };

  // useEffect(() => {
  //   if (isSuccess) 
  // }, [isSuccess]);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });
  return (
    <Wrapper>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={onFinish}
      >
        {({ isSubmitting }) => (
          <Form>
             <label>Email 
         <span style={{color: 'red'}}>*</span>
       </label>
            <div>
            <Field className='input-field' type="email" name="email" placeholder="Email" />
            <ErrorMessage className='error' name="email" component="div" />
            </div>
            <label>Password 
         <span style={{color: 'red'}}>*</span>
       </label>
       <div>
            <Field className='input-field' type="password" name="password" placeholder="Password" />
            <ErrorMessage className='error' name="password" component="div" />
       </div>

            <button type="submit" disabled={isSubmitting}>
              Login
            </button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};


export default LoginForm;