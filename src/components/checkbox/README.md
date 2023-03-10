the checkbox has pretty interesting properties, one is the indeterminate state. which luckily we can set in angular directly in the input with:
```html
<input type="checkbox" [indeterminate]="true" />
```

# Questions
1. if I wrap the whole input component within a compound checkbox including label. How can I get the data and the actions from the input without having to rewrite them in the host? 