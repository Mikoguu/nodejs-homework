import fs from 'fs/promises';
import path from 'path';

const alphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'.split('');

const mainDirectory = process.cwd();
const unsortedImagesDirectory = 'unsortedImages';
const targetDirectory = 'images';

let images  = [];

async function throughDirectory(dir) {
    
    const readableDir = await fs.readdir(dir);
    readableDir.shift();

    for (let file of readableDir) {
        const absolute = path.join(dir, file);
        const stat = await fs.stat(absolute);
        if (!stat.isDirectory()) {
            images.push(absolute);
        } else {  
            throughDirectory(absolute);
        }
    }
};

try {

    if (!fs.stat(targetDirectory)) {
       await fs.mkdir(`./${targetDirectory}`);
    };

    for (let i = 0; i < alphabet.length; i++) {
        if (!fs.stat(`${targetDirectory}/${alphabet[i]}`)) {
            await fs.mkdir(`${targetDirectory}/${alphabet[i]}`);
        };
    }; 

await throughDirectory(`${mainDirectory}/${unsortedImagesDirectory}`);

images.forEach(item => {
    let itemData = path.parse(item);
    for (let i = 0; i < alphabet.length; i++) {
        if (alphabet[i] === itemData.name[0]) {
            fs.rename( item, `${mainDirectory}/${targetDirectory}/${alphabet[i]}/${itemData.base}`);
        };
    };
}); 

} catch (err) {
    throw err;
};
