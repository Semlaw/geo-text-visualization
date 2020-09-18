/**
 *
 * @typedef {array<number,number>} lnglat - 一个经纬度坐标点，数组的第一位是经度值，第二位是纬度值
 * @typedef {array<lnglat>} path - 多边形路径，顺序连接点，形成多边形
 * @typedef {array<path>} pathList - 多边形路径组，多个多边形
 *
 */


/**
 *
 * @description 解析多边形(POLYGON)
 *
 * @param {string} str
 * @returns {path} path - 多边形路径
 */
export function parsePolygon(str) {
  if (!str) return [];
  const retStr = str.replace(/POLYGON(\s+)?\(\(/, '').replace('))', '');
  const pointStrArr = retStr.split(',').map(_str => (_str ? _str.trim() : str));
  return pointStrArr.reduce((arr, aPointStr) => {
    const point = aPointStr.split(/\s+/).map(Number);
    arr.push(point);
    return arr;
  }, []);
}


/**
 *
 * @description 解析多边形组(MULTIPOLYGON)文本
 * @param {string} str
 * MULTIPOLYGON (((121.40686 31.08182, 121.40654 31.08252, 121.40652 31.08263, 121.40647 31.08285, 121.40643 31.08297, 121.40632 31.08323, 121.40629 31.08333)), ((121.33593 31.07641, 121.33526 31.07619, 121.33519 31.07626, 121.33519 31.07616, 121.33493 31.07607)))
 * @returns {pathList} pathList - 多边形路径组
 *
 */
export function parseMultiPolygon (multipolygonText) {
  if (!multipolygonText) return [];
  // 去除  首部`MULTIPOLYGON (`和尾部`)`。
  const noWrapperStr = multipolygonText.replace(/^\s*MULTIPOLYGON\s*\(/, '').replace(/\)\s*$/, '');
  const polygonStrList = noWrapperStr.split(/,(?=\s*\(\()/g);
  return polygonStrList.map(onePolygonStr => onePolygonStr
    // 去除首部 `((`和尾部`))`
    .replace(/^\s*\(\(/, '')
    .replace(/\)\)\s*$/, '')
    // 将点分开
    .split(/\s*,\s*/).reduce((arr, aPointStr) => {
      const point = aPointStr.trim().split(/\s+/).map(Number);
      arr.push(point);
      return arr;
    }, []));
}