export const toLocaleString = (number) => {
  if(typeof number === 'string') {
    number = +number
  }

  return number.toLocaleString('fr-FR') // pt-PT doesn't format 7831 correctly
}

export const nomeDistrito = (nome) => {
  let distritoLowerCase = nome.toLowerCase(),
    distritoNomeLocal

  switch (distritoLowerCase) {
    case 'bragança':
      distritoNomeLocal = 'braganca'
      break
    case 'castelo branco':
      distritoNomeLocal = 'castelo-branco'
      break
    case 'évora':
      distritoNomeLocal = 'evora'
      break
    case 'r. a. açores':
      distritoNomeLocal = 'acores'
      break
    case 'r. a. madeira':
      distritoNomeLocal = 'madeira'
      break
    case 'santarém':
      distritoNomeLocal = 'santarem'
      break
    case 'setúbal':
      distritoNomeLocal = 'setubal'
      break
    case 'viana do castelo':
      distritoNomeLocal = 'viana'
      break
    case 'vila real':
      distritoNomeLocal = 'vila-real'
      break
    default:
      distritoNomeLocal = distritoLowerCase
  }

  return distritoNomeLocal
}

export const calcPercentage = (total, part) => {
  return ((part * 100) / total).toFixed()
}

export const capitalizeFirstLetters = (text) => {
  const lower = text.toLowerCase()
  let words = lower.split(' ')
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1)
  }
  return words.toString().replaceAll(',', ' ')
}
