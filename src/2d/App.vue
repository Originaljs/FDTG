<template>
    <div class="box">
      <canvas id="testBox" class="testBox"></canvas>
    </div>
</template>
<script setup>
import { onMounted,ref } from 'vue';
// import {pageOnload} from '@/3d/index.js'
import {addScene} from '@/3d/index.ts'
const loadStatus = ref(false)
onMounted(()=>{
  let testBox = document.getElementById("testBox");
  addScene(testBox, () => {
      console.log("done");
      loadStatus.value = true;
    });
})
</script>
<style lang="less">
.box{
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}

.testBox {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  /* overflow: hidden; */
}
</style>
