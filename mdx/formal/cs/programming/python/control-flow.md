---
theme: gaia2
paginate: true
transition: slide
class: lead
footer: '[<iconify-icon icon="hugeicons:home-11" title="Home"></iconify-icon>](/index.html) [<iconify-icon icon="si:left-up-line" title="Back"></iconify-icon>](../index.html) [<iconify-icon icon="octicon:move-to-start-24" title="Start"></iconify-icon>](#1)'
---
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
<link href="/styles/zoom.css" rel="stylesheet">

<script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
<script src="/scripts/zoom.js"></script>
<script src="/scripts/navigation.js"></script>
<script src="/scripts/backbutton.js"></script>

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-NLV7GHEJDK"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-NLV7GHEJDK');
</script>

<!-- _class: lead invert -->

# Control Flow

---

### If Statement

```python
# basic if
x = 10
if x > 5:
    print("x is greater than 5")
# x is greater than 5
# if-else
age = 18
if age >= 18:
    print("Adult")
else:
    print("Minor")
# Adult
# if-elif-else
score = 85
if score >= 90:
    print("A")
elif score >= 80:
    print("B")
elif score >= 70:
    print("C")
else:
    print("F")
# B
```

---

### If Statement - Exercises

```python
# what is printed?
x = 5
if x > 10:
    print("Big")
else:
    print("Small")
# Small
# what about this?
score = 90
if score >= 90:
    print("A")
elif score >= 80:
    print("B")
# A (only first matching condition)
# edge case?
x = 0
if x:
    print("True")
else:
    print("False")
# False (0 is falsy)
# what prints?
age = 18
if age >= 18:
    print("Adult")
if age < 21:
    print("Not 21 yet")
# Adult
# Not 21 yet (two separate if statements)
# tricky: what happens?
if True:
    x = 5
else:
    x = 10
y = 20
# x is 5, y is 20 (y assignment is outside if)
# what is result?
x = 15
if x > 10:
    if x < 20:
        result = "Between"
    else:
        result = "Big"
# result is "Between"
# what prints?
score = 70
if score >= 70:
    pass
else:
    print("Fail")
# nothing (pass does nothing)
# condition evaluation?
x = None
if x:
    print("Yes")
else:
    print("No")
# No (None is falsy)
# multiple conditions?
x = 5
if x > 0 and x < 10:
    print("In range")
# In range
# what happens?
if False:
    print("A")
elif True:
    print("B")
elif True:
    print("C")
# B (stops at first True)
# empty list check?
items = []
if items:
    print("Has items")
else:
    print("Empty")
# Empty (empty list is falsy)
# what is x?
x = 10
if x > 5:
    x = x + 1
# x is 11
```

---

### Ternary Operator

```python
# ternary conditional
age = 20
status = "Adult" if age >= 18 else "Minor"
# status is "Adult"
# nested ternary
score = 85
grade = "A" if score >= 90 else "B" if score >= 80 else "C"
# grade is "B"
```

---

### Ternary Operator - Exercises

```python
# what is result?
x = 10
result = "Big" if x > 5 else "Small"
# "Big"
# what about this?
x = 0
y = x if x else 10
# 10 (x is falsy)
# nested ternary?
score = 75
grade = "A" if score >= 90 else "B" if score >= 80 else "F"
# "F" (doesn't match first two conditions)
# ternary with calculation?
x = 5
y = x * 2 if x > 3 else x + 2
# 10 (condition is True)
# what is result?
is_valid = True
message = "Valid" if is_valid else "Invalid"
# "Valid"
# tricky: what happens?
x = 5
y = 10 if x > 3 else 20 if x > 1 else 30
# 10 (first condition True)
# what is assigned?
x = None
y = x if x is not None else "default"
# "default"
# boolean ternary?
x = True
result = 1 if x else 0
# 1
# what is value?
x = -5
abs_x = x if x >= 0 else -x
# 5
# ternary in print?
x = 10
print("Even" if x % 2 == 0 else "Odd")
# Even
# what happens?
x = []
result = "Full" if x else "Empty"
# "Empty"
# complex condition?
x, y = 5, 10
result = "Yes" if x > 0 and y > 0 else "No"
# "Yes"
```

---

### For Loop

```python
# iterate over range
for i in range(5):
    print(i)
# 0, 1, 2, 3, 4 (on separate lines)
# range with start and stop
for i in range(2, 7):
    print(i)
# 2, 3, 4, 5, 6
# range with step
for i in range(0, 10, 2):
    print(i)
# 0, 2, 4, 6, 8
# iterate over list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
# apple, banana, cherry
# iterate with index
for i, fruit in enumerate(fruits):
    print(i, fruit)
# 0 apple, 1 banana, 2 cherry
```

---

### For Loop - Exercises

```python
# how many iterations?
for i in range(10):
    pass
# 10 iterations
# what is i after loop?
for i in range(3):
    pass
# i is 2 (last value)
# what prints?
for i in range(3, 3):
    print(i)
# nothing (empty range)
# negative step?
for i in range(5, 0, -1):
    print(i)
# 5, 4, 3, 2, 1
# what is sum?
total = 0
for i in range(1, 6):
    total += i
# 15 (1+2+3+4+5)
# enumerate start?
for i, x in enumerate(['a', 'b'], start=1):
    print(i)
# 1, 2
# iterate string?
for char in "abc":
    print(char)
# a, b, c
# what is final i?
for i in range(5):
    if i == 3:
        pass
# i is 4 (loop continues)
# nested loop count?
count = 0
for i in range(3):
    for j in range(2):
        count += 1
# count is 6
# empty list?
for item in []:
    print(item)
# nothing (empty list)
# what prints?
for i in range(1, 10, 3):
    print(i)
# 1, 4, 7
# modify loop variable?
for i in range(3):
    i = 10
    print(i)
# 10, 10, 10 (but doesn't affect iteration)
```

---

### While Loop

```python
# basic while loop
count = 0
while count < 5:
    print(count)
    count += 1
# 0, 1, 2, 3, 4
# while with condition
# user_input = ""
# while user_input != "quit":
#     user_input = input("Enter 'quit' to exit: ")
# infinite loop with break
# while True:
#     response = input("Continue? (y/n): ")
#     if response == 'n':
#         break
```

---

### While Loop - Exercises

```python
# what is count after?
count = 0
while count < 5:
    count += 1
# count is 5
# how many prints?
x = 3
while x > 0:
    print(x)
    x -= 1
# 3 prints (3, 2, 1)
# what happens?
x = 0
while x < 5:
    x += 2
# x is 6 (after last iteration)
# infinite loop?
x = 0
while x >= 0:
    x += 1
    if x > 5:
        break
# x is 6 (breaks when x becomes 6)
# what is x?
x = 10
while x > 0:
    x -= 3
# x is -2 (10, 7, 4, 1, -2)
# condition never true?
x = 0
while x > 0:
    x += 1
# loop never runs, x is 0
# what prints?
x = 1
while x <= 4:
    print(x)
    x *= 2
# 1, 2, 4
# tricky: what is x?
x = 0
while x < 3:
    x += 1
else:
    x += 10
# x is 13 (3 + 10)
# nested while?
i = 0
while i < 2:
    j = 0
    while j < 2:
        j += 1
    i += 1
# i is 2
# what is final value?
x = 100
while x > 1:
    x = x // 2
# x is 0 (100, 50, 25, 12, 6, 3, 1, 0)
# condition check?
x = 5
while x:
    x -= 1
# x is 0 (5, 4, 3, 2, 1, 0)
```

---

### Break and Continue

```python
# break - exit loop
for i in range(10):
    if i == 5:
        break
    print(i)
# 0, 1, 2, 3, 4
# continue - skip iteration
for i in range(5):
    if i == 2:
        continue
    print(i)
# 0, 1, 3, 4
# break in nested loop
for i in range(3):
    for j in range(3):
        if j == 1:
            break
        print(f"i={i}, j={j}")
# i=0,j=0 then i=1,j=0 then i=2,j=0
```

---

### Break and Continue - Exercises

```python
# what prints?
for i in range(5):
    if i == 3:
        break
    print(i)
# 0, 1, 2
# continue effect?
for i in range(5):
    if i % 2 == 0:
        continue
    print(i)
# 1, 3 (skips even numbers)
# multiple breaks?
for i in range(10):
    if i == 3:
        break
    if i == 5:
        break
    print(i)
# 0, 1, 2 (first break stops it)
# what is i?
for i in range(10):
    if i == 5:
        break
# i is 5
# continue in while?
x = 0
while x < 5:
    x += 1
    if x == 3:
        continue
    print(x)
# 1, 2, 4, 5 (skips 3)
# nested break?
for i in range(3):
    for j in range(3):
        if i == j == 1:
            break
        print(i, j)
# (0,0) (0,1) (0,2) (1,0) (2,0) (2,1) (2,2)
# what happens?
for i in range(5):
    continue
    print(i)
# nothing (continue skips print)
# break in while True?
count = 0
while True:
    count += 1
    if count == 3:
        break
# count is 3
# tricky continue?
for i in range(3):
    if i == 1:
        i = 10
        continue
    print(i)
# 0, 2 (i=10 doesn't affect next iteration)
# what prints?
for i in range(5):
    if i < 2:
        continue
    if i > 3:
        break
    print(i)
# 2, 3
```

---

### Else with Loops

```python
# for-else (runs if loop completes without break)
for i in range(5):
    if i == 10:
        break
else:
    print("Loop completed")
# Loop completed
# while-else
count = 0
while count < 3:
    print(count)
    count += 1
else:
    print("While loop finished")
# 0, 1, 2, While loop finished
# break prevents else
for i in range(5):
    if i == 3:
        break
else:
    print("This won't print")
# nothing (break prevents else)
```

---

### Else with Loops - Exercises

```python
# does else run?
for i in range(5):
    pass
else:
    print("Done")
# Done (no break)
# what about this?
for i in range(5):
    if i == 2:
        break
else:
    print("Done")
# nothing (break prevents else)
# while-else?
x = 0
while x < 0:
    x += 1
else:
    print("Else runs")
# Else runs (loop body never executes but no break)
# tricky: does else run?
for i in range(0):
    pass
else:
    print("Yes")
# Yes (empty range, no break)
# what prints?
for i in range(3):
    if i == 5:
        break
else:
    print("Complete")
# Complete (condition never True, no break)
# while-else with break?
x = 0
while x < 3:
    if x == 2:
        break
    x += 1
else:
    print("Done")
# nothing (break prevents else)
# nested loop else?
for i in range(2):
    for j in range(2):
        if j == 1:
            break
else:
    print("Outer else")
# Outer else (inner break doesn't affect outer)
# what happens?
for i in range(3):
    if i == 3:
        break
else:
    print("Runs")
# Runs (condition never True)
# while-else execution?
x = 5
while x < 3:
    x += 1
else:
    print("Else")
# Else (condition False from start)
# tricky break?
for i in range(3):
    if False:
        break
else:
    print("Complete")
# Complete (break never executes)
```

---

### Match Statement (Python 3.10+)

```python
# basic match
command = "start"
match command:
    case "start":
        print("Starting...")
    case "stop":
        print("Stopping...")
    case "pause":
        print("Pausing...")
    case _:
        print("Unknown command")
# Starting...
# match with multiple values
status_code = 404
match status_code:
    case 200 | 201:
        print("Success")
    case 404:
        print("Not Found")
    case 500 | 502 | 503:
        print("Server Error")
    case _:
        print("Other")
# Not Found
```

---

### Match Statement - Exercises

```python
# what prints?
x = 2
match x:
    case 1:
        print("One")
    case 2:
        print("Two")
    case _:
        print("Other")
# Two
# default case?
x = 100
match x:
    case 1:
        print("One")
    case _:
        print("Default")
# Default
# multiple values?
x = 201
match x:
    case 200 | 201:
        print("Success")
    case _:
        print("Other")
# Success
# no match?
x = 5
match x:
    case 1:
        print("One")
    case 2:
        print("Two")
# nothing (no default, no match)
# first match wins?
x = 1
match x:
    case 1:
        print("First")
    case 1:
        print("Second")
# First
# match with string?
cmd = "quit"
match cmd:
    case "start":
        result = "Starting"
    case "quit":
        result = "Quitting"
# result is "Quitting"
# wildcard position?
x = 999
match x:
    case _:
        print("Any")
    case 999:
        print("999")
# Any (wildcard matches first)
# or pattern?
x = 503
match x:
    case 500 | 502 | 503:
        print("Server Error")
# Server Error
# match None?
x = None
match x:
    case None:
        print("Is None")
    case _:
        print("Not None")
# Is None
# match with guard? (advanced)
x = 15
match x:
    case n if n > 10:
        print("Big")
    case _:
        print("Small")
# Big
```

---

### Pass Statement

```python
# placeholder for empty blocks
if True:
    pass
# nothing happens
# empty function
def my_function():
    pass
# function does nothing
# empty class
class MyClass:
    pass
# empty class definition
```

---

### Pass Statement - Exercises

```python
# what happens?
x = 5
if x > 3:
    pass
# nothing (pass is a no-op)
# can you have empty if?
if True:
# SyntaxError (needs at least pass)
# pass in loop?
for i in range(3):
    pass
# loop runs 3 times, does nothing
# multiple pass?
if True:
    pass
    pass
# valid, both do nothing
# pass vs continue?
for i in range(3):
    pass
    print(i)
# 0, 1, 2 (pass doesn't skip)
# pass with else?
if False:
    pass
else:
    print("Else")
# Else
# what is x?
x = 5
if x > 10:
    x = 10
else:
    pass
# x is still 5
# pass in try?
try:
    x = 5
except:
    pass
# valid, x is 5
# pass after return?
def func():
    return 5
    pass
# valid but pass is unreachable
# empty except with pass?
try:
    x = 1 / 0
except:
    pass
# error is silently caught
```
