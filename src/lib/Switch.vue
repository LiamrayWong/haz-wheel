<template>
  <button class="haz-switch" @click="toggle" :class="{ 'haz-checked': value }">
    <span></span>
  </button>
  <div>{{ value }}</div>
</template>

<script lang="ts">
export default {
  props: {
    value: Boolean,
  },
  setup(props, context) {
    const toggle = () => {
      context.emit("update:value", !props.value);
    };
    return { toggle };
  },
};
</script>

<style lang="scss">
$h: 22px;
$h2: $h - 4px;
.haz-switch {
  height: $h;
  width: $h * 2;
  border: none;
  background: grey;
  border-radius: $h/2;
  position: relative;
  > span {
    position: absolute;
    top: 2px;
    left: 2px;
    height: $h2;
    width: $h2;
    background: white;
    border-radius: $h2/2;
    transition: left 250ms;
  }
  &.haz-checked {
    background: #10a0ff;
    > span {
      left: calc(100% - #{$h2} - 2px);
    }
  }
  &:focus {
    outline: none;
  }
  &:active {
    > span {
      width: $h2 + 2px;
    }
  }
  &.haz-checked:active {
    > span {
      width: $h2 + 2px;
      margin-left: -2px;
    }
  }
}
</style>
