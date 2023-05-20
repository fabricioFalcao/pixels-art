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
  const pallete = document.getElementsByClassName('color');
  for (let i = 1; i < pallete.length; i += 1) {
    pallete[i].style.backgroundColor = randomColor();
  }
});
