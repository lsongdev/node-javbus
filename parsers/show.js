
module.exports = $ => {
  const movie = $('.movie');
  const stars = $('.star-box img', movie).map((i, star) => {
    return {
      name: $(star).attr('title'),
      avatar: $(star).attr('src'),
    }
  }).get()
  const [gid] = $('body')
    .find('script')
    .map((i, item) => item.children[0])
    .get()
    .filter(Boolean)
    .map(script => script.data)
    .filter(script => /gid/.test(script))
    .map(script => script.match(/gid = (\d+);/)[1])

  const obj = {
    gid,
    stars,
    title: $('h3').text(),
    cover: $('img', movie).attr('src'),
    genre: $('.info .genre a', movie).map((i, x) => $(x).text()).get(),
    images: $('#sample-waterfall a').map((i, anchor) => $(anchor).attr('href')).get(),
  };

  $('.info p', movie).map((i, item) => {
    const line = $(item).text();
    const idx = line.indexOf(':');
    const key = line
      .substr(0, idx)
      .replace(/\s+/, '_')
      .toLowerCase()
    const value = line
      .substring(idx + 1)
      .trim()
    if (key && value)
      obj[key] = value;
  });
  return obj;
};
