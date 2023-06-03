import request from '@/utils/request'

export const articleGetArticleList = (data) => request({
  // 获取待审核文章列表
  url: '/article/get_article_list',
  method: 'post',
  data
})

export const articleGetAuditedArticleList = (data) => request({
  // 获取已审核文章列表
  url: '/article/get_audited_article_list',
  method: 'post',
  data
})

export const articleAudit = (data) => request({
  // 审核文章
  url: '/article/audit',
  method: 'post',
  data
})

export const articleSendAlipayRedPacketPassword = (data) => request({
  // 发送口令红包
  url: 'article/send_alipay_red_packet_password',
  method: 'post',
  data
})