<template>
  <button class="vue-button"
          @click="handleClick"
          :disabled="disabled || loading"
          :type="nativeType"
          :class="[
            type ? 'vue-button--' + type : '',
            size ? 'vue-button--' + size : '',
            {
              'is-disabled': disabled,
              'is-loading': loading,
              'is-circle': circle
            }
  ]">
    <i :class="icon" v-if="icon"></i>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>
<script>
export default {
  name: 'VueButton',
  props: {
    type: { type: String, default: 'default' },
    size: { type: String, default: 'small' },
    icon: { type: String, default: '' },
    nativeType: { type: String, default: 'button' },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    circle: { type: Boolean, default: false }
  },
  methods: {
    handleClick (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style scoped>
.vue-button{
    display:inline-block;
    line-height:1;
    white-space:nowrap;
    cursor:pointer;
    background:#fff;
    border:1px solid #dcdfe6;
    color:#606266;
    -webkit-appearance:none;
    text-align:center;
    box-sizing:border-box;
    outline:0;
    margin:0;
    transition:.1s;
    font-weight:500;
    -webkit-user-select:none;
    padding:6px 12px;
    font-size:14px;
    border-radius:2px;
}
.vue-button [class*=el-icon-]+span{
    margin-left:5px
}

/* default button style*/
.vue-button.is-disabled,
.vue-button.is-disabled:focus,
.vue-button.is-disabled:hover{
    color:#c0c4cc;
    cursor:not-allowed;
    background-image:none;
    background-color:#fff;
    border-color:#ebeef5
}
.vue-button:focus,
.vue-button:hover{
    color:rgba(90, 100, 170, 0.7);
    border-color:rgba(90, 100, 170, 0.7);
    outline:0;
    border-radius:2px;
}
.vue-button:active{
    color:rgb(90, 100, 170);
    border-color: rgb(90, 100, 170);
    outline:0;
}

/* primary button style*/
.vue-button.vue-button--primary{
    color:#fff;
    background-color:rgb(90, 100, 170);
    border-color:rgb(90, 100, 170);
}
.vue-button--primary.is-disabled,
.vue-button--primary.is-disabled:active,
.vue-button--primary.is-disabled:focus,
.vue-button--primary.is-disabled:hover{
    color:#fff;
    cursor:not-allowed;
    background-color:rgba(90, 100, 170, 0.7);
    border-color:rgba(90, 100, 170, 0.7);
}
.vue-button--primary:hover{
    background:rgba(90, 100, 170, 0.7);
    border-color:rgba(90, 100, 170, 0.7);
    color:#fff;
}
.vue-button--primary:active{
    background:rgb(90, 100, 170);
    border-color:rgb(90, 100, 170);
    color:#fff;
}

/* info button style*/
.vue-button.vue-button--info{
    color:#575F96;
    background-color:#d9d9dd;
    border-color:#d9d9dd;
}
.vue-button--info.is-disabled,
.vue-button--info.is-disabled:active,
.vue-button--info.is-disabled:focus,
.vue-button--info.is-disabled:hover{
    color:#575F96;
    cursor:not-allowed;
    background-color:#e4e4ee;
    border-color:#e4e4ee;
}
.vue-button--info:hover{
    background:#e4e4ee;
    border-color:#e4e4ee;
    color:#575F96;
}
.vue-button--info:active{
    background:#d9d9dd;
    border-color:#d9d9dd;
    color:#575F96;
}

/* text button style*/
.vue-button.vue-button--text{
    color:#303133;
    background-color:#fff;
    border: none;
    outline: 0;
    border-radius: 0;
}
.vue-button--text.is-disabled,
.vue-button--text.is-disabled:active,
.vue-button--text.is-disabled:focus,
.vue-button--text.is-disabled:hover{
    cursor:not-allowed;
    color: #909399;
    background-image:none;
    background-color:#fff;
    border: none;
    outline: 0;
    border-radius: 0;
}
.vue-button--text:hover{
    background:#e9e9f1;
    border: none;
    color:rgb(90, 100, 170);
    outline: 0;
    border-radius: 0;
}
.vue-button--text:active{
    background:#fff;
    border: none;
    color:#303133;
    outline: 0;
    border-radius: 0;
}

/* mini button style*/
.vue-button--mini{
    font-size: 12px;
    padding: 4px 8px;
}

/* medium button style*/
.vue-button--medium{
    font-size: 14px;
    padding: 10px 20px;
}

/* circle button style*/
.vue-button.is-circle{
    border-radius:50%;
    padding:12px;
}

/* loading style*/
.vue-button.is-loading{
    position:relative;
    pointer-events:none
}
.vue-button-loading{
    position:absolute;
    pointer-events:none;
    left:-1px;
    top:-1px;
    right:-1px;
    bottom:-1px;
    border-radius:inherit;
    background-color:rgba(30,30,30,0.6);
    color: #fff;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
