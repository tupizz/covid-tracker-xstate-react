import React, { useContext } from "react";
import { Bar } from "react-chartjs-2";
import { useService } from "@xstate/react";
import { MachineProvider } from "./App";

export default function Chart() {
  const service = useContext(MachineProvider);
  const [current] = useService(service);

  const { country, confirmed, deaths, recovered } = current.context;

  return (
    <div className="chart-container">
      <Bar
        data={{
          labels: ["Infected", "Recovered", "Deaths"],
          datasets: [
            {
              label: "People",
              backgroundColor: [
                "rgba(0, 0, 255, 0.5)",
                "rgba(0, 255, 0, 0.5)",
                "rgba(255, 0, 0, 0.5)"
              ],
              data: [confirmed, recovered, deaths]
            }
          ]
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Current state in ${country}` }
        }}
      />
    </div>
  );
}
