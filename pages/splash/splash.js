// pages/splash/splash.js

const COLOR_PALETTE = [
  '#FF6B9D', '#4ECDC4', '#95E1D3', '#F38181', '#AA96DA',
  '#FCBAD3', '#FFD3A5', '#A8E6CF', '#FFD89B', '#C7CEEA',
  '#FFB6C1', '#87CEEB', '#98D8C8', '#F7DC6F', '#BB8FCE'
];

Page({
  data: {
    bubbles: [],
    selectedCount: 0,
    selectedNumbers: [],
    showPopEffect: false,
    popEffectX: 0,
    popEffectY: 0
  },

  // 文字基础配置（可自定义调整）
  textConfig: {
    fontSize: 28, // 【改回与 WXSS 一致的文字大小】决定泡泡背景尺寸
    padding: 20, // 文字与泡泡边缘的内边距（rpx），避免文字紧贴泡泡
    singleCharWidth: 30, // 单个汉字的估算宽度（rpx），一般比 fontSize 略大一点点
    maxCharsPerLine: 4 // 新增：每行最大字符数，用于文字换行
  },

  // 容器边界
  containerBounds: {
    left: 60,
    right: 690,
    top: 250, // Adjusted to start below the title area
    bottom: 1500 // Increased to cover more screen height
  },

  // 新增：将 HEX 颜色转换为带透明度的 RGBA 格式
  hexToRgba(hex, opacity) {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('');
      if (c.length === 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = '0x' + c.join('');
      return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')},${opacity})`;
    }
    // 如果已经是 rgba 格式，直接返回
    if (hex && hex.toLowerCase().startsWith('rgba')) return hex;
    return `rgba(128,128,128,${opacity})`; // 对于无效格式，返回灰色
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
    // 【修改】将颜色转换为半透明
    const colors = COLOR_PALETTE.map(hex => this.hexToRgba(hex, 0.85));
    // 【关键1】定义所有可能的形容词
    const allAdjectives = [
      '抑郁的', '绝望的', '无助的', '内疚的', '无价值感的', '淡漠的', '麻木的',
      '欣快的', '易激惹的', '激越的', '情绪不稳的', '焦虑的', '易受伤害的',
      '恐惧的', '疏离的'
    ];

    // 形容词到疾病的映射
    this.adjectiveToDiseaseMap = {
      '抑郁的': '抑郁症',
      '绝望的': '抑郁症',
      '无助的': '抑郁症',
      '内疚的': '抑郁症',
      '无价值感的': '抑郁症',
      '淡漠的': '精神分裂症',
      '麻木的': '创伤后应激障碍',
      '欣快的': '双相情感障碍',
      '易激惹的': '双相情感障碍',
      '激越的': '双相情感障碍',
      '情绪不稳的': '边缘型人格障碍',
      '焦虑的': '焦虑症',
      '易受伤害的': '边缘型人格障碍',
      '恐惧的': '特定恐惧症',
      '疏离的': '分裂型人格障碍'
    };

    // 打乱所有形容词数组
    for (let i = allAdjectives.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = allAdjectives[i];
      allAdjectives[i] = allAdjectives[j];
      allAdjectives[j] = temp;
    }
    // 选取前10个作为泡泡内容
    const customAdjectives = allAdjectives.slice(0, 10);

    const bubbles = []
    const bounds = this.containerBounds
     const { fontSize, padding, singleCharWidth, maxCharsPerLine } = this.textConfig // Get maxCharsPerLine
    
    // 生成10个泡泡，网格分布 to prevent overlap，大小跟随文字
    const cols = 4;

   const rows = Math.ceil(customAdjectives.length / cols);
    
    for (let i = 0; i < customAdjectives.length; i++) {
      const currentText = customAdjectives[i]

      // --- Start: Text Wrapping Logic ---
      let wrappedLines = [];
      let longestLineLength = 0;
      if (currentText.length > maxCharsPerLine) {
          let tempText = currentText;
          while (tempText.length > 0) {
              const line = tempText.substring(0, maxCharsPerLine);
              wrappedLines.push(line);
              if (line.length > longestLineLength) {
                  longestLineLength = line.length;
              }
              tempText = tempText.substring(maxCharsPerLine);
          }
      } else {
          wrappedLines.push(currentText);
          longestLineLength = currentText.length;
      }
      const displayText = wrappedLines.join('\n'); // Join with newline for display
      const numLines = wrappedLines.length;
      // --- End: Text Wrapping Logic ---
      
      // 【关键2】计算文字所需宽高，动态生成泡泡半径
      // 1. 计算文字宽度：最长行字符数 * 单个字符宽度
      const textWidth = longestLineLength * singleCharWidth
      // 2. 计算文字高度：行数 * 字体大小
      const textHeight = numLines * fontSize
      // 3. 计算泡泡最小半径：取文字宽高的最大值 + 内边距，再取一半（圆形泡泡需容纳全部文字）
      const bubbleRadius = Math.max(textWidth, textHeight) / 2 + padding
      
      // 【关键3】Grid-based positioning，确保泡泡完整在容器内（使用动态计算的radius，不再是固定值）
      const col = i % cols;
      const row = Math.floor(i / cols);
      
      // Calculate grid cell dimensions
      
      // Calculate grid cell dimensions
      const cellWidth = (bounds.right - bounds.left) / (cols + 0.5); // Add margin
      const cellHeight = (bounds.bottom - bounds.top) / (rows + 0.5); // Add margin
      
      // Position in the center of each grid cell
      const x = bounds.left + col * cellWidth + cellWidth / 2;
      const y = bounds.top + row * cellHeight + cellHeight / 2;
      
      // Random speed (rpx/frame)
      const speed = 0.2 + Math.random() * 0.4 // 0.2-0.6 rpx/帧，减慢移动速度
      const angle = Math.random() * Math.PI * 2
      
      bubbles.push({
        id: i,
        // 【关键4】替换number为text，存储自定义文字
        text: displayText, // Store wrapped text
        number: displayText, // 兼容 WXML 中原有的 {{item.number}} 绑定
        originalText: currentText, // Keep original for reference if needed
        x: x,
        y: y,
        vx: Math.cos(angle) * speed, // 速度向量X
        vy: Math.sin(angle) * speed, // 速度向量Y
        radius: bubbleRadius, // 【关键5】存入动态计算的泡泡半径，适配物理引擎
        color: colors[i % colors.length], // Use modulo to cycle through colors if customAdjectives > colors.length
        originalColor: colors[i % colors.length], // 保存原始颜色
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

        // 处理戳破时的缩小消失动画
        if (bubble.popping) {
          bubble.popStep = (bubble.popStep || 0) + 1
          
          if (bubble.popStep <= 4) {
            bubble.radius *= 1.15 // 短暂放大膨胀
            bubble.x += (Math.random() - 0.5) * 6 // 震动
            bubble.y += (Math.random() - 0.5) * 6
          } else {
            bubble.radius *= 0.7 // 快速缩小
          }
          
          if (bubble.radius < 2) {
            bubble.popping = false
            bubble.popped = true // 标记为已戳破，触发隐藏
          }
          needUpdate = true
          continue
        }

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
          if (other.popped || other.popping) continue
          
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
    const semiTransparentPalette = COLOR_PALETTE.map(hex => this.hexToRgba(hex, 0.85)); // 【修改】预先转换为半透明
    
    let newColor;
    let attempts = 0;
    const maxAttempts = 50; // 防止无限循环
    
    // 循环查找不是当前颜色的颜色
    do {
      newColor = semiTransparentPalette[Math.floor(Math.random() * semiTransparentPalette.length)];
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
    
    // 如果已经被戳破或正在动画中，忽略
    if (bubble.popped || bubble.popping) {
      return
    }
    
    // 显示戳破特效（在泡泡位置）
    this.showPopEffect(bubble.x, bubble.y)
    
    // 选择并戳破
    bubbles[id].selected = true
    bubbles[id].popping = true // 开始动画，延迟设置为 popped
    // 停止这个泡泡的运动
    bubbles[id].vx = 0
    bubbles[id].vy = 0
    
    // 【修改】将bubble.number改为bubble.originalText，收集选择的疾病名称（而非形容词）
    const diseaseName = this.adjectiveToDiseaseMap[bubble.originalText];
    const selectedNumbers = (this.data.selectedNumbers || []).slice();
    if (selectedNumbers.indexOf(diseaseName) === -1) {
      selectedNumbers.push(diseaseName);
    }
    const selectedCount = selectedNumbers.length; // Count unique diseases
    
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
    // 保存选择的疾病名称到本地存储，区分第一步
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
