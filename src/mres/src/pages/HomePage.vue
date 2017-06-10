<template>
  <div class="home">
    <el-row :gutter="24">
      <el-col :span="6" :offset="3">
        <div class="grid-content bg-purple" @click="toggle(0)" :class="{active: selected[0]}">
          <img src="img/cardiogram.png" class="center img-size margin-top">
          <div class="center margin-top">
            <h3>醫療影像</h3>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple" @click="toggle(1)" :class="{active: selected[1]}">
          <img src="img/clipboard.png" class="center img-size margin-top">
          <div class="center margin-top">
            <h3>醫療報告</h3>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple" @click="toggle(2)" :class="{active: selected[2]}">
          <img src="img/medicine.png" class="center img-size margin-top">
          <div class="center margin-top">
            <h3>出院病摘</h3>
          </div>
        </div>
      </el-col>
      <el-col :span="6" :offset="3">
        <div class="grid-content bg-purple" @click="toggle(3)" :class="{active: selected[3]}">
          <img src="img/medicines.png" class="center img-size margin-top">
          <div class="center margin-top">
            <h3>血液檢驗</h3>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple" @click="toggle(4)" :class="{active: selected[4]}">
          <img src="img/microscope.png" class="center img-size margin-top">
          <div class="center margin-top">
            <h3>門診用藥紀錄</h3>
          </div>
        </div>
        <div class="btn-container">
          <router-link :to="{name: 'ScanPage'}">
            <el-button type="primary" size="large" class="center">調閱</el-button>
          </router-link>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple" @click="toggle(5)" :class="{active: selected[5]}">
          <img src="img/stethoscope.png" class="center img-size margin-top">
          <div class="center margin-top">
            <h3>門診病例</h3>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data () {
    return {
      selected: [false, false, false, false, false, false]
    }
  },
  methods: {
    toggle (index) {
      this.selected[index] = !this.selected[index]
      this.$forceUpdate()
    }
  }
}
</script>

<style scoped>
.home {
  margin-top: 50px;
}

.grid-content {
  margin-top: 30px;
  height: 300px;
  width: 300px;
  border-radius: 50%;
  min-height: 36px;
}

.bg-purple {
  padding: 15px;
  background: #d3dce6;
}

.img-size {
  width: 200px;
}

.center {
  display: table;
  margin: 0 auto;
}

.margin-top {
  margin-top: 10px;
}

.btn-container {
  margin-top: 30px;
  width: 300px;
}

.active {
  background: #20a0ff;
}
</style>
