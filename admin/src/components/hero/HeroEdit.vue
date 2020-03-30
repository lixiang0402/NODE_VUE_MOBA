<template>
  <div>
    <h1>{{id?"编辑":"新建"}}英雄</h1>
    <el-form :model="model" label-width="100px" @submit.native.prevent="save" ref="formRef">
      <el-tabs type="border-card" value='basic'>
        <el-tab-pane label="基础信息" name="basic">
          <el-form-item label="名 称" prop='name'>
            <el-input v-model.trim="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号" prop='title'>
            <el-input v-model.trim="model.title"></el-input>
          </el-form-item>

          <el-form-item label="头像" prop='avatar'>
            <el-upload class="avatar-uploader" :action="uploadUrl" :headers="getAuthHeaders()" :show-file-list="false" :on-success="res=>$set(model,'avatar',res.url)">
              <img v-if="model.avatar" :src="model.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="英雄背景" prop='banner'>
            <el-upload class="avatar-uploader" :action="uploadUrl" :headers="getAuthHeaders()" :show-file-list="false" :on-success="res=>$set(model,'banner',res.url)">
              <img v-if="model.banner" :src="model.banner" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="英雄类型" prop='categories'>
            <el-select v-model="model.categories" placeholder="请选择" multiple>
              <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度" prop='scores'>
            <el-rate style="margin-top:0.6rem" :max="9" show-score v-model.trim="model.scores.difficult"></el-rate>
          </el-form-item>
          <el-form-item label="技能" prop='scores'>
            <el-rate style="margin-top:0.6rem" :max="9" show-score v-model.trim="model.scores.skills"></el-rate>
          </el-form-item>
          <el-form-item label="攻击" prop='scores'>
            <el-rate style="margin-top:0.6rem" :max="9" show-score v-model.trim="model.scores.attack"></el-rate>
          </el-form-item>
          <el-form-item label="生存" prop='scores'>
            <el-rate style="margin-top:0.6rem" :max="9" show-score v-model.trim="model.scores.survive"></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装" prop='items1'>
            <el-select v-model="model.items1" multiple placeholder="请选择">
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装" prop='items2'>
            <el-select v-model="model.items2" multiple placeholder="请选择">
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧" prop='usageTips'>
            <el-input type='textarea' v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧" prop='battleTips'>
            <el-input type='textarea' v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路" prop='teamTips'>
            <el-input type='textarea' v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button type='primary' size="mini" icon="el-icon-plus" @click="model.skills.push({})">添加技能</el-button>
          <el-row type='flex' style='flex-wrap:wrap'>
            <el-col :md='12' v-for="(item,i) in model.skills" :key='i'>
              <el-form-item label="技能名称" prop='item'>
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标" prop='skills'>
                <el-upload class="avatar-uploader" :action="uploadUrl" :headers="getAuthHeaders()" :show-file-list="false" :on-success="res=>$set(item,'icon',res.url)">
                  <img v-if="item.icon" :src="item.icon" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="冷却值" prop='delay'>
                <el-input v-model="item.delay"></el-input>
              </el-form-item>
              <el-form-item label="消耗" prop='cost'>
                <el-input v-model="item.cost"></el-input>
              </el-form-item>
              <el-form-item label="技能介绍" prop='skills'>
                <el-input type='textarea' v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="小提示" prop='skills'>
                <el-input type='textarea' v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size='small' type='danger' @click="model.skills.splice(i,1)">删除技能</el-button>
              </el-form-item>
            </el-col>

          </el-row>
        </el-tab-pane>

        <el-tab-pane label="英雄搭档" name="partners">
          <el-button type='primary' size="mini" icon="el-icon-plus" @click="model.partners.push({})">添加搭档</el-button>
          <el-row type='flex' style='flex-wrap:wrap'>
            <el-col :md='12' v-for="(item,i) in model.partners" :key='i'>
              <el-form-item label="搭档名称" prop='item'>
                <el-select filterable v-model="item.hero" placeholder="请选择">
                  <el-option v-for="item in heroes" :key="item._id" :label="item.name" :value="item._id">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="描述" prop='skills'>
                <el-input type='textarea' v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size='small' type='danger' @click="model.partners.splice(i,1)">删除</el-button>
              </el-form-item>
            </el-col>

          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item>
        <el-button style="margin-top:1rem" type='primary' native-type='submit'>保存</el-button>
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
        avatar: '',
        banner: '',
        title: '',
        categories: [],
        scores: {
          difficult: 0,
          skills: 0,
          attack: 0,
          survive: 0
        },
        skills: [{
          icon: '',
          name: '',
          description: '',
          tips: '',
        }],
        items1: [],
        items2: [],
        usageTips: '',
        battleTips: '',
        teamTips: '',
        partners: []

      },
      categories: [],
      items: [],
      activeName: 'first',
      heroes: []

    }
  },
  created: async function () {
    this.fetchHeroes()
    this.fetchItems()
    this.fetchCategories()
    this.id && this.fetch()
  },
  methods: {
    save: async function () {
      if (this.model.name == "" || this.model.name == undefined) return this.$message.error("分类名称不可以为空")
      let res
      if (this.id) {
        res = await this.$http.put(`/rest/heroes/${this.id}`, this.model)
      }
      else {
        res = await this.$http.post('/rest/heroes', this.model)
      }
      if (res.status !== 200) return this.$message.error("保存失败")
      this.id ? this.$message.success("修改成功") : this.$message.success("保存成功")
      this.$router.push('/heroes/list')
    },
    async fetch() {
      const res = await this.$http.get(`/rest/heroes/${this.id}`)
      this.model = { ...this.model, ...res.data }
    },
    async fetchCategories() {
      const res = await this.$http.get(`/rest/categories`)
      console.log(res.data)
      this.categories = res.data
      console.log(this.categories)
    },
    async fetchItems() {
      const { data: res } = await this.$http.get(`/rest/items`)
      console.log(res)
      this.items = res
    },
    async fetchHeroes() {
      const { data: res } = await this.$http.get(`/rest/heroes`)
      console.log(res)
      this.heroes = res
    },

    afterUpload(res) {
      // console.log(res)
      // this.$set(this.model, "icon", res.url)
      this.model.avatar = res.url
    }
  },
  // 检测路由变化
  watch: {
    '$route.path': function (newVal, oldVal) {
      this.$refs.formRef.resetFields();
      this.model.skills = []
      console.log(newVal, oldVal, "/heroes/edit/")
    }
  }

}
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 5rem;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
}
.avatar {
  width: 5rem;
  height: 5rem;
  display: block;
}
</style>
