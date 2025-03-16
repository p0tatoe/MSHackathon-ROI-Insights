import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const ROI = () => {
  const [data, setData] = useState([
    { x: 1, y: 5 },
    { x: 2, y: 10 },
    { x: 3, y: 15 },
    { x: 4, y: 20 },
    { x: 5, y: 25 },
  ]);
  const [xValue, setXValue] = useState("");
  const [yValue, setYValue] = useState("");

  const addDataPoint = () => {
    if (xValue !== "" && yValue !== "") {
      setData([...data, { x: Number(xValue), y: Number(yValue) }]);
      setXValue("");
      setYValue("");
    }
  };

  const updateDataPoint = (index, key, value) => {
    const newData = [...data];
    newData[index][key] = Number(value);
    setData(newData);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold text-center mb-4">ROI Over Time</h2>
      <div className="flex gap-2 mb-4">
        <input type="number" value={xValue} onChange={(e) => setXValue(e.target.value)} placeholder="Time Period" className="border p-2" />
        <input type="number" value={yValue} onChange={(e) => setYValue(e.target.value)} placeholder="ROI %" className="border p-2" />
        <button onClick={addDataPoint} className="bg-blue-500 text-white p-2 rounded">Add</button>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" label={{ value: "Time Period", position: "insideBottom", offset: -5 }} />
          <YAxis label={{ value: "ROI (%)", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="y" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
      <h3 className="text-lg font-bold mt-4">Edit Data Points</h3>
      <div className="mt-2">
        {data.map((point, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input type="number" value={point.x} onChange={(e) => updateDataPoint(index, "x", e.target.value)} className="border p-2 w-20" />
            <input type="number" value={point.y} onChange={(e) => updateDataPoint(index, "y", e.target.value)} className="border p-2 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ROI;
