<template>
  <div>
    <h1>{{id?"编辑":"新建"}}文章</h1>
    <el-form :model="model" label-width="100px" @submit.native.prevent="save" ref="formRef">
      <el-form-item label="所属分类" prop="categories">
        <el-select v-model="model.categories" multiple>
          <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章标题" prop="title">
        <el-input v-model.trim="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情" prop="body">
        <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' native-type='submit'>保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  props: {
    id: {}
  },
  data() {

    return {
      model: {
        title: '',
        categories: '',
        body: ''
      },
      categories: [],
    }
  },
  created: async function () {
    this.fetchCategories()
    this.id && this.fetch()
  },
  components: {
    VueEditor
  },

  methods: {
    // 富文本编辑器 通过自定义上传图片
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post('upload', formData)
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
    save: async function () {
      if (this.model.name == "") return this.$message.error("分类名称不可以为空")
      let res
      if (this.id) {
        res = await this.$http.put(`/rest/articles/${this.id}`, this.model)
      }
      else {
        res = await this.$http.post('/rest/articles', this.model)
      }
      if (res.status !== 200) return this.$message.error("保存失败")
      this.id ? this.$message.success("修改成功") : this.$message.success("保存成功")
      this.$router.push('/articles/list')
    },
    async fetch() {
      const res = await this.$http.get(`/rest/articles/${this.id}`)
      this.model = res.data
    },
    async fetchCategories() {
      const { data: res } = await this.$http.get(`/rest/categories`)
      console.log(res)
      this.categories = res
    }
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

<style scoped lang="less">
</style>
