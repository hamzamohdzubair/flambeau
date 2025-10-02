---
theme: gaia2
paginate: true
transition: slide
footer: '[<i class="fa-regular fa-house"></i>](index.html#Home)'
class: lead
---

<!-- _class: lead invert -->

# Probabilistic Models

---

### Contents

1. Inferencing
2. Unbiased Estimation
3. MLE
4. MAP
5. Simple Bayes
6. Naive Bayes

---

### Simple / Brute Force Bayes

$$

\begin{align}

\hat{y} &= \underset{y \in \{0,1\}}{\arg\max} \, P(y|x) \\ \\

&= \underset{y \in \{0,1\}}{\arg\max} \, \frac{P(x|y)P(y)}{P(x)} \\ \\

&= \underset{y \in \{0,1\}}{\arg\max} \, P(x|y)P(y)

\end{align}

$$

<!-- _footer: '[<i class="fa-regular fa-house"></i>](index.html#Home) [bayes](/md/math/probstats/dist/beta.html)' -->

---
