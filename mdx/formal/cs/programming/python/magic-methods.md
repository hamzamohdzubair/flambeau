---
theme: blank2
paginate: true
transition: slide
class: lead
footer: '[<iconify-icon icon="hugeicons:home-11" title="Home"></iconify-icon>](/index.html) [<iconify-icon icon="si:left-up-line" title="Back"></iconify-icon>](../index.html) [<iconify-icon icon="octicon:move-to-start-24" title="Start"></iconify-icon>](#1)'
---
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<!-- Font imports for all three font options -->
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap" rel="stylesheet">
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

#ans: Magic Methods

---

### __str__ and __repr__

```python
# string representation
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    def __str__(self):
        return f"Point({self.x}, {self.y})"
str(Point(3, 4))
#ans: "Point(3, 4)"
print(Point(3, 4))
#ans: Point(3, 4)
```

---

### __len__

```python
# len() support
class MyList:
    def __init__(self, items):
        self.items = items
    def __len__(self):
        return len(self.items)
len(MyList([1, 2, 3]))
#ans: 3
```

---

### __getitem__ and __setitem__

```python
# indexing support
class MyList:
    def __init__(self):
        self.items = []
    def __getitem__(self, index):
        return self.items[index]
    def __setitem__(self, index, value):
        self.items[index] = value
ml = MyList()
ml.items = [1, 2, 3]
ml[0]
#ans: 1
```

---

### __add__ and __sub__

```python
# operator overloading
class Vector:
    def __init__(self, x):
        self.x = x
    def __add__(self, other):
        return Vector(self.x + other.x)
Vector(5) + Vector(3)
#ans: Vector(8)
```

---

### __eq__ and __lt__

```python
# comparison operators
class Point:
    def __init__(self, x):
        self.x = x
    def __eq__(self, other):
        return self.x == other.x
    def __lt__(self, other):
        return self.x < other.x
Point(5) == Point(5)
#ans: True
```

---

### Exercises - Part 1

```python
# __str__ vs __repr__?
class MyClass:
    def __str__(self):
        return "str"
    def __repr__(self):
        return "repr"
str(MyClass())
#ans: "str"
repr(MyClass())
#ans: "repr"
```

---

### Exercises - Part 2

```python
# __len__ return type?
class MyClass:
    def __len__(self):
        return 5.5
len(MyClass())
#ans: TypeError (must return int)
```

---

### Exercises - Part 3

```python
# __getitem__ for iteration?
class MyClass:
    def __getitem__(self, i):
        if i >= 3:
            raise IndexError
        return i
for x in MyClass():
    print(x)
#ans: 0, 1, 2
```

---

### Exercises - Part 4

```python
# __add__ with int?
class MyClass:
    def __init__(self, x):
        self.x = x
    def __add__(self, other):
        return MyClass(self.x + other)
MyClass(5) + 3
#ans: MyClass(8)
```

---

### Exercises - Part 5

```python
# __contains__?
class MySet:
    def __init__(self, items):
        self.items = set(items)
    def __contains__(self, item):
        return item in self.items
2 in MySet([1, 2, 3])
#ans: True
```

---

### Exercises - Part 6

```python
# __call__?
class Multiplier:
    def __init__(self, n):
        self.n = n
    def __call__(self, x):
        return x * self.n
double = Multiplier(2)
double(5)
#ans: 10
```

---

### Exercises - Part 7

```python
# __bool__?
class MyClass:
    def __bool__(self):
        return False
bool(MyClass())
#ans: False
```

---

### Exercises - Part 8

```python
# __iter__?
class MyRange:
    def __init__(self, n):
        self.n = n
    def __iter__(self):
        return iter(range(self.n))
list(MyRange(3))
#ans: [0, 1, 2]
```

---

### Exercises - Part 9

```python
# __enter__ and __exit__?
class MyContext:
    def __enter__(self):
        return self
    def __exit__(self, *args):
        pass
with MyContext() as ctx:
    pass
```

---

### Exercises - Part 10

```python
# __del__?
class MyClass:
    def __del__(self):
        print("Deleted")
obj = MyClass()
del obj
#ans: "Deleted"
```
