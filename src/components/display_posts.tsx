import axios from "axios";
import React, { Component } from "react";


type num = {
    name: string
}
type post = {
    title: string
    username: string
    content: string

}
type PostState = {
    posts: Array<num>
    dat?: any
}

// const LINK = 'https://worker.siris-mark.workers.dev'
export default class PostShow extends Component<{}, PostState> {
    constructor(props: BigInteger) {
        super(props)
        this.state = {
            posts: [],
        }

    }
    componentDidMount() {
        console.log(`/keys`)
        axios.get(`/keys`).then(res => this.setState({ posts: res.data as num[] })).catch(err => console.log(err));

    }
    componentDidUpdate() {
        // axios.get(`${LINK}/keys`).then(res => this.setState({ posts: res })).catch(err => console.log(err));
    }

    render() {
        let r = []
        let posts = this.state.posts
        for (let i = 0; i < posts.length; i++) {
            r.push(<DisplayPosts dat={posts[i]} />)
        }
        return (
            <div>
                {r}
            </div>)


    }
}

const DisplayPosts = (props: any) => {
    console.log(props.dat.name)
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