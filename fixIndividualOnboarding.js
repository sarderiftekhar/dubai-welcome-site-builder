import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the file
const filePath = path.join(__dirname, 'src', 'pages', 'IndividualOnboarding.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Fix the indentation of date fields
content = content.replace(
  /(<div>\s+)<input\s+type="date"\s+className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"\s+onChange={\(e\) => handleInputChange\('kyc', 'clientDeclaration', 'date', e\.target\.value\)}\s+\/>\s+<\/div>/g,
  (match, div) => {
    return `${div}                          <input 
                            type="date" 
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
                            onChange={(e) => handleInputChange('kyc', 'clientDeclaration', 'date', e.target.value)}
                          />
                        </div>`;
  }
);

// Write the updated content back to the file
fs.writeFileSync(filePath, content, 'utf8');

console.log('Date fields indentation fixed successfully!'); 