#!/usr/bin/env node

const { parse } = require('../lib/parser');
const { readFile, writeFile } = require('fs').promises;

['A', 'B', 'C'].forEach(async type => {
  const content = await readFile(`./src/${type}.txt`, 'utf8');
  const data = await parse(content);
  console.log(data)
  await writeFile(`./${type}.json`, JSON.stringify(data, null, 2));
  return data;
});