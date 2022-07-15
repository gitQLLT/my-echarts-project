<template>
  <div class="chart-contain" style="position:relative;">
    <div class="chart6" ref="chart6"></div>
    <div class="work-opt">
      <input v-model="inputVal" @keydown.enter="packSeach" placeholder="输入npm包名按enter搜索">
    </div>
  </div>
</template>

<script>
import {getNpmVersions} from '@/api/qqlist.js'
import ecStat from 'echarts-stat';
export default {
  name: 'chart6',

  data() {
    return {
      myChart: null,
      inputVal: 'vue',
      dataList: [],
      setList: []
    };
  },

  mounted() {
    this.$echarts.registerTransform(ecStat.transform.clustering);
    this.myChart = this.$echarts.init(this.$refs.chart6)
    this.getData({pack:this.inputVal})
  },

  methods: {
    getData(obj){
      this.myChart.showLoading()
      getNpmVersions(obj).then(res=>{
        this.dataList = res.downloads
        for(let item in this.dataList){
          this.setList.push({
            name: item,
            size: this.dataList[item],
            value: this.dataList[item]
          })
        }
        this.myChart.hideLoading()
        this.updateChart()
      })
    },

    packSeach(){
      this.getData({pack:this.inputVal})
    },

    updateChart(){
      const treemapOption = {
        title: {
          text: 'versions'
        },
        tooltip: {},
        series: [
          {
            type: 'treemap',
            id: 'echarts-package-size',
            animationDurationUpdate: 1000,
            roam: false,
            nodeClick: undefined,
            data: this.setList,
            universalTransition: true,
            label: {
              show: true
            },
            breadcrumb: {
              show: false
            }
          }
        ]
      };
      const sunburstOption = {
        title: {
          text: 'versions'
        },
        tooltip: {},
        series: [
          {
            type: 'sunburst',
            id: 'echarts-package-size',
            radius: ['20%', '90%'],
            animationDurationUpdate: 1000,
            nodeClick: undefined,
            data: this.setList,
            universalTransition: true,
            itemStyle: {
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,.5)'
            },
            label: {
              show: false
            }
          }
        ]
      };
      let currentOption = treemapOption;
      this.myChart.setOption(currentOption);
      setInterval(()=> {
        currentOption =
          currentOption === treemapOption ? sunburstOption : treemapOption;
        this.myChart.setOption(currentOption);
      }, 8000);
    },

    resizeFun(){
      this.myChart.resize()
    }
  },
};
</script>

<style lang="scss" scoped>
.chart-contain,.chart6{
  width: 100%;
  height: 100%;
}
.work-opt{
  position: absolute;
  right: 10%;
  top: 10px;
  input{
    width: 120px;
    height: 19.8px;
    line-height: 19.8px;
    box-sizing: border-box;
    &:focus-visible{
      outline: none;
    }
  }
}
</style>