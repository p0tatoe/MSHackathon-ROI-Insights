import React, { useState, useEffect } from "react";
import styles from '../roi.module.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const ROI = () => {
  // Initial time periods
  const [periods, setPeriods] = useState([1, 2, 3, 4, 5]);
  
  // Initial costs with values for each period
  const [costs, setCosts] = useState([
    { name: "Initial Investment", values: [1000, 200, 200, 200, 200] },
    { name: "Maintenance", values: [0, 100, 100, 100, 100] }
  ]);
  
  // Initial benefits with values for each period
  const [benefits, setBenefits] = useState([
    { name: "Revenue", values: [500, 800, 1200, 1500, 1800] }
  ]);
  
  // Calculate ROI for each period
  const [roiValues, setRoiValues] = useState([]);
  const [chartData, setChartData] = useState([]);

  // Calculate ROI whenever costs, benefits, or periods change
  useEffect(() => {
    calculateROI();
  }, [costs, benefits, periods]);

  const calculateROI = () => {
    const newRoiValues = [];
    const newChartData = [];
    
    // For each time period
    periods.forEach((period, periodIndex) => {
      // Sum all costs for this period
      const totalCost = costs.reduce((sum, costItem) => {
        return sum + (Number(costItem.values[periodIndex]) || 0);
      }, 0);
      
      // Sum all benefits for this period
      const totalBenefit = benefits.reduce((sum, benefitItem) => {
        return sum + (Number(benefitItem.values[periodIndex]) || 0);
      }, 0);
      
      // Calculate ROI
      let roi = 0;
      if (totalCost > 0) {
        roi = ((totalBenefit - totalCost) / totalCost) * 100;
      }
      
      newRoiValues[periodIndex] = roi.toFixed(2);
      newChartData.push({ period, roi });
    });
    
    setRoiValues(newRoiValues);
    setChartData(newChartData);
  };

  // Add a new time period
  const addPeriod = () => {
    const newPeriod = periods.length > 0 ? Math.max(...periods) + 1 : 1;
    setPeriods([...periods, newPeriod]);
    
    // Add empty values for the new period in each cost and benefit item
    const newCosts = costs.map(cost => ({
      ...cost,
      values: [...cost.values, 0]
    }));
    setCosts(newCosts);
    
    const newBenefits = benefits.map(benefit => ({
      ...benefit,
      values: [...benefit.values, 0]
    }));
    setBenefits(newBenefits);
  };

  // Add a new cost item
  const addCostItem = () => {
    const emptyValues = new Array(periods.length).fill(0);
    setCosts([...costs, { name: "New Cost", values: emptyValues }]);
  };

  // Add a new benefit item
  const addBenefitItem = () => {
    const emptyValues = new Array(periods.length).fill(0);
    setBenefits([...benefits, { name: "New Benefit", values: emptyValues }]);
  };

  // Update cost item name
  const updateCostName = (index, name) => {
    const newCosts = [...costs];
    newCosts[index].name = name;
    setCosts(newCosts);
  };

  // Update benefit item name
  const updateBenefitName = (index, name) => {
    const newBenefits = [...benefits];
    newBenefits[index].name = name;
    setBenefits(newBenefits);
  };

  // Update cost value for specific period
  const updateCostValue = (costIndex, periodIndex, value) => {
    const newCosts = [...costs];
    newCosts[costIndex].values[periodIndex] = Number(value);
    setCosts(newCosts);
  };

  // Update benefit value for specific period
  const updateBenefitValue = (benefitIndex, periodIndex, value) => {
    const newBenefits = [...benefits];
    newBenefits[benefitIndex].values[periodIndex] = Number(value);
    setBenefits(newBenefits);
  };

  // Remove a cost item
  const removeCost = (index) => {
    setCosts(costs.filter((_, i) => i !== index));
  };

  // Remove a benefit item
  const removeBenefit = (index) => {
    setBenefits(benefits.filter((_, i) => i !== index));
  };

  // Calculate cumulative ROI
  const calculateCumulativeROI = () => {
    let totalCosts = 0;
    let totalBenefits = 0;
    
    // Sum all costs and benefits across all periods
    periods.forEach((_, periodIndex) => {
      costs.forEach(costItem => {
        totalCosts += Number(costItem.values[periodIndex] || 0);
      });
      
      benefits.forEach(benefitItem => {
        totalBenefits += Number(benefitItem.values[periodIndex] || 0);
      });
    });
    
    // Calculate cumulative ROI
    if (totalCosts > 0) {
      return ((totalBenefits - totalCosts) / totalCosts * 100).toFixed(2);
    }
    return "N/A";
  };

  // Handle simulate button click
  const handleSimulate = () => {
    // Placeholder for simulation functionality
    alert("Simulation feature will be implemented here");
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h2 className={styles.title}>ROI Calculator</h2>
        <button 
          onClick={handleSimulate} 
          className={styles.simulateButton}
        >
          Simulate
        </button>
      </div>
      
      {/* Spreadsheet-like layout */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeader}>
              <th className={`${styles.tableHeaderCell} ${styles.itemNameCell}`}>Item</th>
              {periods.map((period, index) => (
                <th key={index} className={styles.tableHeaderCell}>Period {period}</th>
              ))}
              <th className={styles.tableHeaderCell}>
                <button
                  onClick={addPeriod}
                  className={styles.addButton}
                >
                  + Add Period
                </button>
              </th>
            </tr>
          </thead>
          
          <tbody>
            {/* Costs Section */}
            <tr className={styles.sectionHeader}>
              <td colSpan={periods.length + 2} className={styles.sectionHeaderCell}>
                Costs
              </td>
            </tr>
            
            {costs.map((cost, costIndex) => (
              <tr key={`cost-${costIndex}`} className={styles.itemRow}>
                <td className={styles.itemCell}>
                  <div className={styles.itemInputContainer}>
                    <input
                      type="text"
                      value={cost.name}
                      onChange={(e) => updateCostName(costIndex, e.target.value)}
                      className={styles.itemInput}
                    />
                    <button
                      onClick={() => removeCost(costIndex)}
                      className={styles.removeButton}
                    >
                      ✕
                    </button>
                  </div>
                </td>
                
                {periods.map((_, periodIndex) => (
                  <td key={periodIndex} className={styles.valueCell}>
                    <input
                      type="number"
                      value={cost.values[periodIndex]}
                      onChange={(e) => updateCostValue(costIndex, periodIndex, e.target.value)}
                      className={styles.valueInput}
                    />
                  </td>
                ))}
                
                <td className={styles.emptyCell}></td>
              </tr>
            ))}
            
            <tr>
              <td className={styles.itemCell}>
                <button
                  onClick={addCostItem}
                  className={styles.addButton}
                >
                  + Add Cost
                </button>
              </td>
              <td colSpan={periods.length + 1} className={styles.emptyCell}></td>
            </tr>
            
            {/* Total Costs Row */}
            <tr className={styles.totalRow}>
              <td className={styles.totalLabelCell}>Total Costs</td>
              {periods.map((_, periodIndex) => {
                const totalCost = costs.reduce(
                  (sum, costItem) => sum + (Number(costItem.values[periodIndex]) || 0),
                  0
                );
                return (
                  <td key={periodIndex} className={styles.totalValueCell}>
                    ${totalCost.toFixed(2)}
                  </td>
                );
              })}
              <td className={styles.emptyCell}></td>
            </tr>
            
            {/* Benefits Section */}
            <tr className={styles.sectionHeader}>
              <td colSpan={periods.length + 2} className={styles.sectionHeaderCell}>
                Benefits
              </td>
            </tr>
            
            {benefits.map((benefit, benefitIndex) => (
              <tr key={`benefit-${benefitIndex}`} className={styles.itemRow}>
                <td className={styles.itemCell}>
                  <div className={styles.itemInputContainer}>
                    <input
                      type="text"
                      value={benefit.name}
                      onChange={(e) => updateBenefitName(benefitIndex, e.target.value)}
                      className={styles.itemInput}
                    />
                    <button
                      onClick={() => removeBenefit(benefitIndex)}
                      className={styles.removeButton}
                    >
                      ✕
                    </button>
                  </div>
                </td>
                
                {periods.map((_, periodIndex) => (
                  <td key={periodIndex} className={styles.valueCell}>
                    <input
                      type="number"
                      value={benefit.values[periodIndex]}
                      onChange={(e) => updateBenefitValue(benefitIndex, periodIndex, e.target.value)}
                      className={styles.valueInput}
                    />
                  </td>
                ))}
                
                <td className={styles.emptyCell}></td>
              </tr>
            ))}
            
            <tr>
              <td className={styles.itemCell}>
                <button
                  onClick={addBenefitItem}
                  className={styles.addButton}
                >
                  + Add Benefit
                </button>
              </td>
              <td colSpan={periods.length + 1} className={styles.emptyCell}></td>
            </tr>
            
            {/* Total Benefits Row */}
            <tr className={styles.totalRow}>
              <td className={styles.totalLabelCell}>Total Benefits</td>
              {periods.map((_, periodIndex) => {
                const totalBenefit = benefits.reduce(
                  (sum, benefitItem) => sum + (Number(benefitItem.values[periodIndex]) || 0),
                  0
                );
                return (
                  <td key={periodIndex} className={styles.totalValueCell}>
                    ${totalBenefit.toFixed(2)}
                  </td>
                );
              })}
              <td className={styles.emptyCell}></td>
            </tr>
            
            {/* ROI Row */}
            <tr className={styles.roiRow}>
              <td className={styles.roiLabelCell}>ROI (%)</td>
              {periods.map((_, periodIndex) => (
                <td key={periodIndex} className={styles.roiValueCell}>
                  {roiValues[periodIndex]}%
                </td>
              ))}
              <td className={styles.emptyCell}></td>
            </tr>
            
            {/* Cumulative ROI Row */}
            <tr className={styles.cumulativeRoiRow}>
              <td className={styles.cumulativeRoiLabelCell}>Cumulative ROI</td>
              <td colSpan={periods.length} className={styles.cumulativeRoiValueCell}>
                {calculateCumulativeROI()}%
              </td>
              <td className={styles.emptyCell}></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* Chart */}
      <div className={styles.chartContainer}>
        <h3 className={styles.chartTitle}>ROI Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" label={{ value: "Time Period", position: "insideBottom", offset: -5 }} />
            <YAxis label={{ value: "ROI (%)", angle: -90, position: "insideLeft" }} />
            <Tooltip formatter={(value) => [`${value}%`, "ROI"]} />
            <Legend />
            <Line type="monotone" dataKey="roi" name="ROI %" stroke={getComputedStyle(document.documentElement).getPropertyValue('--accent-primary') || "#7A335A"} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ROI;