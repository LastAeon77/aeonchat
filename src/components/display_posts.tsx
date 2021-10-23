import axios from "axios";
import React, { Component } from "react";
import {income_data,post} from "../types"

type num = {
    name: string
}
// type PostState = {
//     posts: Array<num>
//     dat?: any
// }

// const LINK = 'https://worker.siris-mark.workers.dev'
// export default class PostShow extends Component<{}, PostState> {
//     constructor(props: BigInteger) {
//         super(props)
//         this.state = {
//             posts: [],
//         }

//     }
//     componentDidMount() {
//         axios.get(`/keys`).then(res => this.setState({ posts: res.data as num[] })).catch(err => console.log(err));
//     }
//     componentDidUpdate() {
//         // axios.get(`${LINK}/keys`).then(res => this.setState({ posts: res })).catch(err => console.log(err));
//     }

//     render() {
//         let r = []
//         let posts = this.state.posts
//         for (let i = 0; i < posts.length; i++) {
//             r.push(<DisplayPosts dat={posts[i]} />)
//         }
//         return (
//             <div>
//                 {r}
//             </div>)


//     }
// }


export const PostShow = ({ new_post, set_post }:income_data) => {
    const [keys, setKeys] = React.useState<num[]>()
    React.useEffect(function(){
        axios.get(`/keys`).then(res => setKeys(res.data as num[])).catch(err => console.log(err));
    },[new_post])
    let r = []
    if (keys)
    {
        for (let i = 0; i < keys.length; i++) {
            r.push(<DisplayPosts dat={keys[i]} />)
        }
        return (
            <div>
                {r}
            </div>)
    }
    else
    {
        return <div></div>
    }


    
}




const DisplayPosts = (props: any) => {
    const [post, setPost] = React.useState<post | null>(null)
    React.useEffect(() => {
        axios.get(`/get/${props.dat.name}`).then(res => { setPost(res.data as post) }).catch(err => console.log(err));

    }, []);
    if (!post) return null
    console.log(post)
    return (<div>
        <h3>"{post.title}" by {post.username}</h3>
        <p>{post.content}</p>
    </div>)
}