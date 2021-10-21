import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import PostShow from './components/display_posts'
import MakePost from './components/make_post';

axios.defaults.baseURL = 'https://worker.siris-mark.workers.dev';

function App() {
  return (
    <div className="App">
      <MakePost />
      <PostShow />
    </div>
  );
}

export default App;
