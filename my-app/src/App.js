import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import DataTable from 'react-data-table-component';
import { timeParse } from "d3-time-format";
import Chart from './Chart/Chart';
import { getInputClassName } from 'antd/lib/input/Input';
let a = 0;
function App() {
  const parseDate = timeParse("%Y/%m/%d%H:%M");
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [Adata,setAdata] = useState([]);
  const [text,settext]= useState(0);
  const [check,setcheck]= useState(false);
  const [max,setMax] = useState(0);
  const processData = dataString => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
    const list = [];
    const listA = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
      console.log(row)
      if (headers && row.length === headers.length) {
        const obj = {};
        const objA = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] === '"')
              d = d.substring(1, d.length - 1);
            if (d[d.length - 1] === '"')
              d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }
        // remove the blank rows
        if (Object.values(obj).filter(x => x).length > 0) {
          list.push(obj);
        }
        if(obj){
          objA["date"] =  parseDate(obj.date+obj.hr);
          objA["open"] = parseFloat(obj.open);
          objA["low"] = parseFloat(obj.low);
          objA["high"] = parseFloat(obj.high)
          objA["close"] = parseFloat(obj.close);
          objA["volume"] = parseFloat(obj.volume);
          listA.push(objA);
        }
        if(parseFloat(obj.volume) > a){
          a = parseFloat(obj.volume);
          console.log(a)
        }
      }
    }
 
    // prepare columns list from headers
    const columns = headers.map(c => ({
      name: c,
      selector: c,
    }));
 
    setData(list);
    setColumns(columns);
    setAdata(listA);
    console.log("Adata: ",Adata)
    console.log(list,listA,columns)
  }
  
  const onChange=(e)=>{
    settext(parseFloat(e.target.value))
  }
  onclick=(e)=>{
    if(text!==0){
    const list = [];
    const listA = [];
    Adata.map(
      (datx)=>{
          if(datx.close > text){
            const a = Adata.indexOf(datx);
            listA.push(datx);
            list.push(data[a]);       
          }
      }
    )
    setAdata(listA);
    setData(list);
    }
  }
  // handle file upload
  const handleFileUpload = function(e)  {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function(evt) {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      processData(data);
      
    };
    reader.readAsBinaryString(file);
  }
 
  return (
    <div>
      <h3>Read CSV file in React - <a href="https://www.cluemediator.com" target="_blank" rel="noopener noreferrer">Clue Mediator</a></h3>
      <input
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={handleFileUpload}
      />
      <DataTable
        pagination
        highlightOnHover
        columns={columns}
        data={data}
      />
 
       <button onClick = {onclick}>click</button>
       <h3>{Adata.length}</h3>
      <h3>{a}</h3>
      
      <input  type='text' onChange={onChange}/>
      {console.log(data)}
        
    </div>
    
  );
}
 
export default App;
