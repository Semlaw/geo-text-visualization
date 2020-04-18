var str = `116.355492,39.903757,116.367659,39.87677,116.359377,39.879167,116.322297,39.873318,116.326933,39.892616,116.339549,39.898345`
var list = str.split(',');
var arr = [];
for (let i = 0; i < list.length;){
  arr.push([list[i], list[i + 1]]);
  i += 2;
}

arr.map(p => {
  return p.join(' ');
}).join(', ')