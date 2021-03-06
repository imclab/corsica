/* Description:
 *   pushes a default URL to screens when /reset is hit
 *
 * Dependencies:
 *   settings
 *
 * Configuration:
 *   defaultUrl
 *
 * Author:
 *    lonnen, mythmon, potch
 */

module.exports = function (corsica) {
  var settings = corsica.settings.setup('reset', {
    defaultUrl: ['/default.html', 'http://xkcd.com'],
  });

  var urlIndex = 0;

  corsica.on('reset', function(content) {
    return settings.get()
      .then(function (settings) {
        content.type = 'url';
        content.url = settings.defaultUrl[urlIndex];
        urlIndex = (urlIndex + 1) % settings.defaultUrl.length;
        corsica.sendMessage('content', content);
        return content;
      });
  });
};
