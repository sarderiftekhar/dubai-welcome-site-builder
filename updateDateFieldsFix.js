import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the file
const filePath = path.join(__dirname, 'src', 'pages', 'IndividualOnboarding.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace the date fields with calendar buttons
const oldPattern = /<div className="relative">[\s\S]*?<input[\s\S]*?type="date"[\s\S]*?onChange={[\s\S]*?}[\s\S]*?\/>[\s\S]*?<button[\s\S]*?>[\s\S]*?<svg[\s\S]*?<\/svg>[\s\S]*?<\/button>[\s\S]*?<\/div>/g;

const newContent = `<div>
  <input 
    type="date" 
    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
    onChange={(e) => handleInputChange('kyc', 'clientDeclaration', 'date', e.target.value)}
  />
</div>`;

// Replace the pattern
content = content.replace(oldPattern, newContent);

// Write the updated content back to the file
fs.writeFileSync(filePath, content, 'utf8');

console.log('Date fields fixed successfully!'); 