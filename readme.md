# How to use it
All steps below should be done inside google cloud platform

## 1. Create a Pub/Sub Topic called "cloud-builds"
The name must be exacly cloud-builds because google cloud uses this name to push events for all cloud builds

## 2. Create a Cloud run function
Image container url should be joaonetoc/gcloud-build-discord-notifications
Choose a name for your function
In the authentication section select Allow unauthenticated calls
Inside Container, Network and Security add an env variable called DISCORD_WEBHOOK_URL with your discord webhook url as value

If you don't have an url yet you can get it accessing discord, go into your server settings > integrations > webhooks > new webhook, click on the webhook and then "Copy webhook URL"


Create your function

## 3. Create a Pub/Sub subscription
Choose an id for your subscription
Select your topic "cloud-builds"
In the type select Push and put your cloud run url inside the input, you can get the url accessing your cloud run function

## 4. Test it
You can teste by Triggering some Cloud build trigger and see the messages comming into your discord channel

## 5. Future improvements
Add prints for messages
Handle QUEUED and WORKING statuses
Use env for colors
Use env to select which statuses should respond to
