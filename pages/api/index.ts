import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

const is_boolean = (v: any): boolean => v === 'true' || v === '1' || v === true || v === 1

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const header = request.headers
  const query = request.query
  const body = request.body

  let telegramToken: string = ''
    || header['x-token']
    || query.token
    || body.token
    || process.env.TELEGRAM_TOKEN
    || process.env.telegram_token
    || process.env.TOKEN
    || process.env.token
    || ''
  let telegramChatId: string = ''
    || header['x-chat-id']
    || query.chat_id
    || query['chat-id']
    || body.chat_id
    || body['chat-id']
    || process.env.TELEGRAM_CHAT_ID
    || process.env.telegram_chat_id
    || process.env.CHAT_ID
    || process.env.chat_id
    || ''
  let telegramDisableWebPagePreview: boolean = ''
    || is_boolean(header['x-disable-web-page-preview'])
    || is_boolean(query.disable_web_page_preview)
    || is_boolean(query['disable-web-page-preview'])
    || is_boolean(body.disable_web_page_preview)
    || is_boolean(body['disable-web-page-preview'])
    || is_boolean(process.env.TELEGRAM_DISABLE_WEB_PAGE_PREVIEW)
    || is_boolean(process.env.telegram_disable_web_page_preview)
    || is_boolean(process.env.DISABLE_WEB_PAGE_PREVIEW)
    || is_boolean(process.env.disable_web_page_preview)
  let text: string = (query.text
    || query.content
    || body.text
    || body.content
    || body
    || ''
  ).trim()

  console.log('token:', telegramToken, 'chat_id:', telegramChatId, 'disable_web_page_preview:', telegramDisableWebPagePreview, 'text:', text)

  if (!telegramToken || !telegramChatId || !text) {
    response.status(404).json({ ok: false, error_code: 404, description: 'Bad Request: `token`, `chat_id`, `text` not found' })
    return
  }

  await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: telegramChatId,
      disable_web_page_preview: telegramDisableWebPagePreview,
      text,
    }),
  })
    .then(res => res.json() as any)
    .then(data => {
      console.log(data)
      response.status(data.error_code || 200).json(data)
    })
    .catch(error => {
      console.log(error)
      response.status(500).json({ ok: false, error_code: 500, description: `${error.code}: ${error.message}` })
    })
}
