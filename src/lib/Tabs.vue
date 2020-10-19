<template>
  <div class="haz-tabs">
    <div class="haz-tabs-nav">
      <div v-for="(t,index) in titles"
           :key="index" :class="{selected:t === selected}"
           class="haz-tabs-nav-item" @click="select(t)">{{ t }}
      </div>
      <div class="haz-tabs-nav-indicator"></div>
    </div>
    <div class="haz-tabs-content">
      <component :is="c" v-for="(c,index) in defaults"
                 :key="index" :class="{selected:c.props.title === selected}" class="haz-tabs-content-item"/>
    </div>
  </div>
</template>

<script lang="ts">
import Tab from '../lib/Tab.vue';

export default {
  props: {
    selected: {
      type: String
    },
    name: {
      type: String
    }
  },
  setup(props, context) {
    const defaults = context.slots.default();
    const select = (title: String) => {
      context.emit('update:selected', title);
    };
    defaults.forEach((tag) => {
      if (tag.type !== Tab) {
        throw new Error('Tabs 子标签必须是 Tab');
      }
    });
    const titles = defaults.map((tag) => {
      return tag.props.title;
    });
    return {defaults, titles, select};
  }
};
</script>

<style lang="scss">
$blue: #40a9ff;
$color: #333;
$border-color: #d9d9d9;
.haz-tabs {
  &-nav {
    display: flex;
    color: $color;
    border-bottom: 1px solid $border-color;
    position: relative;

    &-item {
      padding: 8px 0;
      margin: 0 16px;
      cursor: pointer;

      &:first-child {
        margin-left: 0;
      }

      &.selected {
        color: $blue;
      }
    }

    &-indicator {
      position: absolute;
      height: 3px;
      background: $blue;
      left: 0;
      bottom: -1px;
      width: 100px;
    }
  }

  &-content {
    padding: 8px 0;

    &-item {
      display: none;

      &.selected {
        display: block;
      }
    }
  }
}
</style>