<template>
  <div class="bg-gray-100 w-full h-full pt-16">
    <div class="bg-white w-5/6 sm:w-2/3 md:w-1/2 lg:w-2/5 mx-auto border p-8 flex flex-col items-center shadow-2xl" >
      <img src="../../public/logo.png" alt="buaa logo" class="w-5/6 lg:w-3/5" >
      <div class="text-center mt-4 mb-12 text-2xl flex-0 text-gray-600">
        北航大学生<br/>便民生活平台
      </div>
      <div class="w-full text-center text-md mb-3 text-gray-500 flex-0">
        管理后台
      </div>
      <a-form
          class="login-form w-full flex-0"
          id="components-form-demo-normal-login"
          :form="form"
          @submit="handleSubmit"
      >
        <a-form-item>
          <a-input
              v-decorator="[
          'userName',
          { rules: [{ required: true, message: '请输入用户名!' }] },
        ]"
              placeholder="用户名"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
              v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入密码!' }] },
        ]"
              type="password"
              placeholder="密码"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" class="login-form-button">
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          // console.log('Received values of form: ', values);
          this.$store.dispatch('LOGIN', {
            email: values.userName,
            password: values.password
          }).then(() => {
            this.$router.push('/index')
          }).catch((err) => {
            try {
              if (err.status === 401) {
                this.$message.error('用户名或密码错误')
              } else {
                this.$message.error('网络不稳定，请再试一次哦')
              }
            }
            catch (e) {
              this.$message.error('网络不稳定，请再试一次哦')
            }
          })
        }
      });
    },
  },
};
</script>
<style>
#components-form-demo-normal-login {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>