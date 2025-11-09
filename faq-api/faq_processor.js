const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Function to clean HTML content
const cleanHtml = (html) => {
  if (!html) return '';
  const $ = cheerio.load(html);
  // Remove all HTML tags and return the text content
  return $.text().replace(/\s\s+/g, ' ').trim();
};

// Recursive function to get all JSON files from a directory and its subdirectories
const getAllFaqFiles = (dirPath, arrayOfFiles) => {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      // If it's a directory, recurse
      arrayOfFiles = getAllFaqFiles(filePath, arrayOfFiles);
    } else if (file.endsWith('.json')) {
      // If it's a JSON file, add it
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
};


const loadFaqData = () => {
  const faqData = [];
  // Base directory where subfolders are located
  const baseFaqDataDir = path.join(__dirname, 'data'); 
  
  try {
    // Get all JSON file paths, traversing subdirectories
    const allFilePaths = getAllFaqFiles(baseFaqDataDir);

    allFilePaths.forEach(filePath => {
      
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const jsonData = JSON.parse(fileContent);

      const questionHistory = jsonData.result.history.slice(-1)[0]; 
      const questionContent = questionHistory ? cleanHtml(questionHistory.content) : null;
      
      const professorAnswerEntry = jsonData.result.children?.find(
          child => child.type === 'i_answer'
      );
      const answerContent = professorAnswerEntry && professorAnswerEntry.history.length > 0
          ? cleanHtml(professorAnswerEntry.history[0].content)
          : null;

      if (questionContent && answerContent) {
          const cleanAnswer = answerContent.startsWith('Καλησπέρα,')
              ? answerContent.substring('Καλησπέρα,'.length).trim()
              : answerContent;

          faqData.push({
              question: questionContent,
              answer: cleanAnswer
          });
      }
    });

    const contextString = faqData
      .map(item => `Ερώτηση: ${item.question}\nΑπάντηση: ${item.answer}`)
      .join("\n---\n");

    console.log(`Loaded and processed ${faqData.length} Q&A pairs from all subfolders.`);
    return contextString;

  } catch (error) {
    console.error("FATAL: Could not load FAQ data. Check paths and JSON structure/permissions.", error.message);
    return null; 
  }
};

module.exports = { loadFaqData };