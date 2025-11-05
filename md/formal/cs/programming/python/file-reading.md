{{yaml}}

{{title}}

#ans: File Reading

---

### Open and Read

```python
#ans: open and read file
file = open("data.txt", "r")
content = file.read()
file.close()
```

---

### Context Manager (Best Practice)

```python
#ans: with statement
with open("data.txt", "r") as file:
    content = file.read()
#ans: file automatically closed
```

---

### Read Lines

```python
#ans: read all lines
with open("data.txt", "r") as file:
    lines = file.readlines()
#ans: returns list of lines
```

---

### Read Line by Line

```python
#ans: iterate over lines
with open("data.txt", "r") as file:
    for line in file:
        print(line.strip())
```

---

### Readline Method

```python
#ans: read one line at a time
with open("data.txt", "r") as file:
    line1 = file.readline()
    line2 = file.readline()
```

---

### Read with Limit

```python
#ans: read n characters
with open("data.txt", "r") as file:
    content = file.read(10)
#ans: first 10 characters
```

---

### Exercises - Part 1

```python
# what happens without close?
file = open("data.txt", "r")
content = file.read()
#ans: file remains open (bad practice)
```

---

### Exercises - Part 2

```python
# read() returns what type?
with open("data.txt", "r") as f:
    content = f.read()
#ans: str (string)
```

---

### Exercises - Part 3

```python
# readlines() returns?
with open("data.txt", "r") as f:
    lines = f.readlines()
#ans: list of strings
```

---

### Exercises - Part 4

```python
# strip() in loop?
for line in file:
    print(line.strip())
#ans: removes \n at end
```

---

### Exercises - Part 5

```python
# read empty file?
with open("empty.txt", "r") as f:
    content = f.read()
#ans: "" (empty string)
```

---

### Exercises - Part 6

```python
# file not found?
with open("missing.txt", "r") as f:
    pass
#ans: FileNotFoundError
```

---

### Exercises - Part 7

```python
# read twice?
with open("data.txt", "r") as f:
    c1 = f.read()
    c2 = f.read()
#ans: c2 is "" (already at end)
```

---

### Exercises - Part 8

```python
# readline at end?
with open("data.txt", "r") as f:
    f.read()
    line = f.readline()
#ans: "" (empty string)
```

---

### Exercises - Part 9

```python
# iterate multiple times?
with open("data.txt", "r") as f:
    for line in f:
        pass
    for line in f:
        pass
#ans: second loop doesn't run
```

---

### Exercises - Part 10

```python
# read with encoding?
with open("data.txt", "r", encoding="utf-8") as f:
    content = f.read()
#ans: specify encoding explicitly
```
