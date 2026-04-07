// pages/splash/splash.js
Page({
  data: {
    bubbles: [],
    selectedCount: 0,
    selectedNumbers: [],
    showPopEffect: false,
    popEffectX: 0,
    popEffectY: 0
  },

  // 容器边界
  containerBounds: {
    left: 60,
    right: 690,
    top: 350,
    bottom: 1200
  },

  onLoad() {
    this.initBubbles()
    this.startPhysics()
  },

  onUnload() {
    // 清除定时器
    if (this.physicsTimer) {
      clearInterval(this.physicsTimer)
    }
  },

  // 初始化10个数字泡泡，网格分布 to prevent overlap
  initBubbles() {
    const colors = [
      '#FF6B9D', '#4ECDC4', '#95E1D3', '#F38181', '#AA96DA',
      '#FCBAD3', '#FFD3A5', '#A8E6CF', '#FFD89B', '#C7CEEA'
    ]
    
    const bubbles = []
    const bubbleRadius = 60 // 泡泡半径rpx
    const bounds = this.containerBounds
    
    // Calculate grid dimensions to fit 10 bubbles
    const cols = 4;
    const rows = 3; // ceil(10/4) = 3
    
    // Generate 10 bubbles with grid-based initial positions
    for (let i = 0; i < 10; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      
      // Calculate grid cell dimensions
      const cellWidth = (bounds.right - bounds.left) / cols;
      const cellHeight = (bounds.bottom - bounds.top) / rows;
      
      // Position in the center of each grid cell
      const x = bounds.left + col * cellWidth + cellWidth / 2;
      const y = bounds.top + row * cellHeight + cellHeight / 2;
      
      // Random speed (rpx/frame)
      const speed = 0.2 + Math.random() * 0.4 // 0.2-0.6 rpx/帧，减慢移动速度
      const angle = Math.random() * Math.PI * 2
      
      bubbles.push({
        id: i,
        number: i + 1,
        x: x,
        y: y,
        vx: Math.cos(angle) * speed, // 速度向量X
        vy: Math.sin(angle) * speed, // 速度向量Y
        radius: bubbleRadius,
        color: colors[i],
        originalColor: colors[i], // 保存原始颜色
        popped: false,
        selected: false,
        lastCollisionTime: 0 // 防止连续碰撞
      })
    }
    
    this.setData({
      bubbles: bubbles
    })
  },

  // 物理引擎主循环
  startPhysics() {
    const that = this
    const bounds = this.containerBounds
    
    this.physicsTimer = setInterval(() => {
      const bubbles = that.data.bubbles
      let needUpdate = false
      
      for (let i = 0; i < bubbles.length; i++) {
        const bubble = bubbles[i]
        if (bubble.popped) continue
        
        // 更新位置
        bubble.x += bubble.vx
        bubble.y += bubble.vy
        
        // 边界碰撞检测和反弹
        if (bubble.x - bubble.radius <= bounds.left || bubble.x + bubble.radius >= bounds.right) {
          bubble.vx = -bubble.vx
          bubble.x = Math.max(bounds.left + bubble.radius, Math.min(bounds.right - bubble.radius, bubble.x))
        }
        if (bubble.y - bubble.radius <= bounds.top || bubble.y + bubble.radius >= bounds.bottom) {
          bubble.vy = -bubble.vy
          bubble.y = Math.max(bounds.top + bubble.radius, Math.min(bounds.bottom - bubble.radius, bubble.y))
        }
        
        // 泡泡之间碰撞检测
        for (let j = i + 1; j < bubbles.length; j++) {
          const other = bubbles[j]
          if (other.popped) continue
          
          const dx = other.x - bubble.x
          const dy = other.y - bubble.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const minDistance = bubble.radius + other.radius
          
          if (distance < minDistance && distance > 0) {
            // 碰撞发生
            const now = Date.now()
            
            // 防止连续碰撞（至少间隔50ms）
            if (now - bubble.lastCollisionTime > 50 && now - other.lastCollisionTime > 50) {
              // 碰撞反弹（弹性碰撞）
              const angle = Math.atan2(dy, dx)
              const sin = Math.sin(angle)
              const cos = Math.cos(angle)
              
              // 旋转速度向量
              const vx1 = bubble.vx * cos + bubble.vy * sin
              const vy1 = bubble.vy * cos - bubble.vx * sin
              const vx2 = other.vx * cos + other.vy * sin
              const vy2 = other.vy * cos - other.vx * sin
              
              // 交换X方向速度（假设质量相等）
              const tempVx = vx1
              bubble.vx = vx2 * cos - vy1 * sin
              bubble.vy = vy1 * cos + vx2 * sin
              other.vx = tempVx * cos - vy2 * sin
              other.vy = vy2 * cos + tempVx * sin
              
              // 分离重叠的泡泡
              const overlap = minDistance - distance
              const separationX = (dx / distance) * overlap * 0.5
              const separationY = (dy / distance) * overlap * 0.5
              bubble.x -= separationX
              bubble.y -= separationY
              other.x += separationX
              other.y += separationY
              
              // 碰撞后变色
              that.changeColorOnCollision(bubble)
              that.changeColorOnCollision(other)
              
              bubble.lastCollisionTime = now
              other.lastCollisionTime = now
            }
            
            needUpdate = true
          }
        }
        
        needUpdate = true
      }
      
      if (needUpdate) {
        that.setData({
          bubbles: bubbles
        })
      }
    }, 16) // 约60fps
  },

  // 碰撞后变色 - 使用随机颜色，但避免过浅的颜色
  changeColorOnCollision(bubble) {
    const colorPalette = [
      '#FF6B9D', '#4ECDC4', '#95E1D3', '#F38181', '#AA96DA',
      '#FCBAD3', '#FFD3A5', '#A8E6CF', '#FFD89B', '#C7CEEA',
      '#FFB6C1', '#87CEEB', '#98D8C8', '#F7DC6F', '#BB8FCE'
    ];
    
    let newColor;
    let attempts = 0;
    const maxAttempts = 50; // 防止无限循环
    
    // 循环查找不是当前颜色且不太浅的颜色
    do {
      newColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      attempts++;
      
      // 如果尝试次数过多，就接受当前颜色以避免卡住
      if (attempts >= maxAttempts) {
        break;
      }
    } while (newColor === bubble.color && attempts < maxAttempts);
    
    bubble.color = newColor;
  },

  // 点击泡泡
  onBubbleTap(e) {
    const id = e.currentTarget.dataset.id
    const bubbles = this.data.bubbles
    const bubble = bubbles[id]
    
    // 如果已经选择了3个，不能再选择
    if (this.data.selectedCount >= 3 && !bubble.selected) {
      wx.showToast({
        title: '最多选择3个',
        icon: 'none',
        duration: 1000
      })
      return
    }
    
    // 如果已经被戳破，忽略
    if (bubble.popped) {
      return
    }
    
    // 显示戳破特效（在泡泡位置）
    this.showPopEffect(bubble.x, bubble.y)
    
    // 选择并戳破
    bubbles[id].selected = true
    bubbles[id].popped = true
    // 停止这个泡泡的运动
    bubbles[id].vx = 0
    bubbles[id].vy = 0
    
    const selectedNumbers = [...this.data.selectedNumbers, bubble.number]
    const selectedCount = this.data.selectedCount + 1
    
    this.setData({
      bubbles: bubbles,
      selectedCount: selectedCount,
      selectedNumbers: selectedNumbers
    })
    
    // 如果选择了3个，延迟跳转到下一步
    if (selectedCount === 3) {
      setTimeout(() => {
        this.handleFirstStepComplete()
      }, 800)
    }
  },

  // 点击跳过按钮，直接进入第二个泡泡页
  onSkipTap() {
    wx.setStorageSync('bubbleSkippedStep1', true)
    this.navigateToSecondPage()
  },

  // 显示戳破特效（CSS动画，不使用emoji）
  showPopEffect(x, y) {
    this.setData({
      showPopEffect: true,
      popEffectX: x,
      popEffectY: y
    })
    setTimeout(() => {
      this.setData({
        showPopEffect: false
      })
    }, 600)
  },

  // 第一个泡泡页完成时的处理
  handleFirstStepComplete() {
    wx.removeStorageSync('bubbleSkippedStep1')
    // 保存选择的数字到本地存储，区分第一步
    wx.setStorageSync('selectedNumbersStep1', this.data.selectedNumbers)

    wx.showToast({
      title: '选择完成！',
      icon: 'success',
      duration: 800
    })

    setTimeout(() => {
      this.navigateToSecondPage()
    }, 800)
  },

  // 跳转到第二个泡泡页
  navigateToSecondPage() {
    wx.redirectTo({
      url: '/pages/splash2/splash2'
    })
  },

  // 兜底：如果需要直接回首页，可调用（未被当前流程使用）
  navigateToHomeDirect() {
    wx.reLaunch({
      url: '/pages/home/home'
    })
  }
})

