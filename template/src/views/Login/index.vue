<!-- 登录页面 -->
<template>
  <div class="home">
    <main>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        label-position="left"
        v-enterJump
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="ruleForm.username" placeholder="admin" @keyup.enter.native="submitForm('ruleForm')" v-focus></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" placeholder="admin" @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login" @click="submitForm('ruleForm')">登录</el-button>
          <el-checkbox v-model="remember" class="remember">记住我</el-checkbox>
        </el-form-item>
      </el-form>
    </main>
  </div>
</template>

<script>
let self;
export default {
  name: "login",
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      remember:true,
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [
          { required: true, message: "请输入账号密码", trigger: "blur" },
        ],
      },
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    self = this;
    //勾选记住我，显示上次输入的账号密码
    if(!self.$_.get('password')) return
    self.ruleForm.username = self.$_.get('username')
    self.ruleForm.password = self.$_.get('password')
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {

  },

  methods: {
    submitForm(formName) {
        self.$refs[formName].validate((valid) => {
          if (valid) {
            if(self.ruleForm.username == 'admin' && self.ruleForm.password == 'admin'){
              let obj ={
                username: self.ruleForm.username,
                password: self.ruleForm.password
              }
              self.$api.loginApi.login(obj).then(res =>{
                if(res){
                  self.$router.push('/home')
                  if(self.remember){
                    self.$_.set('username',self.ruleForm.username)
                    self.$_.set('password',self.ruleForm.password)
                  }else{
                    self.$_.remove('password',self.ruleForm.password)
                  }
                }
              })
            }else{
              return self.$message({ message: "账号或密码错误", type: "error" })
            }
          } else {
            console.log("error submit!!");
            return false;
          }
        });
    },
    resetForm(formName) {
      self.$refs[formName].resetFields();
    },
  },
};
</script>
<style scoped lang="scss">
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  .demo-ruleForm{
    .login{
      width: 200px;
    }
    .remember{
      margin-left: 15px;
    }
  }
}
</style>