import React from 'react';
import RichTextEditor from 'react-rte';
import { updateRessource, createRessource, deleteRessource } from '../services/api_services';

export default class FormPost extends React.Component {
    constructor(props) {
        super(props);
        if (props.data) {
            this.state = Object.assign({ image: null }, props.data);
            this.state.contenu = RichTextEditor.createValueFromString(this.state.contenu, "html");
        } else {
            this.state = { title: "", title_description: "", contenu: RichTextEditor.createEmptyValue(), image: null };
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.data && this.props.data != nextProps.data) {
            Object.assign(nextState, nextProps.data);
        }
        return true;
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleFileChange(event) {
        const { target } = event;
        const { files } = target;
        if (files && files[0]) {
            var reader = new FileReader();
            reader.onload = event => {
                this.setState({ image: event.target.result });
            };
            reader.readAsDataURL(files[0]);
        }
    }

    save(e) {
        e.preventDefault();
        let postData = Object.assign({}, this.state);
        postData.contenu = postData.contenu.toString('html');
        if (this.props.data) {
            delete postData.__v;
            delete postData._id;
            postData.updated= new Date();
            updateRessource("post",this.props.data._id,postData).then(result=>{
                alert("enregistrement effectué");
                this.props.refresh();
            });
        } else {
            createRessource("post",postData).then(result =>{
                alert("Enregistrement effectué.");
                this.props.refresh();
                this.props.onHide();
            })
        }
    }

    cancel(e) {
        e.preventDefault();
        this.props.onHide();
    }

    delete(e) {
        e.preventDefault();
        deleteRessource("post",this.props.data._id).then(result=>{
            alert("Supression effectué.");
            this.props.refresh();
            this.props.onHide();
        });
    }

    render() {
        return (
            <form style={{ flexDirection: "row", display: "flex", padding: 10, flex: 1 }}>
                <div style={{ flexDirection: "column", display: 'flex', justifyContent:"center",alignItems:"center" }}>
                    <img src={this.state.image ? this.state.image : "/logo192.png"} alt="logo"
                        className={"imagePost"}></img>
                    <input type="file"
                        accept="image/*"
                        style={{overflow:"hidden",width:"150px",marginTop:10,marginBottom:10}}
                        onChange={this.handleFileChange.bind(this)}></input>
                </div>
                <div style={{ flexDirection: "column", display: "flex", flex: 1 }}>
                    <input name="title" value={this.state.title} onChange={this.onChange.bind(this)}>
                    </input>
                    <input name="title_description" value={this.state.title_description} onChange={this.onChange.bind(this)}>
                    </input>

                    <RichTextEditor name="contenu" style={{ flex: 1 }} value={this.state.contenu}
                        onChange={(value) => this.setState({ contenu: value })}>
                    </RichTextEditor>
                    <div style={{marginTop:10}}>
                        <button onClick={this.save.bind(this)}>Valider</button>
                        {this.props.data &&
                        <button onClick={this.delete.bind(this)}>Supprimer</button>
                    }
                        <button onClick={(e) => this.cancel(e)}>Annuler</button>
                    </div>
                </div>
            </form>
        );
    }


}