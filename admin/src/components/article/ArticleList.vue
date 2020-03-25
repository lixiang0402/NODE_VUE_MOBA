<template>
  <div>
    <h1>文章列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="220">
      </el-table-column>
      <el-table-column prop="title" label="文章名称">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="$router.push(`/articles/edit/${scope.row._id}`)">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size='mini' @click="deleteCate(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    }
  },
  created: function () {
    this.fetch()
  },
  methods: {
    fetch: async function () {
      const { data: res } = await this.$http.get('/rest/articles')
      console.log(res)
      this.items = res
    },
    async deleteCate(row) {
      this.$confirm(`是否删除文章 :${row.title}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { status } = await this.$http.delete(`/rest/articles/${row._id}`)
        if (status == 200) this.$message({
          type: 'success',
          message: '删除文章成功!'
        });
        this.fetch()
      })
    }
  }
}
</script>

<style scoped lang="less">
</style>
