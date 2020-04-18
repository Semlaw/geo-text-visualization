<template>
  <div class="view-container">
    <el-amap ref="map"
             class="amap-box"
             :events="events"
             :vid="'amap-vue'">
      <el-amap-polygon v-for="(polygon, index) in polygons"
                       :strokeColor="'#FF33FF'"
                       :strokeOpacity="0.3"
                       :strokeWeight='1'
                       :fillColor="'#1791fc'"
                       :fillOpacity="0.5"
                       :vid="index"
                       :key="index"
                       :events="polygonEvents"
                       :ref="`polygon_${index}`"
                       :path="polygon"></el-amap-polygon>
    </el-amap>
  </div>
</template>

<script>
export default {
  data() {
    return {
      events: {
        init: o => {
          this.amap = o;
          this.fitPolygon();
        }
      },
      polygonEvents: {
        init: this.fitPolygon
      },
      polygons: [
        [
          [121.40686, 31.08182],
          [121.40654, 31.08252],
          [121.40652, 31.08263],
          [121.40647, 31.08285],
          [121.40643, 31.08297],
          [121.40632, 31.08323],
          [121.40629, 31.08333]
        ],
      ]
    };
  },
  created() {
    window.geomap = this;
  },
  mounted() {
    this.initDataFromQueryString();
  },
  methods: {
    initDataFromQueryString() {
      const { geodata } = this.$route.query;
      if (geodata) {
        const polygons = JSON.parse(geodata);
        console.log("polygons", polygons);
        this.polygons = polygons;
      }
    },
    fitPolygon() {
      if (this.amap) {
        this.amap.setFitView();
      }
    }
  }
};
</script>

<style scoped>
.view-container {
  height: 100%;
}
</style>