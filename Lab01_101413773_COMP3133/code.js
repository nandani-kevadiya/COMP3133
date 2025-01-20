
const fs = require('fs'); 
const csv = require('csv-parser'); 

const inputFilePath = 'input_countries.csv'; 
const canadaFilePath = 'canada.txt'; 
const usaFilePath = 'usa.txt'; 

if (fs.existsSync(canadaFilePath)) {
  fs.unlinkSync(canadaFilePath); 
}
if (fs.existsSync(usaFilePath)) {
  fs.unlinkSync(usaFilePath); 
}

fs.createReadStream(inputFilePath)
  .pipe(csv()) 
  .on('data', (row) => {
    
    if (row.country === 'Canada') {
      const canadaData = `${row.country},${row.year},${row.population}\n`;
      fs.appendFileSync(canadaFilePath, canadaData); 
    }

    
    if (row.country === 'United States') {
      const usaData = `${row.country},${row.year},${row.population}\n`;
      fs.appendFileSync(usaFilePath, usaData); 
    }
  })
  .on('end', () => {
    
    console.log('CSV file has been successfully processed.');
  })
  .on('error', (err) => {
    console.error('An error occurred:', err.message);
  });