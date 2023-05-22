// Função para criar novos elementos no "body". Para não declarar um atributo, declare o parâmetro como "0".

function elementCreator(elementType, elementId, elementClass, elementText) {
  const element = document.createElement(elementType);
  if (elementId !== 0) {
    element.id = elementId;
  }
  if (elementClass !== 0) {
    element.className = elementClass;
  }
  if (elementText !== 0) {
    element.innerText = elementText;
  }
  return element;
}

// 1 - Adicione à página o título "Paleta de Cores"

const header = document.querySelector('header');
header.appendChild(elementCreator('h1', 'title', 0, 'Paleta de Cores'));

// 2 - Adicione à página uma paleta contendo quatro cores distintas

const nav = document.querySelector('nav');
nav.appendChild(elementCreator('section', 'color-palette', 0, 0));

const colorPallete = (colors) => {
  const pallete = document.querySelector('#color-palette');
  for (let i = 0; i < colors.length; i += 1) {
    const color = colors[i];
    const currentColor = elementCreator('div', 0, 'color', 0);
    currentColor.style.backgroundColor = color;
    pallete.appendChild(currentColor);
  }
};
colorPallete(['black', 'red', 'yellow', 'green']);

// 4 - Adicione um botão para gerar cores aleatórias para a paleta de cores

nav.appendChild(elementCreator('div', 'button-random-color', 0, 'Cores aleatórias'));

const randomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

const randomButton = document.getElementById('button-random-color');

randomButton.addEventListener('click', () => {
  const newPallete = [document.querySelector('.color').style.backgroundColor];
  const pallete = document.getElementsByClassName('color');
  for (let i = 1; i < pallete.length; i += 1) {
    pallete[i].style.backgroundColor = randomColor();
    newPallete.push(pallete[i].style.backgroundColor);
  }
  localStorage.setItem('colorPalette', JSON.stringify(newPallete));
});

// 5 - Implemente uma função usando localStorage para que a paleta de cores gerada aleatoriamente seja mantida após recarregar a página

const loadPallete = () => {
  const newPallete = JSON.parse(localStorage.getItem('colorPalette'));
  const pallete = document.getElementsByClassName('color');
  if (newPallete) {
    for (let i = 0; i < pallete.length; i += 1) {
      pallete[i].style.backgroundColor = newPallete[i];
    }
  }
};

// 6 - Adicione à página um quadro contendo 25 pixels

const add25Board = () => {
  const main = document.querySelector('main');
  main.appendChild(elementCreator('section', 'pixel-board', 0, 0));

  const board = document.querySelector('#pixel-board');
  board.style.maxWidth = '260px';
  for (let i = 1; i <= 25; i += 1) {
    board.appendChild(elementCreator('div', 0, 'pixel', 0));
  }
};

// 8 - Defina a cor preta como cor inicial da paleta de cores

const blackBox = document.querySelector('.color');
blackBox.classList.add('selected');

// 9 - Crie uma função para selecionar uma cor na paleta de cores

let newColor = 'black';

const selectColor = () => {
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('color')) {
      const previousSelected = document.querySelector('.color.selected');
      previousSelected.classList.remove('selected');
      event.target.classList.add('selected');
    }
    newColor = event.target.style.backgroundColor;
  });
};

// 10 - Crie uma função que permita preencher um pixel do quadro com a cor selecionada na paleta de cores

const blankBoard = [];
for (let index = 0; index < 100; index += 1) {
  blankBoard.push('white');
}
const coloredBoard = blankBoard.slice();
const colorPixel = () => {
  const pixels = document.querySelectorAll('.pixel');
  for (let box = 0; box < pixels.length; box += 1) {
    pixels[box].addEventListener('click', (event) => {
      coloredBoard[box] = newColor;
      event.target.style.backgroundColor = newColor;
      localStorage.setItem('pixelBoard', JSON.stringify(coloredBoard));
    });
  }
};

// 11 - Crie um botão que retorne a cor do quadro para a cor inicial

const clearButton = nav.appendChild(elementCreator('div', 'clear-board', 0, 'Limpar'));

const clearBoard = () => {
  clearButton.addEventListener('click', () => {
    const pixels = document.querySelectorAll('.pixel');
    for (let index = 0; index < pixels.length; index += 1) {
      pixels[index].style.backgroundColor = blankBoard[index];
    }
    localStorage.clear();
  });
};

// 12 - Crie uma função para salvar e recuperar o seu desenho atual no localStorage

const loadBoard = () => {
  const savedBoard = JSON.parse(localStorage.getItem('pixelBoard'));
  const pixels = document.querySelectorAll('.pixel');
  if (savedBoard) {
    for (let i = 0; i < pixels.length; i += 1) {
      pixels[i].style.backgroundColor = savedBoard[i];
    }
  }
};

// 13 - Crie um input que permita à pessoa usuária preencher um novo tamanho para o quadro de pixels

const input = document.querySelector('input');
const button = document.querySelector('button');

const correctInput = () => {
  let n = input.value;
  if (n < 5) {
    n = 5;
  } else if (n > 50) {
    n = 50;
  }
  localStorage.setItem('boardSize', n);
  return n;
};

const newBoard = (n) => {
  document.getElementById('pixel-board').remove();
  localStorage.removeItem('pixelBoard');

  const main = document.querySelector('main');
  main.appendChild(elementCreator('section', 'pixel-board', 0, 0));

  const board = document.querySelector('#pixel-board');
  board.style.maxWidth = `${52 * n}px`;

  for (let i = 1; i <= n * n; i += 1) {
    board.appendChild(elementCreator('div', 0, 'pixel', 0));
  }
};

const resizeBoard = () => {
  button.addEventListener('click', () => {
    if (input.value) {
      newBoard(correctInput());
      input.value = '';
    } else {
      alert('Board inválido!');
    }
  });

  input.addEventListener('keyup', (event) => {
    if (event.key === 'Enter' && input.value) {
      newBoard(correctInput());
      input.value = '';
    }
  });
};

// 15 - Crie uma função para manter o tamanho novo do board ao recarregar a página

const savedSize = localStorage.getItem('boardSize');
const loadBoardSize = () => {
  if (savedSize) {
    newBoard(Number(savedSize));
  }
};

// Functions on load

window.onload = () => {
  add25Board();
  loadPallete();
  resizeBoard();
  loadBoardSize();
  loadBoard();
  selectColor();
  colorPixel();
  clearBoard();
};
