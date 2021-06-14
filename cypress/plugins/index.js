/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const sendAnEmail = (message) => {

  const nodemailer = require('nodemailer');
  let transport = nodemailer.createTransport({
    host: 'smtp.simply.com',
    port: 2525,
    auth: {
       user: 'casper@nybroe.com',
       pass: 'repsac86'
    }
  });

  const mailMessage = {
    from: 'casper@nybroe.com',
    to: ['casper@nybroe.com', 'miabretlau@hotmail.com'],
    subject: 'Vaccine registreringer',
    text: message
  };
  transport.sendMail(mailMessage, function(err, info) {
      if (err) {
        console.log('err:')
        console.log(err)
      } else {
        console.log('info:')
        console.log(info);
      }
  });

  return null;
}

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  
  on('task', {
    sendMail (message) {
      return sendAnEmail(message);
    }
  })?.then(values => {
    console.log(values)
  })
}
