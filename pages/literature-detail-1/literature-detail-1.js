// pages/literature-detail-1/literature-detail-1.js
Page({
  data: {
    article: {
      id: 1,
      title: '抑郁症的成因与治疗进展',
      author: '白皮书 2025',
      tag: '抑郁症',
      date: '2025-01',
      likes: 256,
      liked: false,
      content: `抑郁症是一种常见的精神疾病，影响着全球数亿人的健康。根据白皮书内容，抑郁症的成因复杂多样，包括生物、心理和社会因素。

**生物因素**
抑郁症的发生与大脑中神经递质（如血清素、去甲肾上腺素和多巴胺）的功能失调密切相关。遗传因素也起到重要作用，有家族史的人群患病风险更高。神经影像学研究表明，抑郁症患者的某些脑区（如前额叶皮层、海马体等）结构和功能存在异常。

**心理因素**
认知理论认为，消极的思维模式和负性认知偏差是抑郁症发生和维持的重要原因。童年创伤、长期压力、自我评价过低等因素都可能增加患抑郁症的风险。

**社会因素**
人际关系冲突、重大生活事件（如丧亲、离婚、失业）、社会支持不足等社会环境因素也会诱发或加重抑郁症状。

**治疗方法**
现代医学提供了多种有效的抑郁症治疗方法：

1. **药物治疗**：抗抑郁药如SSRIs、SNRIs等能够调节神经递质水平，缓解抑郁症状。
2. **心理治疗**：认知行为疗法(CBT)、人际疗法(IPT)等被证明对抑郁症有显著疗效。
3. **物理治疗**：电休克疗法(ECT)、重复经颅磁刺激(rTMS)等适用于重度抑郁症患者。
4. **生活方式调整**：规律运动、健康饮食、充足睡眠和社会支持都有助于改善症状。

近年来，数字化治疗、精准医疗和新型药物的研发为抑郁症治疗带来了新的希望。`,
      comments: [
        {
          id: 1,
          user: '心理健康关注者',
          avatar: 'https://via.placeholder.com/40',
          content: '非常有用的信息，对我理解抑郁症很有帮助！',
          time: '2小时前',
          likes: 3
        },
        {
          id: 2,
          user: '专业心理咨询师',
          avatar: 'https://via.placeholder.com/40',
          content: '文章总结得很全面，特别是关于综合治疗方法的部分。',
          time: '1天前',
          likes: 12
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

