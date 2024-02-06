const path = require('path');

function checkFileExtension(filePath, expectedExtension) {
    // Get the file extension using the path module
    const actualExtension = path.extname(filePath);

    // Check if the actual extension matches the expected extension
    if (actualExtension === expectedExtension) {
        console.log(`File has the expected extension: ${actualExtension}`);
    } else {
        console.log(`File does not have the expected extension. Expected: ${expectedExtension}, Actual: ${actualExtension}`);
    }
}

// Test cases
checkFileExtension('test-files/file1.txt', '.txt');
// Expected Output: File has the expected extension: .txt

checkFileExtension('test-files/image.png', '.jpg');
// Expected Output: File does not have the expected extension. Expected: .jpg, Actual: .png
