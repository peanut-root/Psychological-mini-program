// pages/literature/literature.js
Page({
  data: {
    currentCategory: 'all',
    categories: [
      { id: 'all', name: '全部' },
      { id: 'depression', name: '抑郁症' },
      { id: 'anxiety', name: '焦虑症' },
      { id: 'bipolar', name: '双相情感障碍' },
      { id: 'ocd', name: '强迫症' },
      { id: 'ptsd', name: '创伤应激' },
      { id: 'schizophrenia', name: '精神分裂症' },
      { id: 'adhd', name: '注意缺陷多动障碍' },
      { id: 'substance', name: '物质滥用' },
      { id: 'phobia', name: '恐惧症' }
    ],
    literatureList: [
      { 
        id: 1, 
        title: '抑郁症的成因与治疗进展',
        tag: '抑郁症',
        likes: 0,
        summary: '深入探讨抑郁症的生物、心理和社会因素，以及最新的治疗方法。'
      },
      { 
        id: 2, 
        title: '焦虑症的认知行为治疗策略',
        tag: '焦虑症',
        likes: 0,
        summary: '详细介绍焦虑症的认知行为治疗理论基础与实践应用。'
      },
      { 
        id: 3, 
        title: '双相情感障碍的情绪调节机制',
        tag: '双相情感障碍',
        likes: 0,
        summary: '分析双相情感障碍患者情绪波动的神经机制及应对策略。'
      },
      { 
        id: 4, 
        title: '强迫症的神经环路研究',
        tag: '强迫症',
        likes: 0,
        summary: '探索强迫症相关的脑区活动模式与干预靶点。'
      },
      { 
        id: 5, 
        title: 'PTSD的心理创伤恢复路径',
        tag: '创伤应激',
        likes: 0,
        summary: '研究创伤后应激障碍的康复过程与有效干预措施。'
      },
      { 
        id: 6, 
        title: '精神分裂症的早期识别与干预',
        tag: '精神分裂症',
        likes: 0,
        summary: '探讨精神分裂症的早期症状识别与预防性治疗策略。'
      },
      { 
        id: 7, 
        title: 'ADHD儿童的行为管理方法',
        tag: '注意缺陷多动障碍',
        likes: 0,
        summary: '提供针对ADHD儿童的有效行为管理技巧与教育方案。'
      },
      { 
        id: 8, 
        title: '物质依赖的综合治疗模式',
        tag: '物质滥用',
        likes: 0,
        summary: '介绍物质依赖的生物-心理-社会综合治疗方法。'
      },
      { 
        id: 9, 
        title: '特定恐惧症的暴露疗法',
        tag: '恐惧症',
        likes: 0,
        summary: '分析特定恐惧症暴露疗法的技术要点与疗效评估。'
      }
    ]
  },

  onLoad() {},

  // 切换分类
  onCategoryChange(e) {
    const id = e.currentTarget.dataset.id
    this.setData({
      currentCategory: id
    })
    
    // 根据分类筛选文献
    this.filterLiteratureByCategory(id);
  },

  filterLiteratureByCategory(category) {
    if (category === 'all') {
      this.setData({
        filteredLiteratureList: this.data.literatureList
      });
    } else {
      const filtered = this.data.literatureList.filter(item => 
        item.tag.toLowerCase().includes(category) || 
        (category === 'depression' && item.tag.includes('抑郁')) ||
        (category === 'anxiety' && item.tag.includes('焦虑')) ||
        (category === 'bipolar' && (item.tag.includes('双相') || item.tag.includes('双向'))) ||
        (category === 'ocd' && item.tag.includes('强迫')) ||
        (category === 'ptsd' && (item.tag.includes('创伤') || item.tag.includes('应激'))) ||
        (category === 'schizophrenia' && item.tag.includes('精神分裂')) ||
        (category === 'adhd' && item.tag.includes('注意缺陷多动')) ||
        (category === 'substance' && (item.tag.includes('物质') || item.tag.includes('滥用'))) ||
        (category === 'phobia' && item.tag.includes('恐惧'))
      );
      
      this.setData({
        filteredLiteratureList: filtered
      });
    }
  },

  onShow() {
    // 页面显示时初始化文献列表
    this.setData({
      filteredLiteratureList: this.data.literatureList
    });
  },

  // 跳转到搜索页面
  goSearch() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },

  // 跳转到文献详情
  navigateToDetail(e) {
    const id = e.currentTarget.dataset.id
    // 所有文章都使用相同的模板页面，通过参数区分内容
    wx.navigateTo({
      url: `/pages/literature-detail/literature-detail?id=${id}`
    })
  },

  goBack() {
    wx.navigateBack()
  }
})

