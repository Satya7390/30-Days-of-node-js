const fs = require('fs');

function readFileContent(filePath) {
  fs.readFile(filePath, 'utf8', (error, filedata) => {
    if (error) {
      console.error('Error reading file:', error.message);
    } else {
      console.log('File Content:');
      console.log(filedata);
    }
  });
}

// Test Cases
readFileContent('file1.txt');
// Expected Output: Content of file1.txt

readFileContent('empty-file.txt');
// Expected Output: (empty string)

readFileContent('nonexistent-file.txt');
// Expected Output: Error reading file: ENOENT: no such file or directory...
