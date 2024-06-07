import fs from 'fs';
import path from 'path';

const mainDirectory = process.cwd();
const unsortedImagesDirectory = 'unsortedImages';
const targetDirectory = 'images';

const alphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'.split('');

if (!fs.existsSync(targetDirectory)) {
    fs.mkdirSync(`./${targetDirectory}`, err => {
        throw err;
    });
};

for (let i = 0; i < alphabet.length; i++) {
    if (!fs.existsSync(`${targetDirectory}/${alphabet[i]}`)) {
        fs.mkdirSync(`${targetDirectory}/${alphabet[i]}`, err => {
            throw err;
        });
    };
}; 

let images  = [];
  
function throughDirectory(dir) {
    fs.readdirSync(dir).forEach(file => {
        const absolute = path.join(dir, file);
        if (fs.statSync(absolute).isDirectory()) {
            return throughDirectory(absolute);
          } else {  
            return images.push(absolute);
          }
      });
    };

throughDirectory(`${mainDirectory}/${unsortedImagesDirectory}`);

images.forEach(item => {
    for (let i = 0; i < alphabet.length; i++) {
        let itemData = path.parse(item);
        if (alphabet[i] === itemData.name[0]) {
            fs.rename( item, `${mainDirectory}/${targetDirectory}/${alphabet[i]}/${itemData.base}`, err => {
                if (err) {
                    throw err;
                };
            });
        };
    };
});