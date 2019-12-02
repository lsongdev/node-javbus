const javbus = require('..')();

(async () => {

  const videos = await javbus.page();
  console.log(videos);

  const show = await javbus.show(videos[0].id);
  console.log(show);

  const files = await javbus.magnet(show.gid);
  console.log(files);

})();