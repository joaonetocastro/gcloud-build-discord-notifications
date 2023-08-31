import 'dotenv/config'
import express from 'express';
import bodyParser from 'body-parser';
import { GoogleCloudBuild, getBuildMessage } from './getBuildMessage';
import { sendDiscordMessage } from './sendDiscordMessage';

const app = express()
app.use(bodyParser.json())


app.all(/^\/(.*)/, async (req, res) => {
  const data = JSON.parse(Buffer.from(req.body.message.data, 'base64').toString('utf8')) as GoogleCloudBuild
  // TODO: Handle status WORKING and QUEUED with custom messages
  if(['SUCCESS', 'FAILURE'].includes(data.status)) {
    const message = getBuildMessage(data)
    await sendDiscordMessage(message)
  }
  return res.json({
    status: 'MESSAGE_RECEIVED'
  })
})

const DEFAULT_PORT = 8080
const port = process.env.PORT || DEFAULT_PORT

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})