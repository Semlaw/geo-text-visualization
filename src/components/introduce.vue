<template>
  <div class="view-container">
    <div>
      <H2>POLYGON（多边形）数据格式</H2>
      <ol>
        <li>一个多边形由多个（3个及以上）点构成，顺序连接这些点，绘制多边形。</li>
        <li>一个点由经度值和纬度值构成，经度值在前，纬度值在后，经度值和纬度值都必须有值，经度值和纬度值之间使用1或多个空格分隔。</li>
        <li>点与点之间使用英文逗号分隔，点与点之间除了存在英文逗号，还可以存在空格。</li>
        <li>点集合用`POLYGON ((`和`))`包裹。</li>
      </ol>
      <div>
        demo:
      </div>
      <div class="demo-text">
        POLYGON((116.37106 39.879843, 116.396477 39.899866, 116.37018 39.894338, 116.37783 39.915345, 116.379032 39.922401, 116.408965 39.921575, 116.427398 39.908504, 116.456226 39.893305, 116.430809 39.873888, 116.375695 39.862569, 116.402292 39.892353))
      </div>
    </div>
    <div>
      <h2>MULTIPOLYGON（多边形组）数据格式</h2>
      <ol>
        <li>一个多边形组由多个（2个及以上）多边形（polygon）构成，每个多边形分别绘制，互不干扰。</li>
        <li>一个多边形由多个（3个及以上）点构成，顺序连接这些点，绘制多边形。</li>
        <li>一个点由经度值和纬度值构成，经度值在前，纬度值在后，经度值和纬度值都必须有值，经度值和纬度值之间使用1或多个空格分隔。</li>
        <li>点与点之间使用英文逗号分隔，点与点之间除了存在英文逗号，还可以存在空格。</li>
        <li>点集合使用 `((`和 `))`包裹，构成一个polygon。</li>
        <li>polygon之间使用英文逗号分隔，polygon与polygon之间除了必须存在的英文逗号，还可以存在空格。</li>
        <li>polygon集合用`MULTIPOLYGON (`和`)`包裹。</li>
      </ol>
      <div>
        demo:
      </div>
      <div class="demo-text">
        MULTIPOLYGON (((116.410188 39.879957, 116.410703 39.897555, 116.402292 39.892353, 116.389846 39.891365)),((116.355492 39.903757, 116.367659 39.87677, 116.359377 39.879167, 116.322297 39.873318, 116.326933 39.892616, 116.339549 39.898345)))
      </div>
    </div>
  </div>

</template>

<script >
export default {};
</script>

<style scoped>
.view-container {
  padding: 8px;
}
.demo-text {
  color: #67c23a;
}
</style>