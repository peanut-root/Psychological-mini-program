// components/floating-ball/floating-ball.js
const { sendChatMessage } = require('../../utils/ai-api')

Component({
  data: {
    // Ball position (rpx)
    ballX: 0,
    ballY: 400,
    snapSide: 'right',
    isDragging: false,

    // Panel state
    panelOpen: false,
    panelWidth: 0, // will be set on ready

    // Messages
    messages: [],
    inputText: '',
    scrollToId: '',

    // Keyboard
    keyboardHeight: 0,

    // Touch tracking
    _touchStartX: 0,
    _touchStartY: 0,
    _lastBallX: 0,
    _lastBallY: 0,
    _screenWidth: 0,
    _screenHeight: 0,
    _statusBarHeight: 0,
    _ballSize: 96, // rpx

    // For retry
    _lastUserMessage: null,
  },

  lifetimes: {
    attached() {
      this._initScreenInfo()
      this._loadPosition()
      this._loadChatHistory()
      this._registerKeyboardListener()
    },
    detached() {
      this._unregisterKeyboardListener()
    }
  },

  methods: {
    // ===== Screen Info =====
    _initScreenInfo() {
      const systemInfo = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync()
      const windowWidth = systemInfo.windowWidth
      const windowHeight = systemInfo.windowHeight
      const statusBarHeight = systemInfo.statusBarHeight || 0

      // Convert px to rpx ratio
      const pxToRpx = 750 / windowWidth
      const screenWidthRpx = 750
      const screenHeightRpx = windowHeight * pxToRpx

      this.setData({
        _screenWidth: screenWidthRpx,
        _screenHeight: screenHeightRpx,
        _statusBarHeight: statusBarHeight,
        panelWidth: Math.floor(screenWidthRpx * 0.75) // 75% of screen
      })

      // Set default position if first launch
      if (this.data.ballX === 0) {
        this.setData({
          ballX: screenWidthRpx - this.data._ballSize - 4,
          snapSide: 'right'
        })
      }
    },

    // ===== Position Persistence =====
    _loadPosition() {
      try {
        const saved = wx.getStorageSync('floatingBallPosition')
        if (saved && saved.x !== undefined && saved.y !== undefined) {
          // Validate bounds
          const { _screenWidth: sw, _screenHeight: sh, _statusBarHeight: sb, _ballSize: bs } = this.data
          let x = Math.max(4, Math.min(saved.x, sw - bs - 4))
          let y = Math.max(sb + 4, Math.min(saved.y, sh - bs - 4))
          this.setData({ ballX: x, ballY: y, snapSide: saved.snapSide || 'right' })
        }
      } catch (e) {
        // Storage corrupted — use defaults
        console.warn('[floating-ball] Failed to load position, using default')
      }
    },

    _savePosition() {
      try {
        wx.setStorageSync('floatingBallPosition', {
          x: this.data.ballX,
          y: this.data.ballY,
          snapSide: this.data.snapSide
        })
      } catch (e) {
        console.warn('[floating-ball] Failed to save position')
      }
    },

    // ===== Chat History Persistence =====
    _loadChatHistory() {
      try {
        const saved = wx.getStorageSync('floatingBall:chatHistory')
        if (saved && Array.isArray(saved)) {
          this.setData({ messages: saved })
        }
      } catch (e) {
        console.warn('[floating-ball] Failed to load chat history, using empty')
        this.setData({ messages: [] })
      }
    },

    _saveChatHistory() {
      try {
        let msgs = this.data.messages
        // Prune to 50 messages (FIFO)
        if (msgs.length > 50) {
          msgs = msgs.slice(msgs.length - 50)
        }
        wx.setStorageSync('floatingBall:chatHistory', msgs)
        this.setData({ messages: msgs })
      } catch (e) {
        console.warn('[floating-ball] Failed to save chat history')
      }
    },

    // ===== Keyboard Listener =====
    _registerKeyboardListener() {
      wx.onKeyboardHeightChange(res => {
        this.setData({ keyboardHeight: res.height })
      })
    },

    _unregisterKeyboardListener() {
      // wx.offKeyboardHeightChange not widely supported; listener auto-cleanup on page hide
    },

    onInputFocus() {
      // Keyboard will show — panel input area adjusts via keyboardHeight
    },

    onInputBlur() {
      this.setData({ keyboardHeight: 0 })
    },

    // ===== Touch Handlers =====
    onTouchStart(e) {
      const touch = e.touches[0]
      this.setData({
        _touchStartX: touch.clientX,
        _touchStartY: touch.clientY,
        _lastBallX: this.data.ballX,
        _lastBallY: this.data.ballY,
        isDragging: false
      })
    },

    onTouchMove(e) {
      const touch = e.touches[0]
      const dx = touch.clientX - this.data._touchStartX
      const dy = touch.clientY - this.data._touchStartY
      const distance = Math.sqrt(dx * dx + dy * dy)

      // Convert px delta to rpx
      const pxToRpx = 750 / (this.data._screenWidth / 750 * (this.data._screenWidth / 750))
      // Simpler: use ratio from screen width
      const systemInfo = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync()
      const rpxRatio = 750 / systemInfo.windowWidth

      const drpxX = dx * rpxRatio
      const drpxY = dy * rpxRatio

      if (distance > 3) { // 3px threshold in px
        const { _screenWidth: sw, _screenHeight: sh, _statusBarHeight: sb, _ballSize: bs } = this.data
        let newX = this.data._lastBallX + drpxX
        let newY = this.data._lastBallY + drpxY

        // Clamp to screen bounds (ballX is the left edge position)
        newX = Math.max(4, Math.min(newX, sw - bs - 4))
        newY = Math.max(sb + 4, Math.min(newY, sh - bs - 4))

        this.setData({
          ballX: newX,
          ballY: newY,
          isDragging: true
        })
      }
    },

    onTouchEnd(e) {
      if (!this.data.isDragging) {
        // Was a tap, not a drag — do nothing here, let bindtap handle it
        return
      }

      // Determine snap side
      const { ballX, _screenWidth: sw, _ballSize: bs } = this.data
      const ballCenter = ballX + bs / 2
      const threshold = sw * 0.4

      let newSnapSide = this.data.snapSide
      let newX = ballX

      if (ballCenter < threshold) {
        // Snap to left edge: ball's left edge at 4rpx from screen left
        newSnapSide = 'left'
        newX = 4
      } else if (ballCenter > sw - threshold) {
        // Snap to right edge: ball's left edge at (screenWidth - ballWidth - 4rpx)
        newSnapSide = 'right'
        newX = sw - bs - 4
      } else {
        // Stay on current side
        if (this.data.snapSide === 'left') {
          newX = 4
        } else {
          newX = sw - bs - 4
        }
      }

      this.setData({
        ballX: newX,
        snapSide: newSnapSide,
        isDragging: false
      })

      // Persist after animation completes
      setTimeout(() => {
        this._savePosition()
      }, 350)
    },

    // ===== Tap to Toggle Panel =====
    onBallTap(e) {
      // Only toggle if not dragging
      if (!this.data.isDragging) {
        this.togglePanel()
      }
    },

    togglePanel() {
      this.setData({
        panelOpen: !this.data.panelOpen
      })
      if (this.data.panelOpen) {
        this._scrollToBottom()
      }
    },

    closePanel() {
      this.setData({
        panelOpen: false,
        keyboardHeight: 0
      })
      // Dismiss keyboard
      wx.hideKeyboard()
    },

    // ===== Input =====
    onInput(e) {
      this.setData({ inputText: e.detail.value })
    },

    // ===== Send Message =====
    sendMessage() {
      const text = this.data.inputText.trim()
      if (!text) return

      const userMsg = {
        id: 'msg_' + Date.now(),
        role: 'user',
        content: text,
        timestamp: Date.now(),
        status: 'sent'
      }

      // Save last user message for retry
      this.setData({
        _lastUserMessage: userMsg,
        inputText: ''
      })

      const msgs = [...this.data.messages, userMsg]
      this.setData({ messages: msgs })
      this._saveChatHistory()

      // Show loading placeholder
      const loadingMsg = {
        id: 'loading_' + Date.now(),
        role: 'assistant',
        content: '思考中...',
        timestamp: Date.now(),
        status: 'pending'
      }
      const withLoading = [...this.data.messages, loadingMsg]
      this.setData({ messages: withLoading })
      this._scrollToBottom()

      // Call API
      const apiMessages = this.data.messages
        .filter(m => m.role === 'user' || m.role === 'assistant')
        .map(m => ({ role: m.role, content: m.content }))

      // Add system prompt
      apiMessages.unshift({
        role: 'system',
        content: '你是一个支持性心理健康助手，不提供医疗诊断。请倾听、理解、共情，必要时建议用户寻求专业帮助。'
      })

      sendChatMessage(apiMessages)
        .then(reply => {
          // Replace loading with actual reply
          const allMsgs = this.data.messages.filter(m => m.id !== loadingMsg.id)
          const assistantMsg = {
            id: 'msg_' + Date.now(),
            role: 'assistant',
            content: reply,
            timestamp: Date.now(),
            status: 'sent'
          }
          const finalMsgs = [...allMsgs, assistantMsg]
          this.setData({ messages: finalMsgs })
          this._saveChatHistory()
          this._scrollToBottom()
        })
        .catch(err => {
          // Replace loading with error
          const allMsgs = this.data.messages.filter(m => m.id !== loadingMsg.id)
          const errorMsg = {
            id: 'error_' + Date.now(),
            role: 'assistant',
            content: err.message || '服务暂时不可用，请稍后重试。',
            timestamp: Date.now(),
            status: 'error'
          }
          const finalMsgs = [...allMsgs, errorMsg]
          this.setData({ messages: finalMsgs })
          this._saveChatHistory()
          this._scrollToBottom()
        })
    },

    // ===== Retry =====
    retryMessage(e) {
      const index = e.currentTarget.dataset.index
      const errorMsg = this.data.messages[index]
      if (!errorMsg) return

      // Remove error message
      const msgs = this.data.messages.filter((_, i) => i !== index)
      this.setData({ messages: msgs })

      // Resend last user message
      if (this.data._lastUserMessage) {
        this.setData({ inputText: this.data._lastUserMessage.content })
        this.sendMessage()
      }
    },

    // ===== Scroll to Bottom =====
    _scrollToBottom() {
      const idx = this.data.messages.length - 1
      this.setData({ scrollToId: 'msg-' + Math.max(0, idx) })
    },

    // ===== Clear History =====
    clearHistory() {
      this.setData({ messages: [] })
      try {
        wx.removeStorageSync('floatingBall:chatHistory')
      } catch (e) {
        // ignore
      }
    }
  }
})
