import React from 'react';
import { getRessources } from '../services/api_services'
import FormPost from '../components/FormPost';
export default class Admin extends React.Component{

    constructor(props) {
        super(props);
        this.state = { posts: [], selectedPost: null, showForm:false}
    }

    componentDidMount() {
      this.refresh();
    }

    refresh(){
        getRessources("post").then(result => {
                this.setState({ posts: result});
        });
    }

render(){
    return(
        <div className="row" style={{flexDirection:"column"}}>
            <h2>Admin</h2>
            {!this.state.showForm&&
            <button style={{}} onClick={()=>this.setState({showForm:true})}>New Post</button>
            }


            {this.state.showForm ? <FormPost data={this.state.selectedPost}
            onHide={()=>this.setState({selectedPost:null,showForm: false})}
            refresh={()=>this.refresh()}/>
            :
            this.state.posts.map((item,index)=>{
                return <button key={index}
                style={{
                    padding:10,
                    margin:10,
                    textAlign:'left',
                    alignItems:'center',
                    display:'flex'
                }}
                onClick={()=>this.setState({selectedPost:item,showForm:true})}
                >
                    <img src={item.image ? item.image : "/logo192.png"}
                    style={{width:35,height:35,marginRight:10}}></img>
                    {item.title}-{item.title_description}
                </button>
            })}
        </div>
    );
}
};