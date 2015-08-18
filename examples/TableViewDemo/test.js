var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('countries.json', 'utf8'));
var items=[];
obj[0].items.sort(function(a,b){
    var A=a.label;
    var B=b.label;
    if (A < B){
        return -1;
    }else if (A > B){
        return  1;
    }else{
        return 0;
    }});

fs.writeFileSync('countries.json',JSON.stringify(obj))
