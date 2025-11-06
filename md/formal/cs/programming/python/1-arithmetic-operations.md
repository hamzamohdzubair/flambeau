{{yaml}}

{{title}}

# Arithmetic Operations

---

### Basic Arithmetic

```python
# addition
10 + 5
#ans: 15
#ans: subtraction
10 - 5
#ans: 5
#ans: multiplication
10 * 5
#ans: 50
```

---

### Division Operations

```python
# division (always returns float)
10 / 5
#ans: 2.0
10 / 3
#ans: 3.3333...
#ans: floor division
10 // 3
#ans: 3
```

---

### Modulus

```python
# modulus (remainder)
10 % 3
#ans: 1
7 % 3
#ans: 1
15 % 4
#ans: 3
```

---

### Exponentiation

```python
# power/exponentiation
10 ** 2
#ans: 100
2 ** 3
#ans: 8
5 ** 0
#ans: 1
```

---

### Operator Precedence

```python
# PEMDAS rules apply
10 + 5 * 2
#ans: 20 (multiply first)
(10 + 5) * 2
#ans: 30 (parentheses first)
2 + 3 * 4
#ans: 14
```

---

### Exercises - Part 1

```python
# what is the result?
7 % 3
#ans: 1
#ans: division types
10 / 3
#ans: 3.3333...
10 // 3
#ans: 3
```

---

### Exercises - Part 2

```python
# negative modulus?
-10 % 3
#ans: 2
# what is this?
2 ** 3 ** 2
#ans: 512 (right associative: 2^(3^2) = 2^9)
```

---

### Exercises - Part 3

```python
# operator precedence?
10 + 5 * 2
#ans: 20
# what happens?
5 / 0
#ans: ZeroDivisionError
```

---

### Exercises - Part 4

```python
# floor division with negative?
-10 // 3
#ans: -4
# modulus with float?
10.5 % 3
#ans: 1.5
```

---

### Exercises - Part 5

```python
# what is result?
100 // 10
#ans: 10
# power of zero?
5 ** 0
#ans: 1
# negative exponent?
2 ** -1
#ans: 0.5
```

---

### Exercises - Part 6

```python
# order of operations?
2 * 3 ** 2
#ans: 18 (exponent first)
# mixing operations?
10 - 5 + 3
#ans: 8 (left to right)
# division by float?
10 / 2.0
#ans: 5.0
```
