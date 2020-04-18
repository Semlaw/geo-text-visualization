<template>
  <div class="aside-container">
    <el-menu width="200"
             router
             background-color="#545c64"
             text-color="#fff"
             :default-active="defaultActive"
             class="el-menu-vertical-demo">
      <el-menu-item :key="idx"
                    :index="menu.path"
                    v-for="(menu,idx) in menus"><i :class="menu.icon"></i>
        {{menu.title}}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { routes as menus } from "../router.js";
console.log("menus", menus);
export default {
  watch: {
    $route(route) {
      this.defaultActive = route.path;
    }
  },
  data() {
    return {
      menus,
      defaultActive: "",
      isCollapse: false
    };
  },
  mounted() {
    this.defaultActive = this.$route.path;
  }
};
</script>

<style>
.aside-container {
  background: #eee;
}
</style>