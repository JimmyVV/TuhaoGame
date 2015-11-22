



    var first_arr = [8,5,6,5],
        second_arr = [6,4,5,5],
        third_arr = [4,5,6,6],
        four_arr = [7,5,5,5];
function textFormat(text,num){
         this.content='';
        switch(num){
            case 1:
                this.content =  this.dealNum(text,first_arr);
            break;
            case 2:
                this.content =  this.dealNum(text,second_arr);
            break;
            case 3:
                this.content =  this.dealNum(text,third_arr);
            break;
            case 4:
                this.content =  this.dealNum(text,four_arr);
            break;
        }
       
    }       
textFormat.prototype.dealNum=function(text,arr){
        var count = 0,
            content;
        var compile_str = arr.map(function(val,i,array){
            if(i===0){
                content = text.slice(0,val)+"<br/>";
            }else if(i<array.length-1){
                content = text.slice(count,count+val)+"<br/>";                
            }else{
                content = text.slice(count,count+val)+"<br/>"+text.slice(count+val);
            }
            count+=val;  //累计起点数
            return content;
        });
        return compile_str.join('');
    };