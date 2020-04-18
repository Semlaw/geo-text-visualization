import { parseMultiPolygon, parsePolygon } from './geoParse';
import { polygonPrefixDetect, multipolygonPrefixDetect } from './geoTextReg';


// eslint-disable-next-line no-unused-vars
function wrapper (text, tagName = 'span', className = '') {
  return `<${tagName} class="${className}">${text}</${tagName}>`;
}
//* MULTIPOLYGON (((121.40686 31.08182, 121.40654 31.08252, 121.40652 31.08263, 121.40647 31.08285, 121.40643 31.08297, 121.40632 31.08323, 121.40629 31.08333)), ((121.33593 31.07641, 121.33526 31.07619, 121.33519 31.07626, 121.33519 31.07616, 121.33493 31.07607)))

const multipolygonText = `MULTIPOLYGON (((121.40 31.08)))`

const dataList = parseMultiPolygon(multipolygonText);
console.log('dataList', dataList);

export function multipolygonTextFormat (multipolygonText) {
  const dataList = parseMultiPolygon(multipolygonText);
  const polygonWithFormatedTxtList = dataList.map(polygon => {
    const polygonInnerText = polygon.map(point => {
      const pointInnerText = [
        wrapper(point[0], 'span', 'lng-value geo-value'),
        wrapper(point[1], 'span', 'lat-value geo-value'),
      ];
      return wrapper(pointInnerText.join(' '), 'span', 'point-value geo-value');
    }).join(',');
    const formatedText = wrapper(polygonInnerText, 'span', 'polygon-value geo-value');
    return {
      polygon,
      formatedText,
    }
  });
  return polygonWithFormatedTxtList;
}

export function polygonTextFormat (polygonText) {
  const polygon = parsePolygon(polygonText);

  const polygonInnerText = polygon.map(point => {
    const pointInnerText = [
      wrapper(point[0], 'span', 'lng-value geo-value'),
      wrapper(point[1], 'span', 'lat-value geo-value'),
    ];
    return wrapper(pointInnerText.join(' '), 'span', 'point-value geo-value');
  }).join(',');
  const formatedText = wrapper(polygonInnerText, 'span', 'polygon-value geo-value');
  const onePolygon = {
    polygon,
    formatedText,
  }

  return [onePolygon];
}

export function commonTextFormat (txt) {
  if (polygonPrefixDetect(txt)) {
    return polygonTextFormat(txt);
  }

  if (multipolygonPrefixDetect(txt)) {
    return multipolygonTextFormat(txt);
  }
}

const txt = dataList.map(polygon => {
  const polygonInnerText = polygon.map(point => {
    const pointInnerText = [
      wrapper(point[0], 'span', 'lng-value'),
      wrapper(point[1], 'span', 'lat-value'),
    ];
    return wrapper(pointInnerText.join(' '), 'span', 'point-value');
  });
  return wrapper(polygonInnerText, 'span', 'polygon-value');
});

console.log('text', txt);