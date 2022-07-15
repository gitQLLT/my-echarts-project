<template>
  <div class="chart-contain" style="position:relative;">
    <div class="chart5" ref="chart5"></div>
    <div class="work-opt">
      <select v-model="optVal" @change="changeOpt">
        <option value="last-day">最近一天</option>
        <option value="last-week">最近一周</option>
        <option value="last-month">最近一月</option>
        <option value="last-year">最近一年</option>
      </select>
      <input v-model="inputVal" @keydown.enter="packSeach" placeholder="输入npm包名按enter搜索">
    </div>
  </div>
</template>

<script>
import {getNpmRangeList} from '@/api/qqlist.js'
export default {
  name: 'chart5',

  data() {
    return {
      myChart: null,
      optVal: 'last-week',
      inputVal: '',
      dataList: []
    };
  },

  mounted() {
    this.myChart = this.$echarts.init(this.$refs.chart5)
    this.getData({date:this.optVal,pack:this.inputVal})
  },

  methods: {
    getData(obj){
      this.myChart.showLoading()
      getNpmRangeList(obj).then(res=>{
        this.dataList = res.downloads
        this.myChart.hideLoading()
        this.updateChart()
      })
    },

    changeOpt(){
      this.getData({date:this.optVal,pack:this.inputVal})
    },

    packSeach(){
      this.getData({date:this.optVal,pack:this.inputVal})
    },

    updateChart(){
      let xData = this.dataList.map(item=>item.day.substring(5))
      let yData = this.dataList.map(item=>item.downloads/10000)
      let options = {
        tooltip: {
          trigger: 'axis'
        },
        title: {
          text: 'npm'
        },
        grid: {
          left: '12%',
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xData
        },
        yAxis: {
          type: 'value',
          name: '下载数/万'
        },
        dataZoom: [
          {
            type: 'slider',
            show: true,
            height: '20',
            start: 0,
            end: 100
          }
        ],
        series: [
          {
            name: this.inputVal+' downloads',
            type: 'line',
            smooth: true,
            symbol: 'diamond',
            areaStyle: {},
            data: yData
          }
        ]
      }
      this.myChart.setOption(options)
    },

    resizeFun(){
      this.myChart.resize()
    }
  },
};
</script>

<style lang="scss" scoped>
.chart-contain,.chart5{
  width: 100%;
  height: 100%;
}
.work-opt{
  position: absolute;
  right: 10%;
  top: 10px;
  select,input{
    height: 19.8px;
    line-height: 19.8px;
    box-sizing: border-box;
    &:focus-visible{
      outline: none;
    }
  }
}
</style>