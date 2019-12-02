
module.exports = $ => {
  return $('table tr').map((i, row) => {
    const cols = $('td', row);
    return {
      name: $(cols.get(0)).text().trim(),
      size: $(cols.get(1)).text().trim(),
      date: $(cols.get(2)).text().trim(),
      link: $('a', cols.get(1)).attr('href')
    };
  }).get();
};