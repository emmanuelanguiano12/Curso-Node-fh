const fs = require('fs')

const data = fs.readFileSync('readme.md', 'utf-8')

const newData = data.replace(/React/ig, 'Angular') //Remplazar la palabra react por angular

fs.writeFileSync('readme-angular.md', newData); //Crear un archivo nuevo con la nueva data