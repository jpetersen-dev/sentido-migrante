const fs = require('fs');
const path = require('path');

const dir = 'src';

function walk(directory) {
  let results = [];
  const list = fs.readdirSync(directory);
  list.forEach(function(file) {
    file = path.join(directory, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(dir);

const replacements = {
  'teal-50': 'menta', // #DAEDDF is the base menta
  'teal-100': 'menta',
  'teal-200': 'suculenta',
  'teal-300': 'suculenta', // A2BC97
  'teal-400': 'suculenta',
  'teal-500': 'olivo',     // 647453
  'teal-600': 'bosque',    // 516750 for primary green buttons
  'teal-700': 'bosque-dark', 
  'teal-800': 'bosque-dark',
  'mocha-50': 'menta',
  'mocha-100': 'menta',
  'mocha-200': 'suculenta',
  'mocha-300': 'suculenta',
  'mocha-400': 'suculenta',
  'mocha-500': 'olivo',
  'mocha-600': 'olivo-dark',
  'mocha-700': 'bosque-dark',
  'terra-50': 'menta',
  'terra-100': 'menta',
  'terra-200': 'suculenta',
  'terra-300': 'suculenta',
  'terra-400': 'suculenta',
  'terra-500': 'olivo',
  'terra-600': 'olivo-dark',
  'terra-700': 'bosque-dark'
};

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  content = content.replace(/(teal|mocha|terra)-([0-9]{2,3})/g, (match, prefix, num) => {
    return replacements[`${prefix}-${num}`] || `bosque`;
  });

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
