<template>
  <div class="chart1" ref="chart1"></div>
</template>

<script>
import {getCSDNRank} from '@/api/qqlist'
export default {
  name: 'chart1',

  data() {
    return {
      myChart: null,
      dataList: []
    };
  },

  mounted() {
    this.myChart = this.$echarts.init(this.$refs.chart1)
    this.getData()
  },

  methods: {
    getData(){
      getCSDNRank().then(res=>{
        this.dataList = res.data.list
        this.updateChart()
      })
    },

    updateChart(){
      const colors = ['#5470C6', '#91CC75', '#EE6666'];
      let xData = this.dataList.map(item=>item.nickName)
      let yData1 = this.dataList.map(item=>item.fansCount)
      let yData2 = this.dataList.map(item=>item.diggCount)
      let yData3 = this.dataList.map(item=>item.hotRankScore)
      let options = {
        color: colors,
        title: {
          text: 'CSDN'
        },
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
          left: '12%',
          right: '22%'
        },
        legend: {
          data: ['fans', 'digg', 'score']
        },
        xAxis: [
          {
            type: 'category',
            axisLabel: {
              rotate: 60
            },
            axisTick: {
              alignWithLabel: true
            },
            // prettier-ignore
            data: xData
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'digg',
            position: 'right',
            alignTicks: true,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[0]
              }
            },
          },
          {
            type: 'value',
            name: 'score',
            position: 'right',
            alignTicks: true,
            offset: 60,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[1]
              }
            },
          },
          {
            type: 'value',
            name: 'fans',
            position: 'left',
            alignTicks: true,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[2]
              }
            },
          }
        ],
        series: [
          {
            name: '点赞数',
            type: 'bar',
            data: yData2
          },
          {
            name: '热度指数',
            type: 'bar',
            yAxisIndex: 1,
            data: yData3
          },
          {
            name: '粉丝数',
            type: 'line',
            yAxisIndex: 2,
            data: yData1
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
.chart1{
  width: 100%;
  height: 100%;
}
</style>