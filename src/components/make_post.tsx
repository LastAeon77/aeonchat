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
import {post} from "../types"

type income_data = {
  new_post: post |undefined,
  set_post: React.Dispatch<React.SetStateAction<post|undefined>> 
}


// const LINK = 'https://worker.siris-mark.workers.dev'

const MakePost = ({ new_post, set_post }:income_data) => {
  const initialValues: post = { title: '', username: '', content: '' }
  return (
    <div>
      <h1>Make a Post!</h1>
      <Formik
        initialValues={initialValues}
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
              if(values)
              {
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