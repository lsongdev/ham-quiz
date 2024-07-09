import { ready } from 'https://lsong.org/scripts/dom.js';
import { h, render, useState, useEffect } from 'https://lsong.org/scripts/react/index.js';


const LevelSelector = ({ onClick: setLevel }) => {
  return h('div', { className: 'level-selector' }, [
    h('h3', {}, 'Select Level:'),
    h('ul', {}, [
      h('li', {}, h("button", { className: 'button button-primary', onClick: () => setLevel('A') }, "A")),
      h('li', {}, h("button", { className: 'button button-warning', onClick: () => setLevel('B') }, "B")),
      h('li', {}, h("button", { className: 'button button-danger', onClick: () => setLevel('C') }, "C")),
    ])
  ]);
};

const loadData = async (level) => {
  const response = await fetch(`${level}.json`)
  const data = await response.json();
  const questions = data.map(question => {
    question.options = [].map.call('ABCD', (option, i) => {
      const text = question[option];
      return { text, correct: i === 0 };
    }).sort(() => Math.random() - .5);
    return question;
  });
  console.log('Questions', questions);
  return questions;
};

const Option = ({ option, className, onClick }) => {
  return h('div', { onClick, className: `question-option ${className}` }, [
    option.text,
  ])
};

const Question = ({ question }) => {
  const { I, P, Q } = question;
  const [options, setOptions] = useState(question.options);
  const handleClick = (answer, idx) => {
    console.log('Option', answer, idx);
    setOptions(options.map(opt => {
      if (opt.correct) {
        opt.style = 'correct';
      }
      if (opt.text == answer.text) {
        opt.style = opt.correct ? 'correct' : 'wrong';
      }
      return opt;
    }));
  }
  return h('div', { className: 'question' }, [
    h('div', { className: 'question-title' }, [
      h('span', { className: 'question-id' }, I), Q,
    ]),
    P && h('div', { className: 'question-image' }, [
      h('img', { src: `img/${P}` })
    ]),
    h('div', { className: `question-options` }, [
      options.map((option, i) => h(Option, { option, className: `question-option-${i} question-option-${option.style}`, onClick: () => handleClick(option, i) }))
    ])
  ]);
};

const App = () => {
  const [level, setLevel] = useState();
  const [questions, setData] = useState([]);
  useEffect(() => {
    if (!level) return;
    console.log('Level', level);
    loadData(level).then(setData);
  }, [level]);
  return [
    h('h2', {}, 'HAM Quiz'),
    !level && h(LevelSelector, { onClick: setLevel }),
    questions && questions.map(question => h(Question, { question }))
  ];
};

ready(() => {
  const app = document.getElementById('app');
  render(h(App), app);
});
