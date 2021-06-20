#!/usr/bin/env node

const pkg = require('../package');
const javbus = require('..')();

const [command, ...args] = process.argv.slice(2);

const pad = (str, n = 10) => {
  while (str.length < n) {
    str += ' ';
  }
  return str;
}

const commands = {
  async ls(page = 1) {
    const list = await javbus.page(page);
    for (const show of list) {
      console.log(pad(show.id), show.name);
    }
  },
  async search(keyword) {
    const list = await javbus.search(keyword);
    for (const show of list) {
      console.log(pad(show.id), show.name);
    }
  },
  async show(id) {
    const show = await javbus.show(id);
    if (args.includes('--magnet')) {
      show.files = await javbus.magnet(show.gid);
    }
    if (args.includes('--json')) {
      const text = JSON.stringify(show, null, 2);
      process.stdout.write(text);
      return;
    }

    console.log();
    console.log(show.title);
    console.log(show.cover);
    console.log();
    console.log(pad('Director', 15), show.director);
    console.log(pad('Stars', 15), show.stars.map(star => star.name).join(' / '));
    console.log(pad('Length', 15), show.length);
    console.log(pad('Release Date', 15), show.release_date);
    console.log();
    console.log('==== images ====');
    for (const image of show.images) {
      console.log(image);
    }
    console.log();
    console.log('==== stars ====');
    for (const star of show.stars) {
      console.log(star.name, star.avatar);
    }
    console.log();
    const files = await javbus.magnet(show.gid);
    console.log('==== download links ====');
    for (const file of files) {
      console.log();
      console.log(file.name);
      console.log(file.size);
      console.log(file.date);
      console.log(file.link);
    }
  },
  help() {
    console.log();
    console.log(` ${pkg.name}@${pkg.version}`);
    console.log();
    console.log(' - ls');
    console.log(' - search <keyword>');
    console.log(' - show <id>');
    console.log(' - help');
  }
};

(commands[command] || commands.help).apply(this, args);