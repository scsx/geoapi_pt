export const toLocaleString = (number) => {
  return number.toLocaleString('pt-PT')
}

export const nomeDistrito = (nome) => {
  let distritoLowerCase = nome.toLowerCase(),
    distritoNomeLocal

  switch (distritoLowerCase) {
    case 'bragança':
      distritoNomeLocal = 'braganca'
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
