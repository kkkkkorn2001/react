import React from 'react';
import folderimg from './folder.jpg'
import Photo from './Photo';
export default class Folder extends React.Component{
    constructor(props){
        super(props);
        this.imgSrc = "";
        this.displayData = [];
        this.data = props.data;
        this.state = {
            showdata : this.displayData,
            pos : props.pos,
            pos_now : undefined
        }
    }
    findPosNow(key){
        console.log("find",key)
        if(key){
            if(key.length === 1){
                if(key[0] === 'index' || key[0] === 'test' || key[0] === 'train'){
                    return this.data.find(x=>x.title === key[0]).children
                }else if(key[0].indexOf('.jpg') !== -1){
                    let a = key[0].replace('.','').replaceAll('/','-').split('-')
                    this.findPosNow(a)
                }else if(key[0].indexOf('.csv') !== -1){
                    return []
                }
            }else if(key.length === 2){
                return this.data.find(x=>x.title === key[0]).children.find(x=>x.title === key[1]).children
            }else if(key.length === 3){
                return this.data.find(x=>x.title === key[0]).children.find(x=>x.title === key[1]).children.find(x=>x.title === key[2]).children
            }else if(key.length === 4){
                return this.data.find(x=>x.title === key[0]).children.find(x=>x.title === key[1]).children.find(x=>x.title === key[2]).children.find(x=>x.title === key[3]).children
            }else if(key.length === 5){
                this.imgSrc = this.data.find(x=>x.title === key[0]).children.find(x=>x.title === key[1]).children.find(x=>x.title === key[2]).children.find(x=>x.title === key[3]).children.find(x=>x.title === key[4]).name
            }
        }
        return undefined
    }
    Onclick(item,key){
        let k = key
        this.setState({pos : key})
        console.log(item,key)
        this.setState({pos_now : this.findPosNow(k.split("-"))})
    }
    appendData(title,key) {
        this.displayData.push(
            <div key = {title} onClick = {()=>this.Onclick(title,key)}>
                <pre>
                    <img className ="rounded mx-auto d-block" src = {folderimg} alt = '' width = '50px'/>
                    <div>{title}</div>
                </pre>
            </div>,
        );
        this.setState({
           showdata : this.displayData,
           postVal : ""
        });
    }
    shouldComponentUpdate(nextProps,newState){
        if(nextProps.pos !== this.props.pos){
            this.displayData = []
            this.imgSrc = ""
            let key = nextProps.pos
            console.log("key : ",key ,'nextprops : ',nextProps.key)
            if(nextProps.pos ){
                this.findPosNow(key.split('-')).map(item=>this.appendData(item.title,item.key))
            }
            console.log("props")
        }
        if(newState.pos_now !== this.state.pos_now && newState.pos_now){
            this.displayData = []
            newState.pos_now.map(item=>this.appendData(item.title,item.key))
            console.log("state")
        }
        return true;
    }
    componentDidMount(){
        (this.state.pos)?this.findPosNow(this.state.pos.split('-')).map(item=>this.appendData(item.title,item.key))
        :this.data.map(item=>this.appendData(item.title,item.key))
    }
    render(){
        return(
            <div className="container" >
                {(this.imgSrc)?
                <Photo imgSrc = {this.imgSrc}/>
                :<div className="row">{this.displayData}</div>
                }
            </div>
        )   
    }
}