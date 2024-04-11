<template>
  <div class="bubble-box" :class="{op: op}" v-show="props.bubbleStr">
    {{ props.bubbleStr }}
  </div>
</template>

<script lang="ts" setup>
import {ref, defineProps} from "vue";

const op = ref(false);
setTimeout(() => {
  op.value = true;
}, 0);

interface Inprops {
  bubbleStr: string;
}

const props = defineProps<Inprops>();
</script>

<style lang="less" scoped>
.bubble-box {
  min-width: 20%;
  max-width: 35%;
  border-radius: 2vw;
  background: rgba(255, 255, 255, 0.5);
  font-size: 0.7rem;
  text-align: center;
  padding: 0.5rem 0.9rem;
  position: fixed;
  top: 15%;
  left: 45%;
  z-index: 3001;
  transition: opacity 1.5s ease;
  opacity: 0;

  &.op {
    opacity: 1;
  }

  &::after {
    content: '';
    border: 0.5rem solid #ffffff00;
    border-right: 0.3rem solid rgba(255, 255, 255, 0.5);
    transform: translate(25%, -50%);
    position: absolute;
    top: 50%;
    left: -1rem;
  }

}
</style>
