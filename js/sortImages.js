import fs from 'fs/promises';
import path from 'path';

const alphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'.split('');

const sortedImagesDir = path.join(process.cwd(), 'images'); 
const unsortedImagesDirectory = path.join(process.cwd(), 'unsortedImages');
const allImages = [];


fs.mkdir(sortedImagesDir)
    .catch(error => {
        if (error && error.code !== 'EEXIST') {
            console.error(error); 
        }
    })
    .then(() => {
        for (let letter of alphabet) {
            fs.mkdir(`${sortedImagesDir}/${letter}`)
                .catch(error => {
                    if (error && error.code !== 'EEXIST') {
                        console.error(error); 
                    }
                })
            fs.mkdir(`${sortedImagesDir}/другое`)
                .catch(error => {
                if (error && error.code !== 'EEXIST') {
                    console.error(error); 
                }
            })
        };
    })
    .then(() => {
        fs.readdir(unsortedImagesDirectory, { recursive: true }).then(files => {
            for (let file of files) {
                const absolute = path.join(unsortedImagesDirectory, file);
                fs.stat(absolute)
                .then((stats) => {
                    if (!stats.isDirectory()) {
                        allImages.push(absolute);

                    }
                })
                .then(() => {
                    allImages.forEach(item => {
                        let itemData = path.parse(item);
                        for (let i = 0; i < alphabet.length; i++) {
                            if (alphabet[i] === itemData.name[0] || alphabet[i].toUpperCase() === itemData.name[0].toUpperCase()) {
                                fs.rename( item, `${sortedImagesDir}/${alphabet[i]}/${itemData.base}`);
                            } else {
                                fs.rename( item, `${sortedImagesDir}/другое/${itemData.base}`);
                            }
                        };
                    }); 
                 })
            }
        });
    })
