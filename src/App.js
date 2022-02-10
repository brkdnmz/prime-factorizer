import { useEffect, useMemo, useState } from "react";
import styles from "./App.module.css";

function App() {
  const [input, setInput] = useState("");
  const [inputVal, setInputVal] = useState(-1);
  const [primeFactorization, setPrimeFactorization] = useState("");

  const smallestPrime = useMemo(() => {
    const N = 1e7;
    const sm = new Array(N + 1).fill(0);
    for (let p = 2; p <= N; p++) {
      if (sm[p]) continue;
      for (let k = p; k <= N; k += p) sm[k] = p;
    }
    return sm;
  }, []);

  useEffect(() => {
    const primes = [];
    const powerOf = {};
    let number = inputVal;
    if (number < 0) {
      setPrimeFactorization(() => "");
      return;
    }
    let newFactorization = "$";
    if (number <= 1) {
      newFactorization += number;
    }
    while (number > 1) {
      let curPower = 0;
      const curPrime = smallestPrime[number];
      while (number % curPrime === 0) {
        number /= curPrime;
        curPower++;
      }
      primes.push(curPrime);
      powerOf[curPrime] = curPower;
    }
    for (let i = 0; i < primes.length; i++) {
      newFactorization += primes[i] + "^{" + powerOf[primes[i]] + "}";
      if (i + 1 < primes.length) newFactorization += "\\cdot ";
    }
    newFactorization += "$";
    setPrimeFactorization(() => newFactorization);
  }, [inputVal, smallestPrime]);

  useEffect(() => {
    if (!primeFactorization) {
      setPrimeFactorization(() => "Prime factorization appears here");
    }
    if (window.MathJax && window.MathJax.typeset) {
      window.MathJax.typeset();
    }
  }, [primeFactorization]);

  return (
    <div className={styles.App}>
      <input
        onChange={(e) => {
          if (isNaN(e.target.value)) return false;
          const newValue = e.target.value ? parseInt(e.target.value) : -1;
          if (newValue <= 1e7 && newValue !== inputVal) {
            setInput(e.target.value);
            setInputVal(newValue);
          }
        }}
        spellCheck={false}
        placeholder={"Enter a number"}
        value={input}
      />
      <div className={styles.primeFactorization}>{primeFactorization}</div>
    </div>
  );
}

export default App;
