Basic Console Methods
javascript
// 1. console.log() - General output
console.log('Hello World'); // Prints: Hello World

// 2. console.error() - Error messages (prints to stderr)
console.error('Error occurred'); // Prints in red (in most terminals)

// 3. console.warn() - Warning messages
console.warn('This is a warning'); // Similar to error but for warnings

// 4. console.info() - Informational messages
console.info('This is informational'); // Alias for console.log



Advanced Console Methods
javascript
// 7. console.dir() - Displays object properties
const obj = { name: 'John', age: 30 };
console.dir(obj); // Prints object with properties

// 8. console.table() - Displays data as table
const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 }
];
console.table(users);

// 9. console.time() & console.timeEnd() - Measure time
console.time('timer');
// Some operation
console.timeEnd('timer'); // Prints elapsed time

// 10. console.trace() - Print stack trace
function foo() {
  console.trace('Trace message');
}
foo();





Grouping Output
javascript
// 11. console.group() & console.groupEnd() - Group related logs
console.group('User Details');
console.log('Name: John');
console.log('Age: 30');
console.groupEnd();

// 12. console.groupCollapsed() - Creates collapsed group
console.groupCollapsed('Advanced Details');
console.log('More info here');
console.groupEnd();




Assertions
javascript
// 13. console.assert() - Logs only if assertion is false
console.assert(1 === 2, 'Math is broken!'); // Will log
console.assert(1 === 1, 'This won't log'); // Won't log



    Counting
javascript
// 14. console.count() - Counts how many times called
console.count('counter'); // counter: 1
console.count('counter'); // counter: 2
console.countReset('counter'); // Resets the counter



Clearing the Console
javascript
// 15. console.clear() - Clears the terminal
console.clear(); // Clears the console (behavior varies by environment)
Styling (Node.js with util.inspect)
javascript
// 16. Custom styling (limited in Node.js compared to browsers)
const util = require('util');
console.log(util.inspect(obj, { colors: true, depth: null }));


7. Trace Stack

function first() {
  second();
}
function second() {
  console.trace('Trace here');
}
first();




5. Timing Code

console.time('LoopTime');
for (let i = 0; i < 1000000; i++) {}
console.timeEnd('LoopTime');
// LoopTime: 5.123ms