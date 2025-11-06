{{yaml}}

{{title}}

#ans: Lists Basics

---

### Creating Lists

```python
# create list
fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "two", 3.0, True]
empty = []
```

---

### Accessing Elements

```python
# indexing
fruits = ["apple", "banana", "cherry"]
fruits[0]
#ans: "apple"
fruits[-1]
#ans: "cherry"
fruits[1]
#ans: "banana"
```

---

### Slicing

```python
# slice lists
numbers = [0, 1, 2, 3, 4, 5]
numbers[1:4]
#ans: [1, 2, 3]
numbers[:3]
#ans: [0, 1, 2]
numbers[3:]
#ans: [3, 4, 5]
```

---

### List Length

```python
# len() function
fruits = ["apple", "banana", "cherry"]
len(fruits)
#ans: 3
len([])
#ans: 0
```

---

### Modifying Elements

```python
# change element
fruits = ["apple", "banana", "cherry"]
fruits[1] = "blueberry"
#ans: fruits is ["apple", "blueberry", "cherry"]
```

---

### Exercises - Part 1

```python
# what is the first element?
lst = [10, 20, 30]
lst[0]
#ans: 10
```

---

### Exercises - Part 2

```python
# negative index?
lst = [10, 20, 30]
lst[-1]
#ans: 30
lst[-2]
#ans: 20
```

---

### Exercises - Part 3

```python
# slicing result?
lst = [1, 2, 3, 4, 5]
lst[1:4]
#ans: [2, 3, 4]
```

---

### Exercises - Part 4

```python
# what happens?
lst = [1, 2, 3]
lst[5]
#ans: IndexError
```

---

### Exercises - Part 5

```python
# empty slice?
lst = [1, 2, 3]
lst[5:10]
#ans: []
```

---

### Exercises - Part 6

```python
# step in slice?
lst = [0, 1, 2, 3, 4, 5]
lst[::2]
#ans: [0, 2, 4]
```

---

### Exercises - Part 7

```python
# reverse list?
lst = [1, 2, 3]
lst[::-1]
#ans: [3, 2, 1]
```

---

### Exercises - Part 8

```python
# modify with slice?
lst = [1, 2, 3, 4, 5]
lst[1:3] = [20, 30]
#ans: [1, 20, 30, 4, 5]
```

---

### Exercises - Part 9

```python
# nested list access?
matrix = [[1, 2], [3, 4]]
matrix[0][1]
#ans: 2
```

---

### Exercises - Part 10

```python
# list concatenation?
lst1 = [1, 2]
lst2 = [3, 4]
lst1 + lst2
#ans: [1, 2, 3, 4]
```
