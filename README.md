# Telegram Notify

## 部署方式

### Vercel (推荐)

> Vercel 分配的域名在中国大陆无法访问, 需使用自定义域名, 并修改 CNAME 记录为 `cname-china.vercel-dns.com.`

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2F0wQ%2Ftelegram-notify)

### 本地运行

```bash
npm i
npm run build
npm run start
# or
pnpm i
pnpm run build
pnpm run start
```

## API

```http
GET http://example.com/api
    ?token=这里是token
    &chat_id=这里是chat_id
    &text=这里是内容
```

```http
POST http://example.com/api
Content-Type: application/x-www-form-urlencoded

token=这里是token
&chat_id=这里是chat_id
&text=这里是内容
```

```http
POST http://example.com/api
Content-Type: application/json

{
    "token": "这里是token",
    "chat_id": "这里是chat_id",
    "text": "这里是内容"
}
```

```http
POST http://example.com/api
Content-Type: text/plain
X-Token: 这里是token
X-Chat-Id: 这里是chat_id

这里是内容
```

```http
POST http://example.com/api
    ?token=这里是token
    &chat_id=这里是chat_id
Content-Type: text/plain

这里是内容
```
