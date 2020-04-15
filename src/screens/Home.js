import React from 'react';
import Post from '../components/Post'
import { getRessources } from '../services/api_services';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = { posts: [], firstPost: null }
    }

    componentDidMount() {
        getRessources("post").then(result => {
            if (result.length > 0) {
                let posts = result.slice();
                posts = posts.sort((a, b) => {return (new Date(b.created)).getTime() - (new Date(a.created)).getTime()});
                this.setState({ posts: posts, firstPost: result[0] });
            }

        });
    }

    render() {
        return (
            <div className="row">
                <div className="leftcolumn">
                    {this.state.posts.map((item, index) => {
                        return <Post
                            key={index}
                            data={item}
                            displayText={true}
                        ></Post>
                    })}
                </div>
                <div className="rightcolumn">
                    {this.state.firstPost &&
                        <Post
                            data={this.state.firstPost}
                            displayText={false}
                        ></Post>
                    }
                    <div className="card">
                        <h3>Popular Post</h3>
                        {this.state.posts.map((item, index) => {
                            return <Post
                                key={index}
                                data={item}
                                displayText={false}
                            ></Post>
                        })}
                    </div>
                    <div className="card">
                        <h3>Follow me...</h3>
                        <p>Some text...</p>
                    </div>
                </div>
            </div>
        );
    };
}