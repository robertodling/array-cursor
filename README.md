array-cursor
============

```js
var arrayCursor = require('array-cursor');

var cursor = arrayCursor([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
cursor.offset(3);
cursor.limit(3);

cursor.toArray();   // [4, 5, 6]

```
