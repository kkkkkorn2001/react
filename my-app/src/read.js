const csvtojson = require('csvtojson')
const fs = require('fs')

const csvfilepath = "XAGUSD60.csv"

csvtojson()
.fromFile(csvfilepath)
.then((json) => {
    console.log(json)

    fs.writeFileSync("XAGUSD60.json",JSON.stringify(json),"utf-8",(err) =>{
        if(err) console.log(err)
    })
})

