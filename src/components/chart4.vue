<template>
  <div class="chart4" ref="chart4"></div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'chart4',

  data() {
    return {
      myChart: null,
      seriesData: [
        {name: '新疆维吾尔自治区', value: '166', obj: {people: '25852345',gdp: '15983.65'}},
        {name: '西藏自治区', value: '122.8', obj: {people: '3648100',gdp: '2080.17'}},
        {name: '内蒙古自治区', value: '118.3', obj: {people: '24049155',gdp: '20514.20'}},
        {name: '青海省', value: '72.23', obj: {people: '5923957',gdp: '3346.63'}},
        {name: '四川省', value: '48.14', obj: {people: '83674366',gdp: '53850.79'}},
        {name: '黑龙江省', value: '45.48', obj: {people: '31350088',gdp: '14879.20'}},
        {name: '甘肃省', value: '45.44', obj: {people: '25019831',gdp: '10243.30'}},
        {name: '云南省', value: '38.33', obj: {people: '47209277',gdp: '27146.76'}},
        {name: '广西壮族自治区', value: '23.6', obj: {people: '50126804',gdp: '24740.86'}},
        {name: '湖南省', value: '21.18', obj: {people: '66444864',gdp: '46063.09'}},
        {name: '陕西省', value: '20.56', obj: {people: '39528999',gdp: '29800.98'}},
        {name: '河北省', value: '18.77', obj: {people: '74610235',gdp: '40391.30'}},
        {name: '吉林省', value: '18.74', obj: {people: '24073453',gdp: '13235.52'}},
        {name: '湖北省', value: '18.59', obj: {people: '57752557',gdp: '50012.94'}},
        {name: '广东省', value: '18', obj: {people: '126012510',gdp: '124369.67'}},
        {name: '贵州省', value: '17.6', obj: {people: '38562148',gdp: '19586.42'}},
        {name: '江西省', value: '16.7', obj: {people: '45188635',gdp: '29619.70'}},
        {name: '河南省', value: '16.7', obj: {people: '99365519',gdp: '58887.41'}},
        {name: '山西省', value: '15.63', obj: {people: '34915616',gdp: '22590.16'}},
        {name: '山东省', value: '15.38', obj: {people: '101527453',gdp: '83095.90'}},
        {name: '辽宁省', value: '14.59', obj: {people: '42591407',gdp: '27584.10'}},
        {name: '安徽省', value: '13.97', obj: {people: '61027171',gdp: '42959.20'}},
        {name: '福建省', value: '12.13', obj: {people: '41540086',gdp: '48810.36'}},
        {name: '江苏省', value: '10.26', obj: {people: '84748016',gdp: '116364.20'}},
        {name: '浙江省', value: '10.2', obj: {people: '64567588',gdp: '73515.76'}},
        {name: '重庆市', value: '8.23', obj: {people: '32054159',gdp: '27894.02'}},
        {name: '宁夏回族自治区', value: '6.64', obj: {people: '7202654',gdp: '4522.31'}},
        {name: '台湾省', value: '3.6', obj: {people: '23875314',gdp: '49985.81'}},
        {name: '海南省', value: '3.4', obj: {people: '10081232',gdp: '6475.20'}},
        {name: '北京市', value: '1.68', obj: {people: '21893095',gdp: '40269.60'}},
        {name: '天津市', value: '1.13', obj: {people: '13866009',gdp: '15695.05'}},
        {name: '上海市', value: '0.63', obj: {people: '24870895',gdp: '43214.85'}},
        {name: '香港特别行政区', value: '0.11', obj: {people: '7589499',gdp: '23748.97'}},
        {name: '澳门特别行政区', value: '0.0025', obj: {people: '683218',gdp: '1929.27'}},
      ],
      timer: null,
      historyList: [],
      curIndex: -1
    };
  },

  mounted() {
    this.$refs.chart4.oncontextmenu = ()=>false
    this.initMapEcharts('china');
  },

  methods: {
    initMapEcharts(name){
      axios.get(`/json/${name}.json`).then(res=>{
        this.$echarts.registerMap(name,res.data)
        this.$nextTick(()=>{
          this.myChart&&this.myChart.dispose()
          this.myChart = this.$echarts.init(this.$refs.chart4)
          // 设置基础配置项
          const option = {
            // 标题
            title: {
              text:"地图",
            },
            // 悬浮窗
            tooltip: {
              trigger: 'item',
              textStyle: {
                align: 'left'
              },
              formatter: params=> {
                const item = this.seriesData.find(item=>item.name===params.name)
                if(item){
                  return `${params.name}<br>
                  面积：${params.value+ ' 万平方公里' || 0}<br>
                  人口：${item.obj.people+ ' 人' || 0}<br>
                  GDP：${item.obj.gdp+ ' 亿元' || 0}`
                }else{
                  return `${params.name}`
                }
              }
            },
            // 图例
            visualMap: {
              min: 0,
              max: 200,
              text: ['High', 'Low'],
              itemHeight: '50',
              realtime: false,
              calculable: true,
              inRange: {
                  color: ['lightskyblue', 'yellow', 'orangered']
              }
            },
            // 要显示的散点数据
            series: [
              {
                type: 'map',
                map: name,
                roam: true,
                // 这是要显示的数据
                data: this.seriesData,
              },
              
            ]
          }
          this.myChart.setOption(option)
          // 点击下钻到省、市、区
          this.myChart.on('click', (params)=> {
            const name = params.name
            let topName = this.myChart.getOption().series[0].map
            this.historyList.push(topName)
            this.initMapEcharts(name);
          })
          // 鼠标右键返回上一级
          this.myChart.on("contextmenu", () => {
            if(this.historyList.length){
              const name = this.historyList.pop()
              this.initMapEcharts(name);
            }
          });
          // 设置定时器，自动循环触发tooltip悬浮窗事件
          this.setTimer()
          // 当鼠标在地图上时，停止自动tooltip事件
          this.myChart.on('mouseover', ()=> {
            clearInterval(this.timer)
          })
          // 当鼠标移出地图后，再自动tooltip
          this.myChart.on('mouseout', ()=> {
            this.setTimer()
          })
        })
      }).catch(err=>{
        console.log(err)
      })
    },

    setTimer() {
      // 当前选中区域的下标
      this.timer && clearInterval(this.timer)
      this.timer = setInterval(() => {
        const len = this.seriesData.length;
        // dispatchAction是主动去触发echarts事件，取消高亮当前的数据图形
        this.myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: this.curIndex
        })
        // 下一个选中区域的下标
        this.curIndex = (this.curIndex + 1) % len;
        // 高亮下一个数据图形
        this.myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: this.curIndex
        })
        // 显示tooltip
        this.myChart.dispatchAction({
          type: 'showTip',
          seriesIndex:0,
          dataIndex: this.curIndex
        })
      }, 2100)
    },

    resizeFun(){
      this.myChart.resize()
    }
  },
};
</script>

<style lang="scss" scoped>
.chart4{
  width: 100%;
  height: 100%;
}
</style>