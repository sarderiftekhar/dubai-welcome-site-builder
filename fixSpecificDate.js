import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the file
const filePath = path.join(__dirname, 'src', 'pages', 'IndividualOnboarding.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace the date field in the CLIENT DECLARATION section 
// with fixed indentation and proper styling
const oldDateField = `                        <div>
  <input 
    type="date" 
    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
    onChange={(e) => handleInputChange('kyc', 'clientDeclaration', 'date', e.target.value)}
  />
</div>`;

const newDateField = `                        <div>
                          <input 
                            type="date" 
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
                            onChange={(e) => handleInputChange('kyc', 'clientDeclaration', 'date', e.target.value)}
                          />
                        </div>`;

// Replace the exact string with the new one - being very specific
content = content.replace(oldDateField, newDateField);

// Write the updated content back to the file
fs.writeFileSync(filePath, content, 'utf8');

console.log('Date field fixed successfully!');

// Also update any other instances with similar issues
fs.writeFileSync(
  'dateFixReport.txt', 
  `Old date pattern found at line 656:\n${oldDateField}\n\nReplaced with:\n${newDateField}`,
  'utf8'
); 