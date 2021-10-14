const parseBlock = content =>
  content
    .split('\r\n\r\n')
    .filter(Boolean)

const parseQuestion = question =>
  question
    .split('\r\n')
    .filter(Boolean)
    .reduce((question, item) => {
      const m = item.match(/^(\[([A-Z])\])(.+)?$/);
      question[m[2]] = m[3];
      return question;
    }, {});


const parse = content => {
  return parseBlock(content)
    .slice(1)
    .map(parseQuestion);
}

module.exports = {
  parse,
  parseBlock,
  parseQuestion,
};