import React from 'react'
import './Photo.css'
class Photo extends React.Component{
    constructor(props){
        super(props)
        this.state={imgSrc : props.imgSrc};
    }
    shouldComponentUpdate(nextProps,newState){
        if(this.props.imgSrc !== nextProps.imgSrc){
            this.setState({imgSrc: nextProps.imgSrc})
        }
        return true
    }
    render(){
        return(
            <img className = "photo" src = {this.state.imgSrc} alt = '' />
        )
    }
}
export default Photo; 