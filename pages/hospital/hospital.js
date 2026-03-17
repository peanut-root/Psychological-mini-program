Page({
  data: {
    regionIndex: 0,
    regions: [],
    hospitalData: {
      "北京市": {
        comprehensive: { name: "首都医科大学附属北京协和医院", desc: "心理医学科：三甲综合，覆盖全年龄段心理障碍评估与干预", latitude: 39.914, longitude: 116.417 },
        specialized: { name: "北京大学第六医院", desc: "国家精神心理疾病临床医学研究中心：三甲专科，擅长精神分裂症、抑郁症等", latitude: 39.919, longitude: 116.353 }
      },
      "上海市": {
        comprehensive: { name: "复旦大学附属中山医院", desc: "心理医学科：三甲综合，心身医学与躯体疾病伴发心理问题诊疗突出", latitude: 31.199, longitude: 121.455 },
        specialized: { name: "上海市精神卫生中心", desc: "三甲专科，华东地区领军，设老年、儿少、临床心理等专科", latitude: 31.194, longitude: 121.442 }
      },
      "天津市": {
        comprehensive: { name: "天津医科大学总医院", desc: "临床心理科：三甲综合，神经心理与认知障碍评估优势明显", latitude: 39.111, longitude: 117.185 },
        specialized: { name: "天津市安定医院", desc: "三甲专科，擅长心境障碍、焦虑障碍、成瘾性疾病治疗", latitude: 39.085, longitude: 117.205 }
      },
      "重庆市": {
        comprehensive: { name: "重庆医科大学附属第一医院", desc: "精神科：三甲综合，精神疾病与躯体共病诊疗能力强", latitude: 29.544, longitude: 106.528 },
        specialized: { name: "重庆市精神卫生中心", desc: "三级专科，全市精神卫生技术指导中心", latitude: 29.621, longitude: 106.505 }
      },
      "广东省": {
        comprehensive: { name: "广东省人民医院", desc: "精神卫生中心：三甲综合，心身医学与躯体疾病伴发心理问题诊疗突出", latitude: 23.125, longitude: 113.284 },
        specialized: { name: "广州医科大学附属脑科医院", desc: "三甲专科，华南地区历史最悠久的精神专科医院", latitude: 23.104, longitude: 113.235 }
      },
      "浙江省": {
        comprehensive: { name: "浙江大学医学院附属第二医院", desc: "精神科：三甲综合，神经精神疾病与心理治疗结合", latitude: 30.252, longitude: 120.174 },
        specialized: { name: "杭州市第七人民医院", desc: "三甲专科，擅长抑郁症、焦虑障碍、儿童青少年精神障碍", latitude: 30.244, longitude: 120.115 }
      },
      "江苏省": {
        comprehensive: { name: "南京大学医学院附属鼓楼医院", desc: "临床心理科：三甲综合，心身医学与躯体疾病伴发心理问题诊疗", latitude: 32.054, longitude: 118.783 },
        specialized: { name: "南京医科大学附属脑科医院", desc: "三甲专科，华东地区重要精神卫生机构", latitude: 32.051, longitude: 118.766 }
      },
      "四川省": {
        comprehensive: { name: "四川大学华西医院", desc: "心理卫生中心：三甲综合，全国顶尖，覆盖全年龄段心理障碍与精神疾病", latitude: 30.642, longitude: 104.062 },
        specialized: { name: "成都市第四人民医院", desc: "三甲专科，擅长抑郁症、焦虑障碍、儿童青少年精神障碍", latitude: 30.686, longitude: 104.032 }
      },
      "湖北省": {
        comprehensive: { name: "武汉大学人民医院", desc: "精神卫生中心：三甲综合，心身医学与神经心理评估优势明显", latitude: 30.542, longitude: 114.298 },
        specialized: { name: "武汉市精神卫生中心", desc: "三甲专科，华中地区领军，设老年、儿少、临床心理等专科", latitude: 30.621, longitude: 114.285 }
      },
      "湖南省": {
        comprehensive: { name: "中南大学湘雅二医院", desc: "精神卫生研究所：三甲综合，全国精神医学顶尖，覆盖全谱系精神障碍", latitude: 28.188, longitude: 112.992 },
        specialized: { name: "湖南省脑科医院", desc: "三甲专科，集神经与精神疾病诊疗于一体", latitude: 28.155, longitude: 112.985 }
      },
      "山东省": {
        comprehensive: { name: "山东大学齐鲁医院", desc: "精神卫生中心：三甲综合，神经精神药理与临床研究领先", latitude: 36.658, longitude: 117.018 },
        specialized: { name: "山东省精神卫生中心", desc: "三甲专科，华东地区重要精神卫生机构", latitude: 36.651, longitude: 117.065 }
      },
      "陕西省": {
        comprehensive: { name: "西安交通大学第一附属医院", desc: "精神心理卫生科：三甲综合，心身医学与睡眠障碍诊疗领先", latitude: 34.218, longitude: 108.945 },
        specialized: { name: "陕西省精神卫生中心", desc: "三级专科，擅长心境障碍、焦虑障碍、成瘾性疾病", latitude: 34.195, longitude: 109.005 }
      }
    },
    currentHospitals: null
  },

  onLoad() {
    const regions = Object.keys(this.data.hospitalData);
    this.setData({
      regions: regions,
      currentHospitals: this.data.hospitalData[regions[0]]
    });
  },

  onRegionChange(e) {
    const index = e.detail.value;
    const region = this.data.regions[index];
    this.setData({
      regionIndex: index,
      currentHospitals: this.data.hospitalData[region]
    });
  },

  openMap(e) {
    const type = e.currentTarget.dataset.type;
    const hospital = this.data.currentHospitals[type];
    
    if (hospital && hospital.latitude && hospital.longitude) {
      wx.openLocation({
        latitude: Number(hospital.latitude),
        longitude: Number(hospital.longitude),
        name: hospital.name,
        address: hospital.desc,
        scale: 18
      });
    } else {
      wx.showToast({
        title: '暂无位置信息',
        icon: 'none'
      });
    }
  }
});