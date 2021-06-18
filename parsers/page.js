
const innerText = x =>
  x.children[0].data;

module.exports = $ => {
  const list = [];
  $('#waterfall > .item').each(function (i, item) {
    const info = $('.photo-info > span', item).get(0);
    const [id, date] = $('date', info);
    list.push({
      id: innerText(id),
      date: innerText(date),
      name: innerText(info),
      img: $('img', item).attr('src')
    });
  });
  return list;
};