 <template>
   <div class="nav-bar">
     <!-- 具名插槽：添加样式 -->
     <div class="left"><slot name="left"></slot></div>
     <div class="center"><slot name="center"></slot></div>
     <div class="right"><slot name="right"></slot></div>
   </div>
 </template>
 
 <script>
 export default {
   name:"NavBar"
 }
 </script>
 
 <style scoped>
  .nav-bar {
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100,100,100,.1);
  }

  .left, .right {
    width: 60px;
  }

  .center {
    flex: 1;
  }
 </style>