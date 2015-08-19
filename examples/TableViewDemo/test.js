var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('cities.json', 'utf8'));
var items=[];
obj.sort(function(a,b){
    var A=a.name;
    var B=b.name;
    if (A < B){
        return -1;
    }else if (A > B){
        return  1;
    }else{
        return 0;
    }});
obj.forEach(function(el){
    if (el.name) {
        items.push({label: el.name, value: el.ident, country: el.country});
    }
});
console.log(items);
fs.writeFileSync('states.json',JSON.stringify([{items:items}]));
