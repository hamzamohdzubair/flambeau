{{yaml}}

<!-- _class: lead invert -->

# Probabilistic Models

---

### Contents

1) History
2) Inferencing
3) Unbiased Estimation
4) MLE
5) MAP
6) Brute Force Bayes
7) Naive Bayes

---

### Checkpoint

1. History
2. Inferencing
3. Unbiased Estimation
4. MLE
5. MAP
6. **Brute Force Bayes**
7. Naive Bayes

---

## Brute Force Bayes

---

### Brute Force Bayes

$$

\begin{align}

\hat{y} &= \underset{y \in \{0,1\}}{\arg\max} \, P(y|x) \\ \\

&= \underset{y \in \{0,1\}}{\arg\max} \, \frac{P(x|y)P(y)}{P(x)} \\ \\

&= \underset{y \in \{0,1\}}{\arg\max} \, P(x|y)P(y)

\end{align}

$$

<!-- _footer: '[<i class="fa-regular fa-house"></i>](index.html#Home) [bayes](/md/math/probstats/dist/beta.html)' -->

---

### Checkpoint

1. History
2. Inferencing
3. Unbiased Estimation
4. MLE
5. MAP
6. Brute Force Bayes
7. **Naive Bayes**

---

## Naive Bayes

---

### Naive Assumption

<!-- _class: lead nob -->
* $$P(\mathbf{x} \mid y) = \prod_{i} P(x_i \mid y)$$
