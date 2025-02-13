const path = require('path');

module.exports = {
  i18n: {
    locales: ['en', 'fr', 'es'],
    defaultLocale: 'fr',
  },
  localePath: path.resolve('./public/locales'),
};
