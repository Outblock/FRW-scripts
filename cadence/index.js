import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'


// 获取当前文件的目录路径（ES 模块替代__dirname 的方法）
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const fsPromises = fs.promises

let cadebceScripts = {}

const underscoreToCamelCase = (fileName) => {
  let name = fileName.replace(/_([a-z])/g, function (match, letter) {
    return letter.toUpperCase()
  })

  name = name.replace('Nft', 'NFT')
  name = name.replace('Ft', 'FT')

  return name
}

const readDirRecursive = async (dirPath, isScripts = true, addressMapping) => {
  let resolvedPath = path.resolve(__dirname, dirPath)
  let files = await fsPromises.readdir(resolvedPath)

  for (let file of files) {
    let filePath = path.join(resolvedPath, file)

    let stats = await fsPromises.stat(filePath)
    // console.log(stats)
    if (stats.isDirectory()) {
      // if (isScripts && filePath.endsWith('/transaction')) {
      //   break;
      // } else if (isScripts && filePath.endsWith('/transaction')) {
      //   break;
      // }
      await readDirRecursive(filePath, isScripts, addressMapping)
    } else {
      if (filePath.indexOf('.cdc') == -1 || filePath.indexOf('_test.cdc') > 0)
        continue
      let fileContent = await fsPromises.readFile(filePath, 'utf8')
      fileContent = replaceAddress(fileContent, addressMapping)
      const pathArr = filePath.split('/')
      const key = pathArr[pathArr.length - 3]

      let fileName = pathArr[pathArr.length - 1].split('.')[0]
      fileName = underscoreToCamelCase(fileName)
      // const base64Script = base64encode(fileContent)
      if (cadebceScripts[key]) {
        cadebceScripts[key] = {
          ...cadebceScripts[key],
          [fileName]: fileContent,
        }
      } else {
        cadebceScripts[key] = { [fileName]: fileContent }
      }
    }
  }
  return cadebceScripts
}

export const readCadenceScripts = async (path = './', addressMapping) => {
  return await readDirRecursive(path, true, addressMapping)
}



export const readQuery = async (path, addressMapping) => {
  const pathArr = path.split('/')
  pathArr.splice(1, 0, 'query')
  const scriptPath = pathArr.join('/')
  const fileContent = await fsPromises.readFile(scriptPath, 'utf8')
  return replaceAddress(fileContent, addressMapping)
}

export const readTransaction = async (path, addressMapping) => {
  const pathArr = path.split('/')
  pathArr.splice(1, 0, 'transaction')
  const scriptPath = pathArr.join('/')
  const fileContent = await fsPromises.readFile(scriptPath, 'utf8')
  return replaceAddress(fileContent, addressMapping)
}

export const replaceAddress = (script, addressMapping = {}) => {
  let keys = Object.keys(addressMapping)

  keys.forEach((key) => {
    let addr = addressMapping[key]
    if (addr) {
      const regex = new RegExp(`${key}\n`, 'g')
      script = script.replace(regex, `${addressMapping[key]}\n`)
    }
  })

  return script
}
