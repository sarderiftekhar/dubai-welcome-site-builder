import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the file
const filePath = path.join(__dirname, 'src', 'pages', 'IndividualOnboarding.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Create a clean date input field for CLIENT DECLARATION section
const clientDeclarationFix = `<div>
  <input 
    type="date" 
    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
    onChange={(e) => handleInputChange('kyc', 'clientDeclaration', 'date', e.target.value)}
  />
</div>`;

// Find the CLIENT DECLARATION section and update its date field
// First, find the CLIENT DECLARATION heading
const clientDeclarationRegex = /<h3 className="text-\[#0066FF\] font-bold text-lg mb-6">CLIENT DECLARATION<\/h3>/;
const clientDeclarationMatch = content.match(clientDeclarationRegex);

if (clientDeclarationMatch) {
  // Get section starting from CLIENT DECLARATION heading
  const startIndex = clientDeclarationMatch.index;
  const sectionContent = content.substring(startIndex, startIndex + 2000); // Get reasonable chunk
  
  // Find the date field in this section
  const dateFieldRegex = /<div className="relative">[\s\S]*?<input[\s\S]*?type="date"[\s\S]*?onChange={[\s\S]*?}[\s\S]*?\/>[\s\S]*?<button[\s\S]*?>[\s\S]*?<\/button>[\s\S]*?<\/div>/;
  const dateFieldMatch = sectionContent.match(dateFieldRegex);
  
  if (dateFieldMatch) {
    // Replace just this specific date field
    const beforeSection = content.substring(0, startIndex + dateFieldMatch.index);
    const afterSection = content.substring(startIndex + dateFieldMatch.index + dateFieldMatch[0].length);
    content = beforeSection + clientDeclarationFix + afterSection;
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('CLIENT DECLARATION date field fixed!');
  } else {
    console.log('Could not find date field in CLIENT DECLARATION section');
  }
} else {
  console.log('Could not find CLIENT DECLARATION section');
}

console.log('Fix attempt completed!'); 