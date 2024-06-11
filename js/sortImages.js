import fs from 'fs';
import path from 'path';

const sortedImagesDirectory = path.join(process.cwd(), 'images'); 
const unsortedImagesDirectory = path.join(process.cwd(), 'unsortedImages');
const allImages = [];


fs.mkdir(sortedImagesDirectory, error => {
    if (error && error.code !== 'EEXIST') {
        console.error(error);
    }
});

fs.readdir(unsortedImagesDirectory, { recursive: true }, (error, files) => {
    if (!error) {
        for (let file of files) {
            const absolute = path.join(unsortedImagesDirectory, file);
            fs.stat(absolute, (error, stats) => {
                if (!error) {
                    if (!stats.isDirectory()) {
                        allImages.push(absolute);
                        allImages.forEach(item => {
                            const itemData = path.parse(item);
                            if (itemData.name !== ".DS_Store") {
                                fs.mkdir(`${sortedImagesDirectory}/${itemData.name[0].toUpperCase()}`, error => {
                                    if (error && error.code !== 'EEXIST') {
                                        console.error(error);
                                    };
                                    fs.rename( item, `${sortedImagesDirectory}/${itemData.name[0].toUpperCase()}/${itemData.base}`, error => {
                                        if (error) {
                                            console.error(error);
                                        }
                                    });
                                });
                            }
                        })
                    }
                }    
            })
        }
    } else {
        console.error(error);
    }
})

