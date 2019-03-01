<template>
  <div>
    <div class="comment">
      <div class="commentheader">
        <div class="commentheaderleft">
          <p>4.3</p>
          <p>综合评价</p>
          <p>高于20%的商家</p>
        </div>
        <div class="commentheaderright">
          <div>
            <span>服务态度</span>
            <div>1</div>
            <span class="score">4.2</span>
          </div>
          <div>
            <span>菜品评价</span>
            <div>2</div>
            <span class="score">4.2</span>
          </div>
          <div>
            <span>送达时间</span>
            <div>3</div>
            <span class="score2">4.3</span>
          </div>
        </div>
      </div>
      <div class="trueComment">
        <ul>
          <li
            :key="index"
            class="li2"
            v-for="(value,index) in comment"
          >{{value.name}}({{value.count}})</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
</style>