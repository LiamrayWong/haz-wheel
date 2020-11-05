<template>
  <div class="haz-tabs">
    <div ref="container" class="haz-tabs-nav">
      <div v-for="(t,index) in titles" :key="index"
           :ref="el => {if(el) navItems[index] = el}" :class="{selected:t === selected}"
           class="haz-tabs-nav-item" @click="select(t)">{{ t }}
      </div>
      <div ref="indicator" class="haz-tabs-nav-indicator"></div>
    </div>
    <div class="haz-tabs-content">
      <component :is="c" v-for="(c,index) in defaults"
                 :key="index" :class="{selected:c.props.title === selected}" class="haz-tabs-content-item"/>
    </div>
  </div>
</template>

<script lang="ts">
import Tab from '../lib/Tab.vue';
import {onMounted,onUpdated, ref} from 'vue';

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
    const navItems = ref<HTMLDivElement[]>([]);
    const indicator = ref<HTMLDivElement>(null);
    const container = ref<HTMLDivElement>(null);
    const x = ()=>{
      const divs = navItems.value;
      const result = divs.filter((div) => div.classList.contains('selected'))[0];
      const {width} = result.getBoundingClientRect();
      indicator.value.style.width = width + 'px';
      const {left:left1} = container.value.getBoundingClientRect()
      const {left:left2} = result.getBoundingClientRect()
      const left = left2 - left1
      indicator.value.style.left = left + 'px'
    }
    onMounted(x);
    onUpdated(x)
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
    return {defaults, titles, select, navItems, indicator, container};
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
      transition: all 250ms;
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