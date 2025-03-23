// import React from "react";
import { LineChart, Line, XAxis, YAxis } from "recharts";

type LineGraphProps = {
  data: { x: number; y: number }[];
};

export const LineGraph = ({ data }: LineGraphProps) => {
  return (
    <LineChart width={150} height={25} data={data}>
      <Line
        type="monotone"
        dataKey="y"
        stroke="red"
        strokeWidth={2}
        dot={{ r: 0 }}
      />
      <XAxis hide dataKey="x" />
      <YAxis hide />
    </LineChart>
  );
};
