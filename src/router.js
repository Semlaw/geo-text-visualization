import VueRouter from 'vue-router';
import geoMap from './components/geoMap';
import multipolygonParse from './components/multipolygonParse';
import introduce from './components/introduce';


export const routes = [
  {
    path: '/multipolygonParse',
    title: 'MULTIPOLYGON解析',
    component: multipolygonParse
  },
  {
    path: '/geoMap',
    title: 'GEO数据可视化',
    component: geoMap
  },
  {
    path: '/introduce',
    title: '数据格式介绍',
    component: introduce
  }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/multipolygonParse' },
    ...routes
  ] // (缩写) 相当于 routes: routes
})

export default router;