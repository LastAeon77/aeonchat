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

type MyFormValues = {
  title: String,
  username: String,
  content: String
}
// const LINK = 'https://worker.siris-mark.workers.dev'

const MakePost: React.FC<{}> = () => {
  const initialValues: MyFormValues = { title: '', username: '', content: '' }
  return (
  <div>
    <h1>Make a Post!</h1>
    <Formik
      initialValues = {initialValues}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          axios.post(`/makepost`, {
            title: values.title,
            username: values.username,
            content: values.content,

          },{headers: {
              'content-type': 'application/json'}}
  
          )
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });

          // alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="username" placeholder="Username" />
          <Field type="text" name="title" placeholder="Title" />
          <Field type="text" name="content" placeholder="Content" />
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