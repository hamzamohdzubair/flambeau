{{yaml}}

{{title}}

#ans: String Methods

---

### Case Methods

```python
#ans: upper and lower
"hello".upper()
#ans: "HELLO"
"HELLO".lower()
#ans: "hello"
"hello world".title()
#ans: "Hello World"
"hello".capitalize()
#ans: "Hello"
```

---

### Strip Methods

```python
#ans: remove whitespace
"  hello  ".strip()
#ans: "hello"
"  hello  ".lstrip()
#ans: "hello  "
"  hello  ".rstrip()
#ans: "  hello"
```

---

### Split

```python
#ans: split string
"apple,banana,cherry".split(",")
#ans: ['apple', 'banana', 'cherry']
"one two three".split()
#ans: ['one', 'two', 'three']
```

---

### Join

```python
#ans: join list to string
",".join(["a", "b", "c"])
#ans: "a,b,c"
" ".join(["Hello", "World"])
#ans: "Hello World"
```

---

### Find and Index

```python
#ans: find substring
"hello world".find("world")
#ans: 6
"hello world".find("xyz")
#ans: -1
"hello world".index("world")
#ans: 6
```

---

### Replace

```python
#ans: replace substring
"hello world".replace("world", "Python")
#ans: "hello Python"
"aaa".replace("a", "b", 2)
#ans: "bba" (replace first 2)
```

---

### Startswith/Endswith

```python
#ans: check start and end
"hello".startswith("he")
#ans: True
"hello".endswith("lo")
#ans: True
```

---

### Count

```python
#ans: count occurrences
"hello".count("l")
#ans: 2
"banana".count("a")
#ans: 3
```

---

### Exercises - Part 1

```python
# case methods?
"HeLLo".lower()
#ans: "hello"
"hello".upper()
#ans: "HELLO"
```

---

### Exercises - Part 2

```python
# strip only ends?
"  hello  ".strip()
#ans: "hello"
```

---

### Exercises - Part 3

```python
# split with limit?
"a-b-c-d".split("-", 2)
#ans: ['a', 'b', 'c-d']
```

---

### Exercises - Part 4

```python
# join with numbers?
"-".join([1, 2, 3])
#ans: TypeError (needs strings)
"-".join(["1", "2", "3"])
#ans: "1-2-3"
```

---

### Exercises - Part 5

```python
# find vs index?
"hello".find("x")
#ans: -1
"hello".index("x")
#ans: ValueError
```

---

### Exercises - Part 6

```python
# replace all?
"aaa".replace("a", "b")
#ans: "bbb"
```

---

### Exercises - Part 7

```python
# case sensitive?
"Hello".startswith("h")
#ans: False
"Hello".startswith("H")
#ans: True
```

---

### Exercises - Part 8

```python
# count overlapping?
"aaa".count("aa")
#ans: 1 (non-overlapping)
```

---

### Exercises - Part 9

```python
# empty split?
"".split()
#ans: []
"  ".split()
#ans: []
```

---

### Exercises - Part 10

```python
# join empty list?
",".join([])
#ans: ""
```
