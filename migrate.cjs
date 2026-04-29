const fs = require('fs');
const path = require('path');

const filesToProcess = [
  'src/pages/Services.tsx',
  'src/pages/Resources.tsx',
  'src/pages/Home.tsx',
  'src/pages/Article.tsx',
  'src/components/layout/Navbar.tsx',
  'src/components/layout/BottomNav.tsx',
  'src/components/DescubreSection.tsx'
];

for (const relPath of filesToProcess) {
  const file = path.join(__dirname, relPath);
  if (!fs.existsSync(file)) continue;
  
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace react-router-dom imports
  content = content.replace(/import\s+\{([^}]*)\}\s+from\s+['"]react-router-dom['"];?/g, (match, importsStr) => {
    let newImports = [];
    let hasLink = false;
    
    if (importsStr.includes('Link')) hasLink = true;
    
    let nextNavigationImports = [];
    if (importsStr.includes('useNavigate')) nextNavigationImports.push('useRouter');
    if (importsStr.includes('useLocation')) nextNavigationImports.push('usePathname');
    if (importsStr.includes('useParams')) nextNavigationImports.push('useParams');
    
    let result = [];
    if (hasLink) result.push(`import Link from 'next/link';`);
    if (nextNavigationImports.length > 0) {
      result.push(`import { ${nextNavigationImports.join(', ')} } from 'next/navigation';`);
    }
    return result.join('\n');
  });

  // Add "use client" if it uses navigation hooks or Framer Motion or useState
  if (!content.includes('"use client"') && !content.includes("'use client'")) {
    if (content.includes('useRouter') || content.includes('usePathname') || content.includes('useParams') || content.includes('motion') || content.includes('useState') || content.includes('useEffect') || content.includes('useRef')) {
      content = `"use client";\n\n` + content;
    }
  }

  // Replace <Link to="..."> with <Link href="...">
  content = content.replace(/<Link([^>]+)to=/g, '<Link$1href=');

  // Replace useNavigate with useRouter
  content = content.replace(/useNavigate\(\)/g, 'useRouter()');

  // Replace useLocation with usePathname
  content = content.replace(/useLocation\(\)/g, 'usePathname()');

  fs.writeFileSync(file, content, 'utf8');
}
console.log('Migration done.');
