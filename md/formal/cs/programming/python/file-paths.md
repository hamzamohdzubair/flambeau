{{yaml}}

{{title}}

#ans: File Paths

---

### OS Module - Basic Paths

```python
import os
#ans: check if exists
os.path.exists("file.txt")
#ans: True or False
#ans: check if file
os.path.isfile("file.txt")
#ans: True or False
#ans: check if directory
os.path.isdir("folder")
#ans: True or False
```

---

### OS Module - Path Info

```python
import os
#ans: file size
os.path.getsize("file.txt")
#ans: size in bytes
#ans: absolute path
os.path.abspath("file.txt")
#ans: /full/path/to/file.txt
```

---

### OS Module - Join Paths

```python
import os
#ans: join paths
os.path.join("folder", "file.txt")
#ans: folder/file.txt
#ans: works across platforms
```

---

### OS Module - Split Paths

```python
import os
#ans: directory name
os.path.dirname("/path/to/file.txt")
#ans: "/path/to"
#ans: base name
os.path.basename("/path/to/file.txt")
#ans: "file.txt"
#ans: split extension
os.path.splitext("file.txt")
#ans: ("file", ".txt")
```

---

### Pathlib Module

```python
from pathlib import Path
#ans: create path object
path = Path("file.txt")
#ans: check exists
path.exists()
#ans: True or False
#ans: read file
content = path.read_text()
```

---

### Pathlib - Path Parts

```python
from pathlib import Path
path = Path("/folder/file.txt")
#ans: name
path.name
#ans: "file.txt"
#ans: stem
path.stem
#ans: "file"
#ans: suffix
path.suffix
#ans: ".txt"
#ans: parent
path.parent
#ans: Path("/folder")
```

---

### Exercises - Part 1

```python
import os
# exists vs isfile?
os.path.exists("folder")
#ans: True
os.path.isfile("folder")
#ans: False
```

---

### Exercises - Part 2

```python
import os
# join paths?
os.path.join("a", "b", "c")
#ans: "a/b/c" (or "a\\b\\c" on Windows)
```

---

### Exercises - Part 3

```python
import os
# splitext?
os.path.splitext("file.tar.gz")
#ans: ("file.tar", ".gz")
```

---

### Exercises - Part 4

```python
from pathlib import Path
# path / operator?
Path("folder") / "file.txt"
#ans: Path("folder/file.txt")
```

---

### Exercises - Part 5

```python
from pathlib import Path
# suffix with no extension?
Path("file").suffix
#ans: ""
```

---

### Exercises - Part 6

```python
import os
# abspath on absolute?
os.path.abspath("/a/b/c")
#ans: "/a/b/c" (unchanged)
```

---

### Exercises - Part 7

```python
from pathlib import Path
# multiple suffixes?
Path("file.tar.gz").suffixes
#ans: [".tar", ".gz"]
```

---

### Exercises - Part 8

```python
import os
# basename of directory?
os.path.basename("/path/to/")
#ans: ""
os.path.basename("/path/to")
#ans: "to"
```

---

### Exercises - Part 9

```python
from pathlib import Path
# parent of parent?
Path("/a/b/c").parent.parent
#ans: Path("/a")
```

---

### Exercises - Part 10

```python
import os
# current directory?
os.getcwd()
#ans: returns current working directory
```
