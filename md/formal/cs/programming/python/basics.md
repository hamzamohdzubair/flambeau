{{yaml}}

{{title}}

#ans: Python Basics

---

### Variables and Assignment

```python
# variable assignment
x = 5
name = "Alice"
pi = 3.14
#ans: multiple assignment
a, b, c = 1, 2, 3
#ans: swap values
x, y = 10, 20
x, y = y, x
#ans: x is now 20, y is now 10
```

---

### Variables and Assignment - Exercises

```python
# what is the value of x?
x = 10
#ans: 10
# what happens after this swap?
a, b = 5, 15
a, b = b, a
#ans: a=15, b=5
# what is z after this?
x, y, z = 1, 2, 3
z = x + y
#ans: 3
# can you assign like this?
x = y = z = 0
#ans: yes, all are 0
# what is the value of b?
a = 5
b = a
a = 10
#ans: 5
# what does this produce?
x, y = 1, 2, 3
#ans: Error: too many values to unpack
# what is y?
x = y = 5
x = x + 1
#ans: 5
# multiple assignment with calculation?
a, b = 10, 20
a, b = a+b, a-b
#ans: a=30, b=-10
# what happens here?
x = 1
x = x
#ans: x is still 1
#ans: tricky swap
x, y = 5, 10
x, y = y, x+y
#ans: x=10, y=15
# assignment from right to left?
a = b = 3
b = 5
#ans: a=3, b=5
# chained assignment with operation?
x = 5
y = (x := x + 1)
#ans: x=6, y=6 (walrus operator)
```

---

### Data Types

```python
# integer
age = 25
type(age)
#ans: <class 'int'>
#ans: float
price = 19.99
type(price)
#ans: <class 'float'>
#ans: string
message = "Hello, World!"
type(message)
#ans: <class 'str'>
#ans: boolean
is_valid = True
type(is_valid)
#ans: <class 'bool'>
is_empty = False
```

---

### Data Types - Exercises

```python
# what type is this?
x = 5.0
#ans: <class 'float'>
# what type is this?
y = "123"
#ans: <class 'str'>
# what type results?
result = 10 / 2
#ans: <class 'float'>
# what type is this?
z = True + False
#ans: <class 'int'> (True=1, False=0)
# what type?
a = 5
b = 2
c = a / b
#ans: <class 'float'>
# what type?
x = 10
y = 3
z = x // y
#ans: <class 'int'>
# tricky: what type?
value = "5" + "3"
#ans: <class 'str'> (result is "53")
# what is the type?
x = None
#ans: <class 'NoneType'>
# what type is this expression?
result = 5 > 3
#ans: <class 'bool'>
# what happens?
x = int(True)
#ans: 1, type is <class 'int'>
# mixing types?
x = 5 + 2.5
#ans: 7.5, type is <class 'float'>
# edge case?
x = bool([])
#ans: False, type is <class 'bool'>
```

---

### Basic Operations

```python
# arithmetic operations
10 + 5
#ans: 15
10 - 5
#ans: 5
10 * 5
#ans: 50
10 / 5
#ans: 2.0
10 // 3
#ans: 3
10 % 3
#ans: 1
10 ** 2
#ans: 100
#ans: comparison operations
5 == 5
#ans: True
5 != 3
#ans: True
5 > 3
#ans: True
5 < 3
#ans: False
5 >= 5
#ans: True
5 <= 3
#ans: False
```

---

### Basic Operations - Exercises

```python
# what is the result?
7 % 3
#ans: 1
#ans: division types
10 / 3
#ans: 3.3333...
10 // 3
#ans: 3
# negative modulus?
-10 % 3
#ans: 2
# what is this?
2 ** 3 ** 2
#ans: 512 (right associative: 2^(3^2) = 2^9)
# operator precedence?
10 + 5 * 2
#ans: 20
# comparison chain?
3 < 5 < 7
#ans: True
# what happens?
5 / 0
#ans: ZeroDivisionError
# floor division with negative?
-10 // 3
#ans: -4
# modulus with float?
10.5 % 3
#ans: 1.5
# comparison with different types?
5 == 5.0
#ans: True
# is vs ==?
a = [1, 2]
b = [1, 2]
a == b
#ans: True
a is b
#ans: False
```

---

### Logical Operations

```python
# logical operators
True and False
#ans: False
True or False
#ans: True
not True
#ans: False
#ans: combining conditions
x = 10
x > 5 and x < 15
#ans: True
x < 5 or x > 8
#ans: True
not (x == 10)
#ans: False
```

---

### Logical Operations - Exercises

```python
# what is the result?
True and True
#ans: True
# short circuit evaluation?
False and (1/0)
#ans: False (no error, doesn't evaluate second part)
# short circuit with or?
True or (1/0)
#ans: True (no error)
# what about this?
not False
#ans: True
# chaining and/or?
True or False and False
#ans: True (and has higher precedence)
# boolean with comparison?
5 > 3 and 10 < 20
#ans: True
# tricky: what is this?
bool([]) and bool([1])
#ans: False
# what evaluates?
0 or 5
#ans: 5 (returns last truthy value)
# and returns?
5 and 10
#ans: 10 (returns last value if all truthy)
# mixed types?
"hello" and ""
#ans: "" (returns last value or first falsy)
# what about this?
not not True
#ans: True
# De Morgan's law?
not (True and False)
#ans: True
not True or not False
#ans: True
```

---

### Type Conversion

```python
# to integer
int("42")
#ans: 42
int(3.14)
#ans: 3
int(True)
#ans: 1
#ans: to float
float("3.14")
#ans: 3.14
float(42)
#ans: 42.0
#ans: to string
str(42)
#ans: "42"
str(3.14)
#ans: "3.14"
#ans: to boolean
bool(1)
#ans: True
bool(0)
#ans: False
bool("")
#ans: False
bool("text")
#ans: True
```

---

### Type Conversion - Exercises

```python
# what is the result?
int("100")
#ans: 100
# what happens?
int("3.14")
#ans: ValueError
# float from string?
float("3.14")
#ans: 3.14
# bool from number?
bool(0)
#ans: False
bool(1)
#ans: True
bool(-1)
#ans: True
# bool from string?
bool("")
#ans: False
bool("False")
#ans: True (any non-empty string is True)
# string from bool?
str(True)
#ans: "True"
# int from bool?
int(False)
#ans: 0
# what about this?
int("  42  ")
#ans: 42 (whitespace is stripped)
# edge case?
int("0b101", 2)
#ans: 5 (binary to int)
# what happens?
float("inf")
#ans: inf (infinity)
# string to int base?
int("FF", 16)
#ans: 255 (hex to int)
```

---

### User Input and Output

```python
# output
print("Hello, World!")
#ans: Hello, World!
print("Age:", 25)
#ans: Age: 25
print("Name:", "Alice", "Score:", 95)
#ans: Name: Alice Score: 95
#ans: input (commented as it requires user interaction)
#ans: name = input("Enter your name: ")
#ans: age = input("Enter your age: ")
#ans: age = int(input("Enter your age: "))
```

---

### User Input and Output - Exercises

```python
# what is printed?
print(1, 2, 3)
#ans: 1 2 3
# what separator is used?
print("a", "b", "c", sep="-")
#ans: a-b-c
# what is printed?
print("Hello", end="")
print("World")
#ans: HelloWorld
# multiple arguments?
print(5 + 3)
#ans: 8
# what does this print?
print("Result:", 10, 20, sep=", ")
#ans: Result:, 10, 20
# what about this?
print()
#ans: (empty line)
# print with expression?
x = 5
print("x =", x)
#ans: x = 5
# what is the output?
print("Line1\nLine2")
#ans: Line1
#ans: Line2 (on separate lines)
# tab character?
print("Name:\tAlice")
#ans: Name:    Alice (with tab)
# escape quotes?
print("He said \"Hi\"")
#ans: He said "Hi"
# raw string?
print(r"C:\new\path")
#ans: C:\new\path (backslashes not escaped)
# print return value?
x = print("Hello")
#ans: Hello (printed)
#ans: x is None
```

---

### Comments

```python
# this is a single line comment
"""
This is a
multi-line comment
or docstring
"""
x = 5  # inline comment
```

---

### Comments - Exercises

```python
# what is x?
#ans: x = 10
x = 5
#ans: 5
# what gets executed?
x = 5  # x = 10
#ans: x is 5
# multiline comment?
"""
x = 10
"""
x = 5
#ans: x is 5
# can you do this?
x = 5 """comment"""
#ans: SyntaxError
# what about this?
x = 5  # comment
y = x
#ans: y is 5
# nested comments?
#ans: # this is a comment
#ans: valid, just a comment
# multiline string as comment?
'''
This is also
a comment
'''
#ans: valid if not assigned to anything
# what is x?
x = 5
#ans: x = 10
#ans: x is 5
# inline multiline?
x = 5 """ this won't work """
#ans: SyntaxError
# comment with backslash?
x = 5  # this is \
#ans: a comment
#ans: two separate single-line comments
# doc string vs comment?
def func():
    """This is docstring"""
    # This is comment
    pass
#ans: both valid, different purposes
```
