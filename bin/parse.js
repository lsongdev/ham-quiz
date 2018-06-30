const fs = require('fs');
const util = require('util');
const Parser = require('../lib/parser');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const parser = new Parser();

[ 'A', 'B', 'C' ].forEach(async type => {
  const content = await readFile(`./src/${type}.txt`, 'utf8');
  const data = await parser.parse(content);
  console.log(data)
  await writeFile(`./${type}.json`, JSON.stringify(data, null, 2));
  return data;
});