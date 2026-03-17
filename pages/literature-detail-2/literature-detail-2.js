// pages/literature-detail-2/literature-detail-2.js
Page({
  data: {
    article: {
      id: 2,
      title: '焦虑症的认知行为治疗策略',
      author: '白皮书 2025',
      tag: '焦虑症',
      date: '2025-01',
      likes: 189,
      liked: false,
      content: `焦虑症是最常见的精神障碍之一，表现为过度担忧、紧张不安、自主神经功能紊乱等症状。根据白皮书内容，认知行为疗法(CBT)是治疗焦虑症最有效的心理治疗方法之一。

**焦虑症的类型**
焦虑症包含多种类型，包括广泛性焦虑障碍(GAD)、恐慌障碍、社交焦虑障碍、特定恐惧症等。每种类型的症状表现和治疗方法略有不同，但都具有核心的焦虑特征。

**认知行为疗法原理**
CBT基于认知、情绪和行为之间的相互关系。焦虑症状往往源于错误的认知模式和回避行为。通过识别和改变这些负面思维模式，学习新的应对技能，可以有效减轻焦虑症状。

**治疗技术**
1. **认知重构**：识别并挑战焦虑相关的自动思维和核心信念
2. **暴露疗法**：逐步面对恐惧情境，减少回避行为
3. **放松训练**：学习深呼吸、渐进性肌肉放松等技巧
4. **正念练习**：培养对当下经验的非评判性觉察
5. **行为实验**：验证恐惧想法的真实性

**治疗过程**
CBT通常包括12-20次会谈，治疗师会根据患者具体情况制定个性化治疗计划。治疗过程中强调家庭作业和现实生活中的练习，以巩固治疗效果。

**疗效评估**
大量研究证实CBT对各种焦虑障碍均有显著疗效，且效果持久。许多患者在治疗结束后仍能保持良好状态，复发率较低。`,
      comments: [
        {
          id: 1,
          user: '焦虑症康复者',
          avatar: 'https://via.placeholder.com/40',
          content: 'CBT真的很有帮助，我就是通过这种疗法改善了很多！',
          time: '3小时前',
          likes: 5
        },
        {
          id: 2,
          user: '心理咨询学生',
          avatar: 'https://via.placeholder.com/40',
          content: '文章很好地总结了CBT的核心要素，学习了！',
          time: '1天前',
          likes: 8
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

