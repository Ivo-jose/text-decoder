// Criando um constante de alerta de forma que possa ser reaproveitada.
alertMsg = () => 'Desculpe, letras com acento, caracteres especiais e pontuação não aceitos!';

// Função que codifica texto
encodeText = (text) => {
  const code = {a: 'ai', e:'enter', i: 'imes', o: 'ober', u:'ufat'};
  return text.replace(/[aeiou]/g, vowel => code[vowel]);
}

// Função que decodifica o texto
decodeText = (text) => {
  const decode = {ai: 'a', enter: 'e', imes:'i', ober:'o', ufat:'u'};
  return text.replace(/(ai|enter|imes|ober|ufat)/g , str => decode[str]);
}

// Valida a entrada de texto
validateText = (str) => {
  const onlyLettersRegex = /^[a-z\s]+$/u;
  return !onlyLettersRegex.test(str); 
}

/* 
  Função que cria a referência para um elemento html 
  de entrada de texto como input, textarea e etc., e 
  retorna seu valor
*/ 
createReferenceToElementAndGetValue = (reference) => document.querySelector(`${reference}`).value;

/* 
  Função que cria uma referência para um elemento html 
  e adiciona um evento no mesmo
*/
createRefernceToElementAndApplyEvent = (reference, event, func) => document.querySelector(`${reference}`).addEventListener(`${event}`, func);

/* Função que copiara o texto que foi criptografado ou descriptografado */
copy = (text, btn) => {
  document.querySelector('#container__input__text').value = ''
  window.navigator.clipboard.writeText(text)
   .then((clip) => btn.innerText = 'Copiado')
}




manipulateDOMOutput = (str) => {
  let fatherEl = document.querySelector('.container__output');
  while(fatherEl.firstChild) {
    fatherEl.removeChild(fatherEl.firstChild);
  }
  let div = document.createElement('div');
  div.setAttribute('id', 'container__output__result');
  let p = document.createElement('p');
  p.classList.add('output__result__p');
  p.innerText = str;
  div.append(p);
  let btn = document.createElement('button');
  btn.innerText = 'Copiar';
  btn.classList.add('decrypt','copy');
  btn.addEventListener('click', () => copy(p.innerText,btn)); 
  div.append(btn);
  fatherEl.append(div);
}

/* Função que pega o valor do input valida e chama encodeText para codificar */
prepareToCode = () => {
  let str = createReferenceToElementAndGetValue('#container__input__text');
  console.log(validateText(str));
  if(validateText(str)) alert(alertMsg());
  else {
    manipulateDOMOutput(encodeText(str));
    console.log(encodeText(str));
  }
}

/* Função que pega o valor do input valida e chama para decodificar */
prepareToDecode = () => {
  let str = createReferenceToElementAndGetValue('#container__input__text');
  if(validateText(str)) alert(alertMsg());
  else {
    manipulateDOMOutput(decodeText(str));
  }
} 

/* 
  Aqui começa o programa
*/
//Chamando a função que cria um elemento e adiciona um evento
createRefernceToElementAndApplyEvent('#encrypt','click', prepareToCode);
createRefernceToElementAndApplyEvent('.decrypt','click', prepareToDecode);