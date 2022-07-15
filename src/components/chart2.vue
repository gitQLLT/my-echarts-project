<template>
  <div class="chart2" ref="chart2"></div>
</template>

<script>
import {getRankList} from '@/api/qqlist'
export default {
  name: 'chart2',

  data() {
    return {
      myChart: null,
      dataList: []
    };
  },

  mounted() {
    this.myChart = this.$echarts.init(this.$refs.chart2)
    this.getData()
  },

  methods: {
    getData(){
      getRankList().then(res=>{
        this.dataList = res.req_3.data.group
        this.updateChart()
      })
    },

    updateChart(){
      let data = this.dataList.map(item=>{
        return {value: item.toplist.length,name:item.groupName}
      })
      let options = {
        title: {
          text: '排行榜'
        },
        tooltip: {},
        toolbox: {
          show: false
        },
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            labelLine: {
              show: false
            },
            data: data
          }
        ]
      }
      this.myChart.setOption(options)
      this.myChart.on('click',params=>{
        console.log(this.dataList.filter(item=>item.groupName===params.name))
        let list = this.dataList.filter(item=>item.groupName===params.name)[0].toplist
        let xData = list.map(item=>item.musichallTitle)
        let yData = list.map(item=>item.listenNum)
        let option = {
          title: {
            text: '排行榜'
          },
          tooltip: {},
          grid: {
            left: '15%',
          },
          xAxis: {
            type: 'category',
            axisLabel:{
              rotate: 60
            },
            data: xData
          },
          yAxis: {
            type: 'value',
            name: '收听次数'
          },
          toolbox: {
            show: true,
            feature: {
              myTool1: {
                show: true,
                title: '返回',
                icon: 'M339 220.1l-17.6-15.4L49.8 515.4h5.1l-5 5.2 272.2 260.5 16.1-16.8-260-248.9H894V492H101.2z',
                onclick: ()=>{
                  this.myChart.setOption(options,true)
                }
              },
              dataView: { readOnly: false },
              magicType: { type: ['line', 'bar'] },
              restore: {}
            }
          },
          series: [
            {
              data: yData,
              type: 'line',
            }
          ]
        }
        this.myChart.setOption(option,true)
      })
    },

    resizeFun(){
      this.myChart.resize()
    }
  },
};
</script>

<style lang="scss" scoped>
.chart2{
  width: 100%;
  height: 100%;
}
</style>