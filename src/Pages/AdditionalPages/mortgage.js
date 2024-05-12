import React, { useState } from "react";
import "../../Styles/mortgage.css";

function Mortgage() {
  const [type, setType] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [monthlyRepayment, setMonthlyRepayment] = useState("");
  const [totalPayable, setTotalPayable] = useState("");

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleLoanAmountChange = (e) => {
    // Menghapus karakter selain angka dan titik dari nilai input
    const formattedLoanAmount = e.target.value.replace(/[^\d.]/g, "");
    setLoanAmount(formattedLoanAmount);
  };

  const handleInterestRateChange = (e) => {
    setInterestRate(e.target.value);
  };

  const handleLoanTenureChange = (e) => {
    setLoanTenure(e.target.value);
  };

  const handleCalculate = () => {
    const monthlyInterestRate = parseFloat(interestRate) / 100 / 12;
    const numberOfPayments = parseFloat(loanTenure) * 12;
    const calculatedMonthlyRepayment =
      (parseFloat(loanAmount) * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    setMonthlyRepayment(
      calculatedMonthlyRepayment
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    ); // Menambahkan koma setiap 3 digit
    const calculatedTotalPayable =
      calculatedMonthlyRepayment * numberOfPayments;
    setTotalPayable(
      calculatedTotalPayable.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    ); // Menambahkan koma setiap 3 digit
  };

  const handleClear = () => {
    setLoanAmount("");
    setInterestRate("");
    setLoanTenure("");
    setMonthlyRepayment("");
    setTotalPayable("");
  };

  return (
    <div className="calculation-container">
      <h1>Mortgage Calculation</h1>
      <div>
        <label htmlFor="type">Property Type:</label>
        <select id="type" value={type} onChange={handleTypeChange}>
          <option value="">Choose your property type</option>
          <option value="House">House</option>
          <option value="Apartment">Apartment</option>
          <option value="Condo">Condo</option>
        </select>
      </div>
      <div>
        <label htmlFor="loanAmount">Loan Amount ($):</label>
        <input
          type="text"
          id="loanAmount"
          value={loanAmount}
          onChange={handleLoanAmountChange}
        />
      </div>
      <div>
        <label htmlFor="interestRate">Interest Rate (%):</label>
        <input
          type="text"
          id="interestRate"
          value={interestRate}
          onChange={handleInterestRateChange}
        />
      </div>
      <div>
        <label htmlFor="loanTenure">Loan Tenure (Years):</label>
        <input
          type="text"
          id="loanTenure"
          value={loanTenure}
          onChange={handleLoanTenureChange}
        />
      </div>
      <button className="calculate-button" onClick={handleCalculate}>
        Calculate
      </button>
      <button className="clear-button" onClick={handleClear}>
        Clear
      </button>

      {monthlyRepayment && (
        <div className="result-container">
          <h1>Mortgage Breakdown</h1>
          <h2>Monthly Repayment:</h2>
          <p>${monthlyRepayment} / mo</p>
        </div>
      )}
      {totalPayable && (
        <div className="result-container">
          <h2>Total Payable:</h2>
          <p>${totalPayable}</p>
        </div>
      )}
    </div>
  );
}

export default Mortgage;
