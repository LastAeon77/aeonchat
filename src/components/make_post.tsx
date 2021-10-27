import * as React from 'react';
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from 'formik';
import axios from "axios";
import { post } from "../types"
import * as Yup from 'yup';

type income_data = {
  new_post: post | undefined,
  set_post: React.Dispatch<React.SetStateAction<post | undefined>>
}
type errors = {
  titles?:String,
  username?:String,
  content?:String
}

const DisplayingErrorMessagesSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  title: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  content: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

// const LINK = 'https://worker.siris-mark.workers.dev'

const MakePost = ({ new_post, set_post }: income_data) => {
  const initialValues: post = { title: '', username: '', content: '' }
  return (
    <div>
      <h1>Make a Post!</h1>
      <Formik

        initialValues={initialValues}
        validationSchema = {DisplayingErrorMessagesSchema}
        // validate={values => {
        //   const errors:errors = {};
        //   if (!values.title) {
        //     errors.titles = 'Required';
        //   } 
        //   else if (!values.username){
        //     errors.username = 'Required'
        //   }
        //   else if (!values.content){
        //     errors.content = 'Required'
        //   }
        //   return errors;
        // }}
        onSubmit={(values, { setSubmitting }) => {
          // setTimeout(() => {
          axios.post(`/makepost`, {
            title: values.title,
            username: values.username,
            content: values.content,

          }, {
            headers: {
              'content-type': 'application/json'
            }
          }

          ).then(function (response) {
            if (values) {
              set_post(values)
            }

            console.log(response);
          }).catch(function (error) {
            console.log(error);
          });

          setSubmitting(false);
          // }, 400);
          values.title = '';
          values.username = '';
          values.content = '';
        }}
      >
        {({ isSubmitting,errors }) => (
          <Form>
            <div>
            <Field type="text" name="username" placeholder="Username" error={errors.username}/>
            <span>{errors.username}</span>
            </div>
            <div>
            <Field type="text" name="title" placeholder="Title" error={errors.title}/>
            <span>{errors.title}</span>
            </div>
            <div>
            <Field type="text" name="content" placeholder="Content" error={errors.content}/>
            <span>{errors.content}</span>
            </div>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
};

export default MakePost;