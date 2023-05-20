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

document.body.appendChild(elementCreator('h1', 'title', 0, 'Paleta de Cores'));

// elementCreator('h1', 'title', null, 'Paleta de cores');
// document.body.appendChild(element)

