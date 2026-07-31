const fs = require('fs');
const path = require('path');

function getFilesRecursively(dir, filterFn) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(filePath, filterFn));
    } else if (!filterFn || filterFn(filePath, file, stat)) {
      results.push(filePath);
    }
  });
  return results;
}

module.exports = { getFilesRecursively };
