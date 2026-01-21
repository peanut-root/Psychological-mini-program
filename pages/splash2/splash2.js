// pages/splash2/splash2.js
Page({
    data: {
      bubbles: [],
      selectedCount: 0,
      selectedNumbers: [], // 后续可改为selectedTexts，保持兼容暂先保留
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
  
    // 文字基础配置（可自定义调整）
    textConfig: {
      fontSize: 24, // 文字大小（rpx），决定文字基础尺寸
      padding: 20, // 文字与泡泡边缘的内边距（rpx），避免文字紧贴泡泡
      singleCharWidth: 26 // 单个字符/汉字的估算宽度（rpx），适配大多数字体
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
  
    // 初始化10个文字泡泡，随机分布，大小跟随文字
    initBubbles() {
      const colors = [
        '#FF6B9D', '#4ECDC4', '#95E1D3', '#F38181', '#AA96DA',
        '#FCBAD3', '#FFD3A5', '#A8E6CF', '#FFD89B', '#C7CEEA'
      ]
      
      // 【关键1】自定义文字数组（替换原来的数字，可修改为你需要的文字，长度与泡泡数量一致（10个））
      const customTexts = [
        '抑郁症', '焦虑症', '双向情感障碍', '强迫症', '躯体化',
        'ADHD', '（）', '（）', '（）', '（）'
      ]
      
      const bubbles = []
      const bounds = this.containerBounds
      const { fontSize, padding, singleCharWidth } = this.textConfig
      
      // 生成10个泡泡，随机初始位置和速度，大小跟随文字
      for (let i = 0; i < 10; i++) {
        const currentText = customTexts[i]
        
        // 【关键2】计算文字所需宽高，动态生成泡泡半径
        // 1. 计算文字宽度：字符数 * 单个字符宽度（多文字适配）
        const textWidth = currentText.length * singleCharWidth
        // 2. 计算文字高度：字体大小（近似，移动端文字高度与字体大小接近）
        const textHeight = fontSize
        // 3. 计算泡泡最小半径：取文字宽高的最大值 + 内边距，再取一半（圆形泡泡需容纳全部文字）
        const bubbleRadius = Math.max(textWidth, textHeight) / 2 + padding
        
        // 【关键3】随机位置，确保泡泡完整在容器内（使用动态计算的radius，不再是固定值）
        const x = bounds.left + bubbleRadius + Math.random() * (bounds.right - bounds.left - bubbleRadius * 2)
        const y = bounds.top + bubbleRadius + Math.random() * (bounds.bottom - bounds.top - bubbleRadius * 2)
        
        // 随机速度（rpx/帧），速度可根据泡泡大小微调（可选，保持原有逻辑也可）
        const speed = 0.5 + Math.random() * 0.8 // 0.5-1.3 rpx/帧
        const angle = Math.random() * Math.PI * 2
        
        bubbles.push({
          id: i,
          // 【关键4】替换number为text，存储自定义文字
          text: currentText,
          x: x,
          y: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: bubbleRadius, // 【关键5】存入动态计算的泡泡半径，适配物理引擎
          color: colors[i],
          originalColor: colors[i],
          popped: false,
          selected: false,
          lastCollisionTime: 0
        })
      }
      
      this.setData({
        bubbles: bubbles
      })
    },
  
    // 物理引擎主循环（无需大幅修改，原有碰撞逻辑已兼容动态radius）
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
          
          // 边界碰撞检测和反弹（使用动态radius，适配不同大小泡泡）
          if (bubble.x - bubble.radius <= bounds.left || bubble.x + bubble.radius >= bounds.right) {
            bubble.vx = -bubble.vx
            bubble.x = Math.max(bounds.left + bubble.radius, Math.min(bounds.right - bubble.radius, bubble.x))
          }
          if (bubble.y - bubble.radius <= bounds.top || bubble.y + bubble.radius >= bounds.bottom) {
            bubble.vy = -bubble.vy
            bubble.y = Math.max(bounds.top + bubble.radius, Math.min(bounds.bottom - bubble.radius, bubble.y))
          }
          
          // 泡泡之间碰撞检测（minDistance = 两个泡泡的动态radius之和，兼容不同大小泡泡）
          for (let j = i + 1; j < bubbles.length; j++) {
            const other = bubbles[j]
            if (other.popped) continue
            
            const dx = other.x - bubble.x
            const dy = other.y - bubble.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            const minDistance = bubble.radius + other.radius // 【自动适配动态大小】
            
            if (distance < minDistance && distance > 0) {
              const now = Date.now()
              if (now - bubble.lastCollisionTime > 50 && now - other.lastCollisionTime > 50) {
                const angle = Math.atan2(dy, dx)
                const sin = Math.sin(angle)
                const cos = Math.cos(angle)
                
                const vx1 = bubble.vx * cos + bubble.vy * sin
                const vy1 = bubble.vy * cos - bubble.vx * sin
                const vx2 = other.vx * cos + other.vy * sin
                const vy2 = other.vy * cos - other.vx * sin
                
                const tempVx = vx1
                bubble.vx = vx2 * cos - vy1 * sin
                bubble.vy = vy1 * cos + vx2 * sin
                other.vx = tempVx * cos - vy2 * sin
                other.vy = vy2 * cos + tempVx * sin
                
                const overlap = minDistance - distance
                const separationX = (dx / distance) * overlap * 0.5
                const separationY = (dy / distance) * overlap * 0.5
                bubble.x -= separationX
                bubble.y -= separationY
                other.x += separationX
                other.y += separationY
                
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
  
    // 碰撞后变色（无需修改）
    changeColorOnCollision(bubble) {
      const colorPalette = [
        '#FF6B9D', '#4ECDC4', '#95E1D3', '#F38181', '#AA96DA',
        '#FCBAD3', '#FFD3A5', '#A8E6CF', '#FFD89B', '#C7CEEA',
        '#FFB6C1', '#87CEEB', '#98D8C8', '#F7DC6F', '#BB8FCE'
      ]
      
      let newColor
      do {
        newColor = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      } while (newColor === bubble.color)
      
      bubble.color = newColor
    },
  
    // 点击泡泡（【兼容修改】收集选择的文字，替换原来的number）
    onBubbleTap(e) {
      const id = e.currentTarget.dataset.id
      const bubbles = this.data.bubbles
      const bubble = bubbles[id]
      
      if (this.data.selectedCount >= 3 && !bubble.selected) {
        wx.showToast({
          title: '最多选择3个',
          icon: 'none',
          duration: 1000
        })
        return
      }
      
      if (bubble.popped) {
        return
      }
      
      this.showPopEffect(bubble.x, bubble.y)
      
      bubbles[id].selected = true
      bubbles[id].popped = true
      bubbles[id].vx = 0
      bubbles[id].vy = 0
      
      // 【修改】将bubble.number改为bubble.text，收集选择的文字
      const selectedNumbers = [...this.data.selectedNumbers, bubble.text]
      const selectedCount = this.data.selectedCount + 1
      
      this.setData({
        bubbles: bubbles,
        selectedCount: selectedCount,
        selectedNumbers: selectedNumbers
      })
      
      if (selectedCount === 3) {
        setTimeout(() => {
          this.navigateToHome()
        }, 800)
      }
    },
  
    // 显示戳破特效（无需修改）
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
  
    // 跳转到主界面（无需修改，本地存储的是文字数组）
    navigateToHome() {
      wx.setStorageSync('selectedNumbers', this.data.selectedNumbers)
      
      wx.showToast({
        title: '选择完成！',
        icon: 'success',
        duration: 1000
      })
      
      setTimeout(() => {
      // 无 tabBar 时使用 reLaunch 确保跳转到首页
      wx.reLaunch({
        url: '/pages/home/home'
      })
      }, 1000)
    }
  })