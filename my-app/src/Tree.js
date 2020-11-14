const treeData = [
  {title:'yyy',key:'yyy',children:[]},
  {title:'zzz',key:'zzz',children:[]},
];


const makesub=(r,i)=>{
r.keys().map((item)=>{
  console.log(item)
  const _pos = item.substring(2,14)
  const head = treeData[i]
  if(!head.children.find(x=>x.key === head.key +  "-"  +_pos)){
    head.children.push
    (
      {
        title : item.substring(2,item.length),
        key: head.key + '/' + _pos + item,
        name : r(item).default,
        isLeaf : true,
      }
    )
  } 
})
}
const make=(r,i)=>{
r.keys().map((item)=>{
  console.log(item)
  const _pos = item.substring(2,14)
  const head = treeData[i]
  if(!head.children.find(x=>x.key === head.key +  "-"  +_pos)){
    head.children.push
    (
      {
        title : _pos,
        key : head.key + "-" + _pos,
        isLeaf : true,
        children : []
      }
    )
  }
  head.children[head.children.length-1].children.push(
    {
      title : item.substring(2,item.length),
      key: head.key + '/' + _pos + item,
      name : r(item).default,
      isLeaf : true,
    }
  ) 
  console.log("name", r(item)) 
})
}

let r = require.context('../xxx/yyy',true);
makesub(r,0);
r = null;

r = require.context('../xxx/zzz',true);
make(r,1);
r = null;




export default treeData;