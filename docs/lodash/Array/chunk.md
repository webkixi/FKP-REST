# _.chunk  
> _.chunk(array, [size=1])  

Creates an array of elements split into groups the length of size. If array can't be split evenly, the final chunk will be the remaining elements.  

Example  
```
_.chunk(['a', 'b', 'c', 'd'], 2);
// => [['a', 'b'], ['c', 'd']]

_.chunk(['a', 'b', 'c', 'd'], 3);
// => [['a', 'b', 'c'], ['d']]
```
