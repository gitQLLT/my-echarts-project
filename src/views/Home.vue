<template>
  <el-container>
    <el-main class="main-content">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :lg="8">
          <chart1 ref="chart-1"></chart1>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="8">
          <chart2 ref="chart-2"></chart2>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="8">
          <chart3 ref="chart-3"></chart3>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="8">
          <chart4 ref="chart-4"></chart4>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="8">
          <chart5 ref="chart-5"></chart5>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="8">
          <chart6 ref="chart-6"></chart6>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import chart1 from '@/components/chart1'
import chart2 from '@/components/chart2'
import chart3 from '@/components/chart3'
import chart4 from '@/components/chart4'
import chart5 from '@/components/chart5'
import chart6 from '@/components/chart6'
import {debounce} from '@/utils'
export default {
  name: 'Home',
  components: {
    chart1,
    chart2,
    chart3,
    chart4,
    chart5,
    chart6,
  },
  data(){
    return {
      
    }
  },

  mounted(){
    window.addEventListener("resize", this.adaptCom, true);
  },
  
  destroyed(){
    window.removeEventListener("resize", this.adaptCom, true)
  },

  methods: {
    adaptCom () {
      for(let i=1;i<7;i++){
        debounce(this.$refs['chart-'+i] && this.$refs['chart-'+i].resizeFun(), 300)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main-content{
  height: 100vh;
  padding: 0 5px;
  .el-row{
    height: 100%;
    .el-col{
      height: 50%;
      overflow: hidden;
    }
  }
} 
</style>