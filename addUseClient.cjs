const fs = require('fs');
const path = require('path');

function addUseClient(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      addUseClient(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (!content.includes('"use client"') && !content.includes("'use client'")) {
        if (content.includes('useState') || content.includes('useEffect') || content.includes('useRef') || content.includes('useRouter') || content.includes('usePathname') || content.includes('motion')) {
          fs.writeFileSync(fullPath, '"use client";\n\n' + content);
          console.log(`Added use client to ${fullPath}`);
        }
      }
    }
  }
}

addUseClient('src/components');
