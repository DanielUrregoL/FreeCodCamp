import React, { useState, useEffect } from 'react';
import './App.css';
import { evaluate } from 'mathjs';

export default function App() {

  const calcData = [
    { id: "clear", value: "AC" },
    { id: "divide", value: "/" },
    { id: "multiply", value: "x" },
    { id: "seven", value: 7 },
    { id: "eight", value: 8 },
    { id: "nine", value: 9 },
    { id: "subtract", value: "-" },
    { id: "four", value: 4 },
    { id: "five", value: 5 },
    { id: "six", value: 6 },
    { id: "add", value: "+" },
    { id: "one", value: 1 },
    { id: "two", value: 2 },
    { id: "three", value: 3 },
    { id: "equals", value: "=" },
    { id: "zero", value: 0 },
    { id: "decimal", value: "." },
  ];
  const operators = ["AC", "/", "x", "+", "-", "="];
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const [input, setInput] = useState("0");
  const [output, setOutput] = useState("");
  const [calculatorData, setCalculatorData] = useState("");


  const handleSubmit = () => {
    const total = evaluate(calculatorData);
    setInput(total);
    setOutput(`${total} = ${total}`);
    setCalculatorData(`${total}`);
  };


  const handleNumbers = (value) => {
    if (!calculatorData.length) {
      setInput(`${value}`);
      setCalculatorData(`${value}`);
    } else {
      const lastChar = calculatorData.charAt(calculatorData.length - 1);
      const isLastCharOperator = lastChar === "*" || operators.includes(lastChar);
      if (!(value === 0 && (calculatorData === "0" || input === "0"))) {
        setInput(isLastCharOperator ? `${value}` : `${input}${value}`);
        setCalculatorData(`${calculatorData}${value}`);
      };
    };
  };

  const dotOperator = () => {
    const lastChar = calculatorData.charAt(calculatorData.length - 1);

    if (!calculatorData.length) {
      setInput("0.");
      setCalculatorData("0.");
    } else {
      if (lastChar === "*" || operators.includes(lastChar)) {
        setInput("0.");
        setCalculatorData(`${calculatorData} 0.`);
      } else {
        setInput(lastChar === "." || input.includes(".") ? `${input}` : `${input}.`);
        const formattedValue = lastChar === "." || input.includes(".") ? `${calculatorData}` : `${calculatorData}.`;
        setCalculatorData(formattedValue);
      }
    }
  };

  const handleOperators = (value) => {
    if (calculatorData.length) {
      setInput(value);
      const beforeLastChar = calculatorData.charAt(calculatorData.length - 2);
      const beforeLastCharIsOperator = operators.includes(beforeLastChar) || beforeLastChar === "*";
      const lastChar = calculatorData.charAt(calculatorData.length - 1);
      const lastCharIsOperator = operators.includes(lastChar) || lastChar === "x";
      const validOp = value === "x" ? "*" : value;

      if ((lastCharIsOperator && value !== "-") || (beforeLastCharIsOperator && lastCharIsOperator)) {
        if (beforeLastCharIsOperator) {
          const updatedValue = `${calculatorData.substring(0, calculatorData.length - 2)}${value}`;
          setCalculatorData(updatedValue);
        } else {
          const updatedValue = `${calculatorData.substring(0, calculatorData.length - 1)}${validOp}`;
          setCalculatorData(updatedValue);
        }
      } else {
        setCalculatorData(`${calculatorData}${validOp}`);
      }
    }
  };

  const handleInput = (value) => {
    if (value === "AC") {
      setInput("0");
      setCalculatorData("");
    } else if (value === "=") {
      handleSubmit();
    } else if (value === ".") {
      dotOperator();
    } else if (numbers.includes(value)) {
      handleNumbers(value);
    } else if (operators.includes(value)) {
      handleOperators(value);
    }
  };

  useEffect(() => {
    setOutput(calculatorData);
  }, [calculatorData]);

  const keyBoard = calcData.map((key) => (
    <button className='btn btn-dark p-3 ' key={key.id} id={key.id} style={{fontSize: "25px"}} onClick={() => handleInput(key.value)}> {key.value} </button>
  ));

  return (
<div className="d-flex align-items-center justify-content-center vh-100">
  <div className="container">
    <h1 className="text-center">Calculator</h1>
    <div className="row">
      <div className="col-4 p-3 mx-auto rounded-2 bg-secondary">
        <div className="m-2 h1 text-end text-light" >
          <span >{output}</span>
          <br />
          <span id="display">{input}</span>
        </div>
        <div className="keys ">
          {keyBoard}
        </div>
      </div>
      <p className="text-center mt-3 h5"> <a href='https://github.com/DanielUrregoL' className='text-dark' ><i className="bi bi-github"></i> By @DanielUrregoL</a></p>
    </div>
  </div>
</div>
  );
};

