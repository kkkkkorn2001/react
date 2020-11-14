import { csvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";
function parseData(parse) {
	return function(d) {
		d.date = parse(d.date+d.hr);
		d.open = +d.open;
		d.high = +d.high;
		d.low = +d.low;
		d.close = +d.close;
		d.volume = +d.volume;
		return d;
	};
}
const parseDate = timeParse("%Y.%m.%d%H:%M");
const getData=()=> {
	const promiseMSFT = fetch(require('./XAGUSD60.csv'))
		.then(response =>response.text())
		.then(data =>{return csvParse(data, parseData(parseDate))})
	return promiseMSFT;
}
export default getData;