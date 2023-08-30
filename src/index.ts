import express from 'express';
import bodyParser from 'body-parser';
import { getBuildMessage } from './getBuildMessage';
import { sendDiscordMessage } from './sendDiscordMessage';

const app = express()
app.use(bodyParser.json())


app.get(/^\/(.*)/, async (req, res) => {
  const message = getBuildMessage(req.body)
  await sendDiscordMessage(message)
  return res.json({
    status: 'MESSAGE_SENT'
  })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})