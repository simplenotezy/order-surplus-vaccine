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

const sendAnEmail = (EMAIL_CONFIG) => {
  if (!EMAIL_CONFIG.EMAILSMTPHOST) {
    console.log('No email smtp host. Bailing out..')
    return null;
  }

  console.log('initiate email')
  console.log(EMAIL_CONFIG)

  const nodemailer = require('nodemailer');
  let transport = nodemailer.createTransport({
    host: EMAIL_CONFIG.EMAILSMTPHOST,
    port: EMAIL_CONFIG.EMAILSMTPORT,
    auth: {
       user: EMAIL_CONFIG.EMAILAUTHUSER,
       pass: EMAIL_CONFIG.EMAILAUTHPASS
    }
  });

  const mailMessage = {
    from: EMAIL_CONFIG.FROMEMAIL,
    to: EMAIL_CONFIG.TOEMAILS,
    subject: 'Vaccine registreringer',
    text: EMAIL_CONFIG.REGISTEREDTO
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
