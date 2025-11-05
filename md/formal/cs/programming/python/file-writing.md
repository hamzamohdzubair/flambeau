{{yaml}}

{{title}}

#ans: File Writing

---

### Write Mode

```python
#ans: write to file (overwrites)
with open("output.txt", "w") as file:
    file.write("Hello, World!")
```

---

### Write Multiple Lines

```python
#ans: write several lines
with open("output.txt", "w") as file:
    file.write("Line 1\n")
    file.write("Line 2\n")
    file.write("Line 3\n")
```

---

### Writelines

```python
#ans: write list of lines
lines = ["Line 1\n", "Line 2\n", "Line 3\n"]
with open("output.txt", "w") as file:
    file.writelines(lines)
```

---

### Append Mode

```python
#ans: append to existing file
with open("output.txt", "a") as file:
    file.write("Appended line\n")
```

---

### Write Returns Count

```python
#ans: write returns character count
with open("output.txt", "w") as file:
    count = file.write("Hello")
#ans: count is 5
```

---

### Exercises - Part 1

```python
# write mode behavior?
with open("file.txt", "w") as f:
    f.write("New content")
#ans: overwrites existing file
```

---

### Exercises - Part 2

```python
# write adds newline?
with open("file.txt", "w") as f:
    f.write("Line 1")
    f.write("Line 2")
#ans: "Line 1Line 2" (no newline)
```

---

### Exercises - Part 3

```python
# writelines adds newlines?
lines = ["A", "B", "C"]
with open("file.txt", "w") as f:
    f.writelines(lines)
#ans: "ABC" (no newlines)
```

---

### Exercises - Part 4

```python
# append to non-existent?
with open("new.txt", "a") as f:
    f.write("Text")
#ans: creates new file
```

---

### Exercises - Part 5

```python
# write empty string?
with open("file.txt", "w") as f:
    f.write("")
#ans: creates empty file
```

---

### Exercises - Part 6

```python
# write number?
with open("file.txt", "w") as f:
    f.write(42)
#ans: TypeError (must be string)
```

---

### Exercises - Part 7

```python
# write return value?
with open("file.txt", "w") as f:
    n = f.write("Hi")
#ans: n is 2
```

---

### Exercises - Part 8

```python
# write in read mode?
with open("file.txt", "r") as f:
    f.write("Text")
#ans: io.UnsupportedOperation
```

---

### Exercises - Part 9

```python
# append vs write?
#ans: "w" overwrites
#ans: "a" adds to end
```

---

### Exercises - Part 10

```python
# write binary?
with open("file.bin", "wb") as f:
    f.write(b"data")
#ans: writes bytes
```
