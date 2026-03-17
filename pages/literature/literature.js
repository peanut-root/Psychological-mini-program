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
      { id: 'phobia', name: '恐惧症' },
      { id: 'somatic', name: '躯体化障碍' },
      { id: 'paraphilia', name: '性偏好障碍' }
    ],
    literatureList: [
      { 
        id: 1, 
        title: '抑郁症',
        tag: '抑郁症',
        likes: 0,
        summary: '包含病名、俗称、症状、DSM-5诊断标准、治疗方式与常见误解澄清等内容。'
      },
      { 
        id: 2, 
        title: '焦虑症',
        tag: '焦虑症',
        likes: 0,
        summary: '包含俗称、症状、DSM-5诊断标准、治疗方式与常见误解澄清等内容。'
      },
      { 
        id: 3, 
        title: '双相情感障碍',
        tag: '双相情感障碍',
        likes: 0,
        summary: '包含俗称、症状、DSM-5诊断标准、治疗方式与常见误解澄清等内容。'
      },
      { 
        id: 4, 
        title: '强迫症',
        tag: '强迫症',
        likes: 0,
        summary: '包含俗称、症状、DSM-5诊断标准、治疗方式与常见误解澄清等内容。'
      },
      { 
        id: 5, 
        title: '创伤后应激障碍',
        tag: '创伤应激',
        likes: 0,
        summary: '包含PTSD俗称、症状、诊断标准、治疗方式与常见误解澄清等内容。'
      },
      { 
        id: 6, 
        title: '精神分裂症',
        tag: '精神分裂症',
        likes: 0,
        summary: '包含俗称、症状、ICD-11诊断标准、治疗方式与常见误解澄清等内容。'
      },
      { 
        id: 7, 
        title: '注意缺陷多动障碍',
        tag: '注意缺陷多动障碍',
        likes: 0,
        summary: '包含俗称、症状、DSM-5诊断标准、治疗方式与常见误解澄清等内容。'
      },
      { 
        id: 8, 
        title: '物质使用障碍',
        tag: '物质滥用',
        likes: 0,
        summary: '包含俗称、症状、ICD-11诊断标准、治疗方式与常见误解澄清等内容。'
      },
      { 
        id: 9, 
        title: '特定恐惧症',
        tag: '恐惧症',
        likes: 0,
        summary: '包含俗称、症状、诊断要点、治疗方式与常见误解澄清等内容。'
      },
      { 
        id: 10, 
        title: '躯体化障碍',
        tag: '躯体化障碍',
        likes: 0,
        summary: '包含俗称、症状、DSM-5诊断标准、治疗方式与常见误解澄清等内容。'
      },
      { 
        id: 11, 
        title: '性偏好障碍',
        tag: '性偏好障碍',
        likes: 0,
        summary: '包含俗称、症状、诊断标准、治疗方式与常见误解澄清等内容。'
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
        (category === 'phobia' && item.tag.includes('恐惧')) ||
        (category === 'somatic' && (item.tag.includes('躯体') || item.tag.includes('躯体化'))) ||
        (category === 'paraphilia' && (item.tag.includes('性偏好') || item.tag.includes('性欲倒错')))
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

