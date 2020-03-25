<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: #333744">
      <el-menu router unique-opened :defualt-active="$route.path" background-color="#333744" text-color="#fff" active-text-color="#ffd04b" :collapse-transition='false'>
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-tickets"></i>内容管理</template>
          <el-menu-item-group>
            <template slot="title">物品</template>
            <el-menu-item index="/items/edit">新建物品</el-menu-item>
            <el-menu-item index="/items/list">物品列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">英雄</template>
            <el-menu-item index="/heroes/edit">新建英雄</el-menu-item>
            <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">文章</template>
            <el-menu-item index="/articles/edit">新建文章</el-menu-item>
            <el-menu-item index="/articles/list">文章列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-s-operation"></i>运营管理</template>
          <el-menu-item-group>
            <template slot="title">广告位</template>
            <el-menu-item index="/ads/edit">新建广告位</el-menu-item>
            <el-menu-item index="/ads/list">广告位列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-setting"></i>系统设置</template>
          <el-menu-item-group>
            <template slot="title">分类</template>
            <el-menu-item index="/categories/edit">新建分类</el-menu-item>
            <el-menu-item index="/categories/list">分类列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">管理员</template>
            <el-menu-item index="/admin_users/edit">新建管理员</el-menu-item>
            <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px;backgroundColor:#545c64">
        <h1>王者荣耀后台</h1>
        <el-button @click="out" type="waring">退出</el-button>
      </el-header>

      <el-main>

        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    out() {
      console.log(1)
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
};
</script>
<style scoped>
.el-aside {
  user-select: none;
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-header .el-button {
  font-weight: bold;
  color: red;
}
.el-header h1 {
  font-size: 30px;
  font-family: "宋体";
  font-weight: bold;
  color: rgba(0, 0, 0, 0.6);
  margin: 0;
  padding: 0;
  height: 100%;
  text-align: center;
}
</style>