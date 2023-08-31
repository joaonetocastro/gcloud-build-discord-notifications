import express from 'express';
import bodyParser from 'body-parser';
import { getBuildMessage } from './getBuildMessage';
import { sendDiscordMessage } from './sendDiscordMessage';

const app = express()
app.use(bodyParser.json())


app.all(/^\/(.*)/, async (req, res) => {
  const message = getBuildMessage(req.body)
  await sendDiscordMessage(message)
  return res.json({
    status: 'MESSAGE_SENT'
  })
})

const DEFAULT_PORT = 8080
const port = process.env.PORT || DEFAULT_PORT

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})