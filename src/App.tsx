import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { PostShow } from './components/display_posts'
import MakePost from './components/make_post';
import {post} from './types'
axios.defaults.baseURL = 'https://worker.siris-mark.workers.dev';



function App() {
  const [data, setCount] = React.useState<post>()
  return (
    <div className="App">
      <MakePost set_post = {setCount} new_post = {data}/>
      <PostShow set_post = {setCount} new_post = {data}/>
    </div>
  );
}

export default App;
