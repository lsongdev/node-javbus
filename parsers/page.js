
module.exports = $ => {
  const list = [];
  $('#waterfall > .item').each(function (i, item) {
    var info = $('.photo-info > span', item).get(0);
    var date = $('date', info);
    list.push({
      id: date[0].children[0].data,
      date: date[1].children[0].data,
      name: info.children[0].data,
      img: $('img', item).attr('src')
    });
  });
  return list;
};