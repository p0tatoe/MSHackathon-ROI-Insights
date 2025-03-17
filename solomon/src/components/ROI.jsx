import React, { useState, useEffect } from "react";
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

  return (
    <div className="p-4 max-w-full overflow-x-auto">
      <h2 className="text-2xl font-bold text-center mb-6">ROI Calculator</h2>
      
      {/* Spreadsheet-like layout */}
      <div className="mb-6">
        <table className="border-collapse min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 w-48">Item</th>
              {periods.map((period, index) => (
                <th key={index} className="border p-2 w-24">Period {period}</th>
              ))}
              <th className="border p-2 w-24">
                <button
                  onClick={addPeriod}
                  className="bg-blue-500 text-white p-1 rounded w-full"
                >
                  + Add Period
                </button>
              </th>
            </tr>
          </thead>
          
          <tbody>
            {/* Costs Section */}
            <tr className="bg-gray-50">
              <td colSpan={periods.length + 2} className="border p-2 font-bold">
                Costs
              </td>
            </tr>
            
            {costs.map((cost, costIndex) => (
              <tr key={`cost-${costIndex}`}>
                <td className="border p-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={cost.name}
                      onChange={(e) => updateCostName(costIndex, e.target.value)}
                      className="border p-1 w-full"
                    />
                    <button
                      onClick={() => removeCost(costIndex)}
                      className="bg-red-500 text-white p-1 rounded"
                    >
                      ✕
                    </button>
                  </div>
                </td>
                
                {periods.map((_, periodIndex) => (
                  <td key={periodIndex} className="border p-2">
                    <input
                      type="number"
                      value={cost.values[periodIndex]}
                      onChange={(e) => updateCostValue(costIndex, periodIndex, e.target.value)}
                      className="border p-1 w-full"
                    />
                  </td>
                ))}
                
                <td className="border"></td>
              </tr>
            ))}
            
            <tr>
              <td className="border p-2">
                <button
                  onClick={addCostItem}
                  className="bg-blue-500 text-white p-1 rounded w-full"
                >
                  + Add Cost
                </button>
              </td>
              <td colSpan={periods.length + 1} className="border"></td>
            </tr>
            
            {/* Total Costs Row */}
            <tr className="bg-gray-100">
              <td className="border p-2 font-bold">Total Costs</td>
              {periods.map((_, periodIndex) => {
                const totalCost = costs.reduce(
                  (sum, costItem) => sum + (Number(costItem.values[periodIndex]) || 0),
                  0
                );
                return (
                  <td key={periodIndex} className="border p-2 font-bold text-right">
                    ${totalCost.toFixed(2)}
                  </td>
                );
              })}
              <td className="border"></td>
            </tr>
            
            {/* Benefits Section */}
            <tr className="bg-gray-50">
              <td colSpan={periods.length + 2} className="border p-2 font-bold">
                Benefits
              </td>
            </tr>
            
            {benefits.map((benefit, benefitIndex) => (
              <tr key={`benefit-${benefitIndex}`}>
                <td className="border p-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={benefit.name}
                      onChange={(e) => updateBenefitName(benefitIndex, e.target.value)}
                      className="border p-1 w-full"
                    />
                    <button
                      onClick={() => removeBenefit(benefitIndex)}
                      className="bg-red-500 text-white p-1 rounded"
                    >
                      ✕
                    </button>
                  </div>
                </td>
                
                {periods.map((_, periodIndex) => (
                  <td key={periodIndex} className="border p-2">
                    <input
                      type="number"
                      value={benefit.values[periodIndex]}
                      onChange={(e) => updateBenefitValue(benefitIndex, periodIndex, e.target.value)}
                      className="border p-1 w-full"
                    />
                  </td>
                ))}
                
                <td className="border"></td>
              </tr>
            ))}
            
            <tr>
              <td className="border p-2">
                <button
                  onClick={addBenefitItem}
                  className="bg-blue-500 text-white p-1 rounded w-full"
                >
                  + Add Benefit
                </button>
              </td>
              <td colSpan={periods.length + 1} className="border"></td>
            </tr>
            
            {/* Total Benefits Row */}
            <tr className="bg-gray-100">
              <td className="border p-2 font-bold">Total Benefits</td>
              {periods.map((_, periodIndex) => {
                const totalBenefit = benefits.reduce(
                  (sum, benefitItem) => sum + (Number(benefitItem.values[periodIndex]) || 0),
                  0
                );
                return (
                  <td key={periodIndex} className="border p-2 font-bold text-right">
                    ${totalBenefit.toFixed(2)}
                  </td>
                );
              })}
              <td className="border"></td>
            </tr>
            
            {/* ROI Row */}
            <tr className="bg-blue-50">
              <td className="border p-2 font-bold">ROI (%)</td>
              {periods.map((_, periodIndex) => (
                <td key={periodIndex} className="border p-2 font-bold text-right text-blue-600">
                  {roiValues[periodIndex]}%
                </td>
              ))}
              <td className="border"></td>
            </tr>
            
            {/* Cumulative ROI Row */}
            <tr className="bg-blue-100">
              <td className="border p-2 font-bold">Cumulative ROI</td>
              <td colSpan={periods.length} className="border p-2 font-bold text-right text-blue-800">
                {calculateCumulativeROI()}%
              </td>
              <td className="border"></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* Chart */}
      <div className="border p-4 rounded shadow-sm">
        <h3 className="text-lg font-bold mb-4">ROI Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" label={{ value: "Time Period", position: "insideBottom", offset: -5 }} />
            <YAxis label={{ value: "ROI (%)", angle: -90, position: "insideLeft" }} />
            <Tooltip formatter={(value) => [`${value}%`, "ROI"]} />
            <Legend />
            <Line type="monotone" dataKey="roi" name="ROI %" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ROI;