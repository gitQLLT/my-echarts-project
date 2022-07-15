<template>
  <div class="chart3" ref="chart3"></div>
</template>

<script>
import {getSingerInfo} from '@/api/qqlist'
export default {
  name: 'chart3',

  data() {
    return {
      myChart: null,
      dataList: [],
      xData: null,
      yData1: null,
      yData2: null,
      curIndex: 1,
      timer: null
    };
  },

  mounted() {
    this.myChart = this.$echarts.init(this.$refs.chart3)
    this.getData()
  },

  beforeDestroy(){
    this.timer = null
  },

  methods: {
    getData(){
      this.initChart()
      getSingerInfo().then(res=>{
        this.dataList = res.req_5.data.list
        this.updateChart()
        this.startInterval()
      })
    },

    initChart(){
      let options = {
        title: {
          text: 'zhou-mv'
        },
        animationDurationUpdate: 500,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          textStyle: {
            align: 'left'
          }
        },
        grid: {
          left: '15%',
          bottom: '2%'
        },
        xAxis: {
          type: 'category',
          axisLabel:{
            show: false
          }
        },
        yAxis: [
          {
            type: 'value',
            name: '观看次数',
            position: 'left'
          },  
          {
            type: 'value',
            name: 'mv时长/s',
            min: 0,
            max: 400,
            interval: 80,
            position: 'right'
          }
        ],
        series: [
          {
            name: '观看次数',
            type: 'bar'
          },
          {
            name: 'mv时长',
            yAxisIndex: 1,
            type: 'line'
          }
        ]
      }
      this.myChart.setOption(options)

      // 对图表对象进行鼠标事件的监听
      this.myChart.on('mouseover', () => {
        clearInterval(this.timer)
      })
      this.myChart.on('mouseout', () => {
        this.startInterval()
      })
    },

    updateChart(){
      const start = (this.curIndex - 1) * 5
      const end = this.curIndex * 5
      const allData = this.dataList.slice(start,end)
      
      this.xData = allData.map(item=>item.title)
      this.yData1 = allData.map(item=>item.playcnt)
      this.yData2 = allData.map(item=>item.duration)
      let options = {
        xAxis: {
          data: this.xData
        },
        series: [
          {
            data: this.yData1
          },
          {
            data: this.yData2,
          }
        ]
      }
      this.myChart.setOption(options)
    },

    startInterval(){
      // 执行定时器之前需要先清除，因为可能上一个定时器还未执行完毕，就会导致两个定时任务同时执行
      if (this.timer) {
        clearInterval(this.timer)
      }
      this.timer = setInterval(()=>{
        this.curIndex++
        if(this.curIndex > 4){
          this.curIndex = 1
        }
        this.updateChart()
      },4000)
    },

    resizeFun(){
      this.myChart.resize()
    }
  },
};
</script>

<style lang="scss" scoped>
.chart3{
  width: 100%;
  height: 100%;
}
</style>