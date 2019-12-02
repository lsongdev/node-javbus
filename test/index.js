const javbus = require('..')();
const assert = require('assert');

(async () => {

  const list = await javbus.page(1);

  assert.ok(list);
  assert.ok(Array.isArray(list));
  assert.ok(list.length);

  const item = list[0];


  assert.ok(item.id);
  assert.ok(item.name);
  assert.ok(item.img);
  assert.ok(item.date);

  const show = await javbus.show(item.id);
  
  assert.ok(show.id);
  assert.ok(show.title);
  assert.ok(show.cover);
  assert.ok(show.length);
  assert.ok(show.label);
  assert.ok(show.series);
  assert.ok(show.director);
  assert.ok(show.release_date);
  assert.ok(Array.isArray(show.stars));
  assert.ok(Array.isArray(show.genre));
  assert.ok(Array.isArray(show.images));
  

})();