<template>
  <div>
    <h1>{{id?"编辑":"新建"}}广告位</h1>
    <el-form :model="model" label-width="120px" @submit.native.prevent="save" ref="formRef">
      <el-form-item label='名称' prop='name'>
        <el-input v-model='model.name'></el-input>
      </el-form-item>
      <el-form-item label="广告" prop="items">
        <el-button type='primary' size="mini" icon="el-icon-plus" @click="model.items.push({})">添加广告</el-button>
        <el-row type='flex' style='flex-wrap:wrap'>
          <el-col style="border:0.1rem solid #ccc;padding:2rem;margin-bottom:1rem" :md='24' v-for="(item,i) in model.items" :key='i'>
            <el-form-item label="跳转链接(URL) :" prop='item'>
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item style="margin-top:2rem" label="广告图片 :" prop='skills'>
              <el-upload class="avatar-uploader" :action="uploadUrl" :headers="getAuthHeaders()" :show-file-list="false" :on-success="res=>$set(item,'img',res.url)">
                <img v-if="item.img" :src="item.img" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button size='small' type='danger' @click="model.items.splice(i,1)">删除广告</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' native-type='submit'>保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {
        name: '',
        items: [{
          url: "",
          img: ""
        }]
      },
    }
  },
  created: async function () {
    this.id && this.fetch()
  },
  methods: {
    save: async function () {
      if (this.model.name == "") return this.$message.error("分类名称不可以为空")
      let res
      if (this.id) {
        res = await this.$http.put(`/rest/ads/${this.id}`, this.model)
      }
      else {
        res = await this.$http.post('/rest/ads', this.model)
      }
      if (res.status !== 200) return this.$message.error("保存失败")
      this.id ? this.$message.success("修改成功") : this.$message.success("保存成功")
      this.$router.push('/ads/list')
    },
    async fetch() {
      const res = await this.$http.get(`/rest/ads/${this.id}`)
      console.log(res)
      this.model = { ...this.model, ...res.data }
    },

  },
  // 检测路由变化
  watch: {
    '$route.path': function (newVal, oldVal) {
      this.$refs.formRef.resetFields();
      console.log(newVal, oldVal)
    }
  }

}
</script>

<style scoped>
</style>
