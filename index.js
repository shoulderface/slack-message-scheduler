require('dotenv').config();
const {Botkit} = require('botkit');
const {SlackAdapter} = require('botbuilder-adapter-slack');

const adapter = new SlackAdapter({
  botToken: process.env.OAUTH_TOKEN,
  clientSigningSecret: process.env.SIGNING_SECRET,
  // clientId: process.env.CLIENT_ID,
  // clientSecret: process.env.CLIENT_SECRET,
  scopes: ['user']
});

const controller = new Botkit({
  adapter
});

controller.on('slash_command', async function (bot, message) {
  const dialog = bot.createDialog('Schedule Message', 'schedule_dialog', 'Schedule message')
    .addText('Text', 'text', 'some text')
    .addSelect('Select', 'select', null, [{label: 'Foo', value: 'foo'}, {
      label: 'Bar',
      value: 'bar'
    }], {placeholder: 'Select One'})
    .addTextarea('Textarea', 'textarea', 'some longer text', {placeholder: 'Put words here'}, null)
    .addUrl('Website', 'url', 'http://botkit.ai');
})

