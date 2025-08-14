1. Import Path Module

const path = require('path');


2. File Path Basics

console.log(__dirname);  // Directory of current file
console.log(__filename); // Full path including file name



3. Joining Paths (path.join)
Safely combines path segments using the right separator for the OS (/ for Linux/Mac, \ for Windows).

const fullPath = path.join('folder', 'subfolder', 'file.txt');
console.log(fullPath); // folder/subfolder/file.txt



4. Resolving Absolute Paths (path.resolve)
Builds an absolute path from segments, starting from the current working directory unless you specify /.


const absPath = path.resolve('folder', 'file.txt');
console.log(absPath); // /current/dir/folder/file.txt
5. Getting Directory Name (path.dirname)

console.log(path.dirname('/home/user/docs/file.txt'));
// /home/user/docs
6. Getting File Name (path.basename)
js
Copy
Edit
console.log(path.basename('/home/user/docs/file.txt'));
// file.txt

console.log(path.basename('/home/user/docs/file.txt', '.txt'));
// file
7. Getting File Extension (path.extname)
js
Copy
Edit
console.log(path.extname('index.html')); // .html
console.log(path.extname('archive.tar.gz')); // .gz
8. Parsing Paths (path.parse)
Breaks a file path into parts.


const parsed = path.parse('/home/user/docs/file.txt');
console.log(parsed);
/*
{
  root: '/',
  dir: '/home/user/docs',
  base: 'file.txt',
  ext: '.txt',
  name: 'file'
}
*/
9. Formatting Paths (path.format)
Opposite of path.parse.


const formatted = path.format({
  dir: '/home/user/docs',
  name: 'file',
  ext: '.txt'
});
console.log(formatted); // /home/user/docs/file.txt
10. Checking Path Type (path.isAbsolute)

console.log(path.isAbsolute('/home/user')); // true
console.log(path.isAbsolute('docs/file.txt')); // false
11. Normalize Paths (path.normalize)
Fixes unnecessary slashes or ../. parts.


console.log(path.normalize('/home//user/docs/../file.txt'));
// /home/user/file.txt
12. Path Separator (path.sep)
The OS-specific separator:


console.log(path.sep); // '/' (POSIX) or '\' (Windows)
13. Relative Paths (path.relative)
Finds the path from one location to another.


console.log(path.relative('/home/user/docs', '/home/user/images'));
// ../images
14. Delimiters for PATH Env Variable (path.delimiter)

console.log(path.delimiter); // ':' (POSIX) or ';' (Windows)
✅ When to Use path

