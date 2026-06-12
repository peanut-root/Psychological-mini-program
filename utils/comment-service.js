// utils/comment-service.js
const COMMENT_COLLECTION = 'article_comments'
const LIKE_COLLECTION = 'article_comment_likes'

function isCloudAvailable() {
  return !!(wx.cloud && wx.cloud.database)
}

function getDb() {
  if (!isCloudAvailable()) return null
  return wx.cloud.database()
}

function getCommentUserId() {
  let userId = wx.getStorageSync('commentUserId')
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(16).slice(2)}`
    wx.setStorageSync('commentUserId', userId)
  }
  return userId
}

function getUserInfo() {
  const userInfo = wx.getStorageSync('userInfo') || {}
  return {
    user: userInfo.nickName || '当前用户',
    avatarUrl: userInfo.avatarUrl || '',
    userId: getCommentUserId()
  }
}

function formatTime(value) {
  if (!value) return '刚刚'
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return '刚刚'

  const now = Date.now()
  const diff = now - date.getTime()
  if (diff < 60000) return '刚刚'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`

  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${month}-${day}`
}

function getTimeValue(value) {
  if (!value) return Date.now()
  const date = value instanceof Date ? value : new Date(value)
  return Number.isNaN(date.getTime()) ? Date.now() : date.getTime()
}

function buildCommentTree(comments, likes) {
  const currentUserId = getCommentUserId()
  const likeCountMap = {}
  const likedMap = {}

  likes.forEach((like) => {
    const commentId = String(like.commentId)
    likeCountMap[commentId] = (likeCountMap[commentId] || 0) + 1
    if (like.userId === currentUserId) {
      likedMap[commentId] = true
    }
  })

  const normalized = comments.map((comment) => {
    const id = comment._id || comment.id
    return {
      id: id,
      cloudId: id,
      parentId: comment.parentId || '',
      user: comment.user || '用户',
      avatarUrl: comment.avatarUrl || '',
      content: comment.content || '',
      time: formatTime(comment.createdAt),
      createdAtMs: getTimeValue(comment.createdAt),
      likes: likeCountMap[String(id)] || 0,
      liked: !!likedMap[String(id)],
      canDelete: comment.userId === currentUserId,
      replies: []
    }
  })

  const byId = {}
  normalized.forEach((comment) => {
    byId[String(comment.id)] = comment
  })

  const roots = []
  normalized.forEach((comment) => {
    if (comment.parentId && byId[String(comment.parentId)]) {
      byId[String(comment.parentId)].replies.push(comment)
    } else if (!comment.parentId) {
      roots.push(comment)
    }
  })

  roots.forEach((comment) => {
    comment.replies.sort((a, b) => a.createdAtMs - b.createdAtMs)
  })

  roots.sort((a, b) => b.createdAtMs - a.createdAtMs)

  return roots
}

function fetchComments(articleId) {
  const db = getDb()
  if (!db) return Promise.reject(new Error('云开发未启用'))

  const id = Number(articleId)
  return Promise.all([
    db.collection(COMMENT_COLLECTION)
      .where({ articleId: id })
      .orderBy('createdAt', 'desc')
      .limit(100)
      .get(),
    db.collection(LIKE_COLLECTION)
      .where({ articleId: id })
      .limit(1000)
      .get()
  ]).then(([commentRes, likeRes]) => {
    return buildCommentTree(commentRes.data || [], likeRes.data || [])
  })
}

function addComment(articleId, content, parentId) {
  const db = getDb()
  if (!db) return Promise.reject(new Error('云开发未启用'))

  const userInfo = getUserInfo()
  return db.collection(COMMENT_COLLECTION).add({
    data: {
      articleId: Number(articleId),
      parentId: parentId || '',
      content: content,
      user: userInfo.user,
      avatarUrl: userInfo.avatarUrl,
      userId: userInfo.userId,
      createdAt: db.serverDate()
    }
  })
}

function toggleLike(articleId, commentId) {
  const db = getDb()
  if (!db) return Promise.reject(new Error('云开发未启用'))

  const userId = getCommentUserId()
  const id = String(commentId)
  return db.collection(LIKE_COLLECTION)
    .where({
      articleId: Number(articleId),
      commentId: id,
      userId: userId
    })
    .limit(1)
    .get()
    .then((res) => {
      const like = res.data && res.data[0]
      if (like && like._id) {
        return db.collection(LIKE_COLLECTION).doc(like._id).remove()
      }
      return db.collection(LIKE_COLLECTION).add({
        data: {
          articleId: Number(articleId),
          commentId: id,
          userId: userId,
          createdAt: db.serverDate()
        }
      })
    })
}

function deleteComment(commentId) {
  const db = getDb()
  if (!db) return Promise.reject(new Error('云开发未启用'))

  return db.collection(COMMENT_COLLECTION).doc(String(commentId)).remove()
}

module.exports = {
  isCloudAvailable,
  fetchComments,
  addComment,
  toggleLike,
  deleteComment
}
