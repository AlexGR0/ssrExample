<template>
  <div>
    <GForm :model="model" :rules="rules" ref="myform">
      <GFormItem label="用户名" prop="username">
        <GInput v-model="model.username"></GInput>
      </GFormItem>
      <GFormItem label="密码" prop="password">
        <GInput v-model="model.password" type="password"></GInput>
      </GFormItem>
      <GFormItem>
        <button @click="submitForm('myform')">提交</button>
      </GFormItem>
    </GForm>

    {{ model }}
  </div>
</template>

<script>
import GForm from "./GForm";
import GInput from "./GInput";
import GFormItem from "./GFormItem";
export default {
  components: {
    GInput,
    GFormItem,
    GForm,
  },
  data() {
    return {
      model: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "用户名必填" }],
        password: [{ required: true, message: "密码必填" }],
      },
    };
  },
  methods: {
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          alert("校验通过");
        } else {
          alert("校验失败");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>