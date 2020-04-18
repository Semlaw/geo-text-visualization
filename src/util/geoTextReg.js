/**
 *
 * @description 对多边形文本进行校验
 * POLYGON((121.431488 31.769261,121.433282 31.768613,121.43 31.777784,121.425783 31.774271))
 * @param {string} polygonText - 需要校验的文本
 */
const polygonTestReg = /^\s*POLYGON\s*\(\(\s*((\d+|\d+\.\d+)\s+(\d+|\d+\.\d+)(\s*,\s*(?=\d)|\s*(?=\)\)))){3,}\)\)\s*$/;

export function polygonTest (str) {
  // 一个经度或者维度值 (可以有小数位，也可以没有。 121 、121.1212都合法)
  // (\d+|\d+\.\d+)
  // 一个点 经度和维度之间用1或多个空格分隔
  //  (\d+|\d+\.\d+)\s+(\d+|\d+\.\d+)
  // 一个点和后缀（" , "或" ))"） 后缀正则(\s*,\s*(?=\d)|\s*(?=\)\)))
  // ((\d+|\d+\.\d+)\s+(\d+|\d+\.\d+)(\s*,\s*(?=\d)|\s*(?=\)\))))

  // https://regexper.com/#%5E%5Cs*POLYGON%5Cs*%5C%28%5C%28%5Cs*%28%28%5Cd%2B%7C%5Cd%2B%5C.%5Cd%2B%29%5Cs%2B%28%5Cd%2B%7C%5Cd%2B%5C.%5Cd%2B%29%28%5Cs*%2C%5Cs*%28%3F%3D%5Cd%29%7C%5Cs*%28%3F%3D%5C%29%5C%29%29%29%29%7B3%2C%7D%5C%29%5C%29%5Cs*%24
  return polygonTestReg.test(str);
}

/**
 *
 * @description `POLYGON ((` 前缀detect
 * @param {string} text
 *
 * @returns {boolean} isPolygonText
 *
 */
export function polygonPrefixDetect (text) {
  return /^\s*POLYGON\s*\(\(/.test(text);
}


/**
 *
 * @description 对多边形组文本进行校验
 * MULTIPOLYGON (((121.40686 31.08182, 121.40654 31.08252, 121.40652 31.08263, 121.40647 31.08285, 121.40643 31.08297, 121.40632 31.08323, 121.40629 31.08333)), ((121.33593 31.07641, 121.33526 31.07619, 121.33519 31.07626, 121.33519 31.07616, 121.33493 31.07607)))
 * @param {string} multipolygonText - 需要校验的文本
 */
const multipolygonTestReg = /^\s*MULTIPOLYGON\s*\((\(\((((\d+|\d+\.\d+)\s+(\d+|\d+\.\d+)(\s*,\s*(?=\d)|\s*(?=\)\)))){3,})\)\)(\s*,\s*(?=\(\()|\s*(?=\)))){2,}\)\s*$/;

export function multipolygonTest (multipolygonText) {
  // 一个经度或者维度值 (可以有小数位，也可以没有。 121 、121.1212都合法)
  // (\d+|\d+\.\d+)

  // 一个点 经度和维度之间用1或多个空格分隔
  //  (\d+|\d+\.\d+)\s+(\d+|\d+\.\d+)

  // 一个点和后缀（" , "或" ))"） 后缀(\s*,\s*(?=\d)|\s*(?=\)\)))
  // ((\d+|\d+\.\d+)\s+(\d+|\d+\.\d+)(\s*,\s*(?=\d)|\s*(?=\)\))))

  // 一个polygon
  // (\(\((((\d+|\d+\.\d+)\s+(\d+|\d+\.\d+)(\s*,\s*(?=\d)|\s*(?=\)\)))){3,})\)\))

  // 一个polygon及后缀  (\s*,\s*(?=\(\()|\s*(?=\)))
  // (\(\((((\d+|\d+\.\d+)\s+(\d+|\d+\.\d+)(\s*,\s*(?=\d)|\s*(?=\)\)))){3,})\)\)(\s*,\s*(?=\(\()|\s*(?=\))))

  // eslint-disable-next-line max-len
  // https://regexper.com/#%5E%5Cs*MULTIPOLYGON%5Cs*%5C%28%28%5C%28%5C%28%28%28%28%5Cd%2B%7C%5Cd%2B%5C.%5Cd%2B%29%5Cs%2B%28%5Cd%2B%7C%5Cd%2B%5C.%5Cd%2B%29%28%5Cs*%2C%5Cs*%28%3F%3D%5Cd%29%7C%5Cs*%28%3F%3D%5C%29%5C%29%29%29%29%7B3%2C%7D%29%5C%29%5C%29%28%5Cs*%2C%5Cs*%28%3F%3D%5C%28%5C%28%29%7C%5Cs*%28%3F%3D%5C%29%29%29%29%7B2%2C%7D%5C%29%5Cs*%24
  return multipolygonTestReg.test(multipolygonText);
}
/**
 *
 * @description `MULTIPOLYGON (` 前缀detect
 * @param {string} text
 *
 * @returns {boolean} isMultipolygonText
 */
export function multipolygonPrefixDetect (text) {
  return /^\s*MULTIPOLYGON\s*\(/.test(text);
}

export function geoTextReg (txt) {
  if (multipolygonPrefixDetect(txt)) {
    if (multipolygonTest(txt)) {
      return {
        error: false,
        color: '#67C23A',//Success
        msg: 'MULTIPOLYGON',
      }
    } else {
      return {
        color: '#F56C6C',//Danger
        msg: 'MULTIPOLYGON格式错误',
      }
    }
  }
  if (polygonPrefixDetect(txt)) {
    if (polygonTest(txt)) {
      return {
        color: '#67C23A',//Success
        msg: 'POLYGON',
      }
    } else {
      return {
        color: '#F56C6C',//Danger
        msg: 'POLYGON格式错误',
      }
    }
  }
  return {
    error: true,
    color: '#909399',//info
    msg: '请输入POLYGON或MULTIPOLYGON数据',
  }
}