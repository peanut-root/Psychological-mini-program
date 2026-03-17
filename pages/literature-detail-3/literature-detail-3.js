// pages/literature-detail-3/literature-detail-3.js
Page({
  data: {
    article: {
      id: 3,
      title: '双相情感障碍的情绪调节机制',
      author: '白皮书 2024',
      tag: '双相情感障碍',
      date: '2024-12',
      likes: 412,
      liked: false,
      content: `双相情感障碍（旧称躁郁症）是一种严重的精神疾病，特征为情绪在躁狂（或轻躁狂）和抑郁之间极端波动。根据白皮书内容，了解其情绪调节机制对于治疗和管理至关重要。

**疾病概述**
双相情感障碍影响约1-3%的世界人口，发病年龄多在青少年晚期至成年早期。该疾病不仅影响情绪，还会影响能量水平、活动水平、判断力和行为。

**神经生物学基础**
1. **神经递质系统**：多巴胺、血清素和去甲肾上腺素的不平衡是情绪波动的基础
2. **脑结构异常**：前额叶皮质、杏仁核和海马体等区域的结构和功能异常
3. **神经回路**：情绪调节相关的神经网络连接异常

**情绪波动特点**
- **躁狂期**：情绪高涨、精力充沛、睡眠需求减少、思维奔逸、冲动行为
- **抑郁期**：情绪低落、兴趣缺失、疲劳、睡眠过多、自杀意念
- **混合状态**：同时出现躁狂和抑郁症状

**情绪调节策略**
1. **药物治疗**：
   - 心境稳定剂（如锂盐）
   - 抗癫痫药物（如丙戊酸钠、拉莫三嗪）
   - 非典型抗精神病药

2. **心理治疗**：
   - 认知行为疗法
   - 家庭焦点治疗
   - 人际与社会节律疗法
   - 正念认知疗法

3. **生活方式管理**：
   - 规律作息
   - 避免酒精和毒品
   - 压力管理
   - 社会支持

**预后与管理**
通过适当的治疗和管理，大多数双相情感障碍患者可以过上正常、富有成效的生活。关键在于早期识别、及时治疗和持续管理。`,
      comments: [
        {
          id: 1,
          user: '双相情感障碍患者家属',
          avatar: 'https://via.placeholder.com/40',
          content: '感谢这篇详细的介绍，帮助我们更好地理解这个疾病。',
          time: '5小时前',
          likes: 7
        },
        {
          id: 2,
          user: '精神科医生',
          avatar: 'https://via.placeholder.com/40',
          content: '文章涵盖了双相情感障碍的主要方面，对公众教育很有价值。',
          time: '2天前',
          likes: 15
        }
      ]
    },
    newComment: '',
    showCommentInput: false
  },

  onLoad(options) {
    // 获取文章数据
    this.loadArticleData();
  },

  loadArticleData() {
    // 在实际应用中，这里可以从服务器获取具体的文章数据
    // 目前使用模拟数据
  },

  onLike() {
    const liked = !this.data.article.liked;
    let likes = this.data.article.likes;
    if (liked) {
      likes += 1;
    } else {
      likes -= 1;
    }

    this.setData({
      'article.liked': liked,
      'article.likes': likes
    });

    wx.showToast({
      title: liked ? '已点赞' : '已取消点赞',
      icon: 'none'
    });
  },

  onShare() {
    wx.showActionSheet({
      itemList: ['分享到微信好友', '分享到朋友圈', '分享到QQ'],
      success(res) {
        console.log('用户选择了第' + (res.tapIndex + 1) + '项');
      },
      fail(res) {
        console.log(res.errMsg);
      }
    });
  },

  showCommentInput() {
    this.setData({
      showCommentInput: true
    });
  },

  hideCommentInput() {
    this.setData({
      showCommentInput: false,
      newComment: ''
    });
  },

  onCommentInput(e) {
    this.setData({
      newComment: e.detail.value
    });
  },

  submitComment() {
    if (!this.data.newComment.trim()) {
      wx.showToast({
        title: '请输入评论内容',
        icon: 'none'
      });
      return;
    }

    const newComment = {
      id: Date.now(),
      user: '当前用户',
      avatar: 'https://via.placeholder.com/40',
      content: this.data.newComment,
      time: '刚刚',
      likes: 0
    };

    const comments = [newComment, ...this.data.article.comments];
    
    this.setData({
      'article.comments': comments,
      newComment: '',
      showCommentInput: false
    });

    wx.showToast({
      title: '评论成功',
      icon: 'success'
    });
  },

  onCommentLike(e) {
    const index = e.currentTarget.dataset.index;
    const comments = [...this.data.article.comments];
    comments[index].likes += 1;

    this.setData({
      'article.comments': comments
    });
  },

  goBack() {
    wx.navigateBack();
  }
})

