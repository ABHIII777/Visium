import React, { useState, useRef } from "react";
import "./SortingAlgorithmVisuals.css";
import gsap from "gsap";

export default function SortingAlgorithmVisuals() {
  const [sortingAlgorithm, setSortingAlgorithm] = useState("bubbleSort");
  const [text, setText] = useState("");
  const [numArray, setNumArray] = useState([]);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [time, setTime] = useState(0);
  const [initialArray, setInitialArray] = useState([]);

  const barRefs = useRef([]);

  const bubbleSortSteps = (arr) => {
    const newNums = [...arr];
    const steps = [];
    let comparisonsCount = 0;
    let swapCount = 0;

    const start = performance.now();
    for (let i = 0; i < newNums.length; i++) {
      for (let j = 0; j < newNums.length - i - 1; j++) {
        comparisonsCount++;
        if (newNums[j] > newNums[j + 1]) {
          steps.push([j, j + 1]);
          [newNums[j], newNums[j + 1]] = [newNums[j + 1], newNums[j]];
          swapCount++;
        }
      }
    }
    const end = performance.now();
    setComparisons(comparisonsCount);
    setSwaps(swapCount);
    setTime((end - start).toFixed(2));
    return steps;
  };

  const selectionSort = (arr) => {
    let newNums = [...arr];
    let comparisonsCount = 0;
    let swapCount = 0;
    let steps = [];

    const n = newNums.length;

    let algoStart = performance.now();

    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < n; j++) {
        comparisonsCount++;
        if (newNums[j] < newNums[minIndex]) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        steps.push([i, minIndex]);

        [newNums[i], newNums[minIndex]] = [newNums[minIndex], newNums[i]];
        swapCount++;
      }
    }
    let algoEnd = performance.now();
    let algoTime = (algoEnd - algoStart).toFixed(2);
    setComparisons(comparisonsCount);
    setSwaps(swapCount);
    setTime(algoTime);
    return steps;
  };

  const insertionSort = (arr) => {
    let n = arr.length;
    let newNums = [...arr];
    let comparisonsCount = 0;
    let swapCount = 0;
    let steps = [];

    let algoStart = performance.now();

    for (let i = 1; i < n; i++) {
      let key = newNums[i];
      let j = i - 1;

      while (j >= 0 && newNums[j] > key) {
        comparisonsCount++;
        steps.push([j, j + 1]);
        [newNums[j], newNums[j + 1]] = [newNums[j + 1], newNums[j]];
        swapCount++;
        j--;
      }

      if (j >= 0) {
        comparisonsCount++;
      }
    }

    let algoEnd = performance.now();
    let algoTime = (algoEnd - algoStart).toFixed(2);

    setComparisons(comparisonsCount);
    setSwaps(swapCount);
    setTime(algoTime);
    return steps;
  };

  const mergeSortSteps = (arr) => {
    const newNums = [...arr];
    const steps = [];
    let comparisonsCount = 0;

    const merge = (left, mid, right) => {
      const temp = [];
      let i = left;
      let j = mid + 1;

      while (i <= mid && j <= right) {
        comparisonsCount++;
        if (newNums[i] <= newNums[j]) {
          temp.push(newNums[i++]);
        } else {
          temp.push(newNums[j++]);
        }
      }

      while (i <= mid) temp.push(newNums[i++]);
      while (j <= right) temp.push(newNums[j++]);

      for (let k = 0; k < temp.length; k++) {
        steps.push({ index: left + k, value: temp[k] });
        newNums[left + k] = temp[k];
      }
    };

    const mergeSortRecursive = (left, right) => {
      if (left >= right) return;
      const mid = Math.floor((left + right) / 2);
      mergeSortRecursive(left, mid);
      mergeSortRecursive(mid + 1, right);
      merge(left, mid, right);
    };

    mergeSortRecursive(0, newNums.length - 1);

    return { steps, comparisonsCount, sortedArray: newNums };
  };

  const quickSortSteps = (arr) => {
    const newNums = [...arr];
    const steps = [];
    let comparisonsCount = 0;

    const partition = (low, high) => {
      const pivot = newNums[high];
      let i = low;

      for (let j = low; j < high; j++) {
        comparisonsCount++;
        if (newNums[j] < pivot) {
          steps.push([i, j]);
          [newNums[i], newNums[j]] = [newNums[j], newNums[i]];
          i++;
        }
      }
      steps.push([i, high]);
      [newNums[i], newNums[high]] = [newNums[high], newNums[i]];
      return i;
    };

    const quickSortRecursive = (low, high) => {
      if (low < high) {
        const pi = partition(low, high);
        quickSortRecursive(low, pi - 1);
        quickSortRecursive(pi + 1, high);
      }
    };

    quickSortRecursive(0, newNums.length - 1);

    return { steps, comparisonsCount };
  };

  const animateSwaps = (steps) => {
    const tl = gsap.timeline();

    steps.forEach(([i, j]) => {
      const barI = barRefs.current[i];
      const barJ = barRefs.current[j];

      if (!barI || !barJ) return;

      const rectI = barI.getBoundingClientRect();
      const rectJ = barJ.getBoundingClientRect();
      const dx = rectJ.left - rectI.left;

      tl.to(barI, {
        x: dx,
        duration: 0.28,
        ease: "power2.inOut",
      })
        .to(
          barJ,
          {
            x: -dx,
            duration: 0.28,
            ease: "power2.inOut",
          },
          "<",
        )
        .add(() => {
          const tempHeight = barI.style.height;
          barI.style.height = barJ.style.height;
          barJ.style.height = tempHeight;

          const tempText = barI.textContent;
          barI.textContent = barJ.textContent;
          barJ.textContent = tempText;

          const valI = barI.dataset.value;
          const valJ = barJ.dataset.value;
          barI.dataset.value = valJ;
          barJ.dataset.value = valI;

          gsap.set([barI, barJ], { x: 0 });
        });
    });

    return tl;
  };

  const animateMergeSteps = (steps) => {
    const tl = gsap.timeline();

    steps.forEach(({ index, value }) => {
      const bar = barRefs.current[index];
      if (!bar) return;

      tl.to(bar, {
        height: `${value * 30}px`,
        duration: 0.25,
        ease: "power2.inOut",
        onComplete: () => {
          bar.textContent = value;
          bar.dataset.value = value;
        },
      });
    });

    return tl;
  };

  const handleClick = () => {
    let parsed;
    try {
      parsed = JSON.parse(text);
      if (!Array.isArray(parsed)) return;
    } catch (e) {
      console.error("Invalid JSON:", e);
      return;
    }
    if (!Array.isArray(parsed)) return;

    const nums = parsed.map((n) => {
      const val = Number(n);
      return Number.isNaN(val) ? 0 : val;
    });

    setInitialArray(nums);
    setNumArray(nums);
  };

  const sortTheArray = () => {
    let steps = [];
    if (sortingAlgorithm === "bubbleSort") {
      steps = bubbleSortSteps(initialArray);
      const sortedArray = [...initialArray].sort((a, b) => a - b);

      animateSwaps(steps).eventCallback("onComplete", () => {
        setNumArray(sortedArray || []);
      });
    } else if (sortingAlgorithm === "selectionSort") {
      steps = selectionSort(initialArray);
      const sortedArray = [...initialArray].sort((a, b) => a - b);

      animateSwaps(steps).eventCallback("onComplete", () => {
        setNumArray(sortedArray || []);
      });
    } else if (sortingAlgorithm === "insertionSort") {
      steps = insertionSort(initialArray);
      const sortedArray = [...initialArray].sort((a, b) => a - b);

      animateSwaps(steps).eventCallback("onComplete", () => {
        setNumArray(sortedArray || []);
      });
    } else if (sortingAlgorithm === "mergeSort") {
      const { steps, comparisonsCount, sortedArray } =
        mergeSortSteps(initialArray);
      setComparisons(comparisonsCount);
      setSwaps(steps.length);
      animateMergeSteps(steps).eventCallback("onComplete", () => {
        setNumArray(sortedArray);
      });
    } else if (sortingAlgorithm === "quickSort") {
      steps = quickSortSteps(initialArray);
      const sortedArray = [...initialArray].sort((a, b) => a - b);

      animateSwaps(steps).eventCallback("onComplete", () => {
        setNumArray(sortedArray || []);
      });
    } else {
      const sortedArray = [...initialArray].sort((a, b) => a - b);
      setNumArray(sortedArray || []);
    }
  };

  const handleChange = (e) => setText(e.target.value);
  const handleSortingAlgorithm = (e) => setSortingAlgorithm(e.target.value);

  return (
    <div className="main_container">
      <div className="element_1">
        <div className="main_header">Sorting Algorithm</div>

        <div className="algo_dropdown">
          <select
            className="dropdownMenu"
            value={sortingAlgorithm}
            onChange={handleSortingAlgorithm}
          >
            <option value="bubbleSort">Bubble Sort</option>
            <option value="selectionSort">Selection Sort</option>
            <option value="insertionSort">Insertion Sort</option>
            <option value="mergeSort">Merge Sort</option>
            <option value="quickSort">Quick Sort</option>
          </select>
        </div>

        <div className="funcButtons">
          <input
            type="text"
            className="user_array_input"
            value={text}
            onChange={handleChange}
            placeholder="e.g. [5,3,8,1]"
          />
          <button
            type="button"
            className="generate_array"
            onClick={handleClick}
          >
            Generate Array
          </button>
          <button type="button" className="sort" onClick={sortTheArray}>
            SORT
          </button>
        </div>
      </div>

      <div className="element_2">
        <div className="comparisons">
          <label>COMPARISONS</label>
          <div className="comparisonsCount">{comparisons}</div>
        </div>
        <div className="swaps">
          <label>SWAPS</label>
          <div className="swapsCount">{swaps}</div>
        </div>
        <div className="time">
          <label>TIME</label>
          <div className="timeCount">{time}</div>
        </div>
        <div className="complexity">
          <label>COMPLEXITY</label>
          <div className="complexityCount">
            O(n<sup>2</sup>)
          </div>
        </div>
      </div>

      <div className="sorting_screen">
        {(numArray || []).map((num, index) => (
          <div
            ref={(el) => el && (barRefs.current[index] = el)}
            key={index}
            data-value={num}
            style={{
              height: `${num * 30}px`,
              backgroundColor: "#7348f4",
              width: "75px",
              borderRadius: "12px",
              margin: "5px",
              border: "0.1px solid white",
              padding: "5px",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              color: "white",
              fontWeight: "600",
              boxSizing: "border-box",
            }}
          >
            {num}
          </div>
        ))}
      </div>
    </div>
  );
}
