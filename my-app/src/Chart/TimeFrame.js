class MakeTimeFrame{
    constructor(data){
        this.Oneday = [];
        this.use = [];
        this.time = 0;
        this.data = data;
    }
    changetoDays(day){
        let k = 0,obj = {},urr = [],prev;
        const setStart=(data)=>{
            obj.date = data.date;
            obj.open = data.open;
            obj.high = data.high;
            obj.low  = data.low;
            obj.volume = data.volume;
        }
        const MaxMin=(data)=>{
            if(obj.high < data.high){obj.high = data.high;}
            if(obj.low > data.low){obj.low = data.low;}
        }
        for(let i = 0;i < this.data.length;i++){
            if(k === 0){
                setStart(this.data[i]);
                prev = this.data[i].date.getDay();
                console.log(prev)
            }else if(k === day-1){
                obj.close = this.data[i].close;
                MaxMin(this.data[i]);
                obj.volume = (obj.volume + this.data[i].volume)/day;
                k = -1;
                console.log(obj);
                urr.push(obj)
                obj = {}
            }else{
                MaxMin(this.data[i]);
                obj.volume += this.data[i].volume;
            }
            k++;
        }
        return urr;
    }
    changetoDay(){
        let obj = {},n = 0
        const setStart=(data)=>{
            obj.date = data.date;
            obj.open = data.open;
            obj.high = data.high;
            obj.low  = data.low;
            obj.volume = data.volume;
        }
        const MaxMin=(data)=>{
            if(obj.high < data.high){obj.high = data.high;}
            if(obj.low > data.low){obj.low = data.low;}
        }
        for(let i = 0;i < this.data.length;i++){
            if(obj.date === undefined){
                setStart(this.data[i])
            }
            else if(obj.date.getDay() !== this.data[i].date.getDay()){
                obj.close = this.data[i].close;
                MaxMin(this.data[i]);
                obj.volume = (obj.volume + this.data[i].volume)/n;
                n = 0;
                this.Oneday.push(obj)
                obj = {};
                setStart(this.data[i]);
            }
            else{
                MaxMin(this.data[i]);
                obj.volume += this.data[i].volume;
            }
            if(i === this.data.length-1){
                obj.close = this.data[i].close;
                MaxMin(this.data[i]);
                obj.volume = (obj.volume + this.data[i].volume)/n;
                n = 0;
                this.Oneday.push(obj)
            }
            n++
        }
        return this.Oneday;
    }
    changetoHour(hour){
        let rrr = []
        for(let i = 0;i < this.data.length;i++){
            rrr.push(this.data[i]);
            if(rrr.length === hour){
                let obj = {};
                for(let j = 0;j < hour;j++){
                    if(j === 0){
                        obj.date = rrr[j].date;
                        obj.open = rrr[j].open;
                        obj.high = rrr[j].high;
                        obj.low  = rrr[j].low;
                        obj.volume = rrr[j].volume;
                        continue;
                    }else if(j === hour-1){
                        obj.close = rrr[j].close;
                        obj.volume = (obj.volume + rrr[j].volume)/hour
                    }else{
                        obj.volume += rrr[j].volume;
                    }
                    if(obj.high < rrr[j].high){obj.high = rrr[j].high;}
                    if(obj.low > rrr[j].low){obj.low = rrr[j].low;}
                }
                this.use.push(obj)
                rrr = [];
            }
        }
        console.log(this.use);
        return this.use;
    }
}
export default MakeTimeFrame;