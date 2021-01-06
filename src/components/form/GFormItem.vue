<template>
  <div>
    <label v-if="label">
      {{ label }}
    </label>
    <slot></slot>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script>
import Schema from "async-validator";
export default {
  inject: ["form"],
  data() {
    return {
      errorMessage: "",
    };
  },
  props: {
    label: {
      type: String,
      defalut: "",
    },
    prop: {
      type: String,
      default: "",
    },
  },
  mounted() {
    this.$on("validate", () => {
      this.validate();
    });
  },
  methods: {
    validate() {
      const rules = this.form.rules[this.prop];
      const value = this.form.model[this.prop];
      const schema = new Schema({ [this.prop]: rules });
      return schema.validate({ [this.prop]: value }, (errors) => {
        if (errors) {
          this.errorMessage = errors[0].message;
        } else {
          this.errorMessage = "";
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>