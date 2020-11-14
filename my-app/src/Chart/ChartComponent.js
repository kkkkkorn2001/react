import React from 'react';
import Chart from './Chart';
import 'antd/dist/antd.css';
import MakeTimeFrame from './TimeFrame'
import { Select } from 'antd';
const { Option } = Select;
let arr = undefined;
export default class ChartComponent extends React.Component {
	constructor(props){
		super(props)
		this.vvv = ['1h','3h','5h','1d','3d']
		this.time = {'1h':1,'3h':3,'5h':5,'1d':24,'3d':72}
		this.state = {data:undefined,value:'1h'}
	}
	componentDidMount() {
		getData().then(data => {
			this.setState({data})
		})
	}
	onClick=(value)=>{
		// const data = (new MakeTimeFrame(this.state.data)).changetoDay()
		// console.log(new MakeTimeFrame(data).changetoDays(3));
		if(value === '1h'){
			arr = undefined;
			this.setState({value});
		}else{
			this.setState({value, newData : new MakeTimeFrame(this.state.data).changetoHour(this.time[value])});
		}
	}
	shouldComponentUpdate(r,nextState){
		nextState.data.columns = ["date", "hr", "open", "high", "low", "close", "volume"]
		arr = (arr === undefined)? nextState.data:nextState.newData;
		console.log('arr : ',arr)
		return true;
	}
	render() {
		if (arr === undefined) {
			return <div>Loading...</div>
		}
		console.log('render')
		return (
			<div>
			<Select defaultValue= "1h" style={{ width: 120 }} onChange={this.onClick}>
      			<Option value="1h">1h</Option>
      			<Option value="3h">3h</Option>
      			<Option value="5h">5h</Option>
				<Option value="1d">1d</Option>
				<Option value="3d">3d</Option>
			</Select>
			<Chart data={arr} value = {this.state.value}/>
			</div>
		)
	}
}
