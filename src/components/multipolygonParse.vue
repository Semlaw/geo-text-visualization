<template>
  <div class="view-container">
    <div>输入
      <router-link to="/introduce">POLYGON</router-link>或
      <router-link to="/introduce">MULTIPOLYGON</router-link>文本
    </div>
    <el-input class="mt-10"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入POLYGON或MULTIPOLYGON文本"
              v-model="geoText" />
    <div class="tooltip-row"
         :style="{color:validateText.color}">{{validateText.msg}}</div>
    <div class="mt-10">
      <el-button type="primary"
                 @click="formatHandle">格式化</el-button>
    </div>
    <div class="polygonWithFormatedTxtListContainer"
         v-show="polygonWithFormatedTxtList&&polygonWithFormatedTxtList.length">
      <div class="polygonWithFormatedTxtList"
           v-for="(polygon,idx) in polygonWithFormatedTxtList"
           :key="idx">
        <div v-html="polygon.formatedText"></div>
        <div>point个数：{{polygon.polygon&&polygon.polygon.length}}</div>
        <div class="geo-toolrow">
          <el-button type="success"
                     @click="polygonShow(polygon.polygon)">可视化</el-button>
        </div>
      </div>
      <div>polygon个数：{{polygonWithFormatedTxtList&&polygonWithFormatedTxtList.length}}</div>
      <div class="geo-toolrow">
        <el-button type="success"
                   @click="multipolygonShow(polygonWithFormatedTxtList)">可视化</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { commonTextFormat } from "../util/geoTextFormat";
import { geoTextReg } from "../util/geoTextReg";

// eslint-disable-next-line no-unused-vars
const polygonText =
  "POLYGON((116.37106 39.879843, 116.396477 39.899866, 116.37018 39.894338, 116.37783 39.915345, 116.379032 39.922401, 116.408965 39.921575, 116.427398 39.908504, 116.456226 39.893305, 116.430809 39.873888, 116.375695 39.862569, 116.402292 39.892353))";

// eslint-disable-next-line no-unused-vars
const multipolygonText =
  "MULTIPOLYGON (((116.410188 39.879957, 116.410703 39.897555, 116.402292 39.892353, 116.389846 39.891365)),((116.355492 39.903757, 116.367659 39.87677, 116.359377 39.879167, 116.322297 39.873318, 116.326933 39.892616, 116.339549 39.898345)))";

export default {
  data() {
    return {
      geoText: multipolygonText,
      formatedMultipolygonText: "",
      polygonWithFormatedTxtList: [] // [{polygon,formatedText}]
    };
  },
  computed: {
    validateText() {
      const { geoText } = this;
      return geoTextReg(geoText);
    }
  },
  methods: {
    formatHandle() {
      const { geoText } = this;
      const list = commonTextFormat(geoText);
      this.polygonWithFormatedTxtList = list;
      this.setHistory(geoText);
      console.log("val", list);
    },
    polygonShow(polygon) {
      console.log("polygon", polygon);
      this.gotoGeoMap([polygon]);
    },
    multipolygonShow(multipolygon) {
      const polygonList = multipolygon.map(({ polygon }) => polygon);
      this.gotoGeoMap(polygonList);
    },
    gotoGeoMap(queryData) {
      const payload = encodeURIComponent(JSON.stringify(queryData));
      window.open(
        `${location.origin}${location.pathname}#/geoMap?geodata=${payload}`
      );
    },
    setHistory(val) {
      try {
        localStorage.setItem("geoText", val);
      } catch (e) {
        // todo
      }
    },
    initGeoTextFromHistory() {
      try {
        const geoText = localStorage.getItem("geoText");
        if (geoText) {
          this.geoText = geoText;
        }
      } catch (e) {
        // todo
      }
    }
  },
  mounted() {
    this.initGeoTextFromHistory();
    this.formatHandle();
  }
};
</script>

<style scoped>
.view-container {
  padding: 20px 8px;
}
.tooltip-row {
  margin-top: 10px;
  color: #f56c6c;
}
.polygonWithFormatedTxtList {
  margin-top: 10px;
  border: 1px dashed #ccc;
  padding: 10px;
}
.polygonWithFormatedTxtListContainer {
  border: 1px dashed #ccc;
  padding: 10px;
  margin-top: 20px;
}
.geo-toolrow {
  text-align: right;
  padding-top: 10px;
}

/* 
lng-value lat-value point-value polygon-value

*/
</style>
<style>
.geo-value {
  display: inline-block;
  padding: 2px;
  margin: 2px;
  border-radius: 2px;
  color: #fff;
}
.lng-value {
  background: #1890ff;
}
.lat-value {
  background: #a0d911;
}
.point-value {
  background: #b5f5ec;
}
.polygon-value {
  background: #1890ff;
}
</style>