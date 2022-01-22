<template>
  <div id="app">
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e5e5e5;
  overflow: hidden;
}

@media (hover: none) {
  .container {
    height: calc(100vh - 80px);
    justify-content: flex-start;
    align-items: flex-start;
  }
}
</style>
