const Event = use('Event')
const Mail = use('Mail')
const ShortUrlLog = use('App/Models/ShortUrlLog');

Event.on('new::click_short_url', async (requestInfo) => {
  const shortUrlLog = new ShortUrlLog();
  shortUrlLog.ip = requestInfo.ip;
  shortUrlLog.user_agent = requestInfo.user_agent;
  ShortUrlLog.short_url_id = requestInfo.id;
  await shortUrlLog.save();
})