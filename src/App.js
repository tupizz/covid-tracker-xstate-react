import React, { createContext } from "react";
import { useMachine } from "@xstate/react";
import { covidMachine } from "./machine/covidMachine";
import { Container } from "react-bootstrap";
import GridIndicator from "./GridIndicator";
import "./styles.scss";

export const MachineProvider = createContext();

export default function App() {
  const [current, send] = useMachine(covidMachine);

  const { countryStat } = current.context;

  return (
    <MachineProvider.Provider value={countryStat}>
      <div className="App">
        <Container>
          <main
            data-machine={covidMachine.id}
            data-state={current.toStrings().join(" ")}
          >
            <h1>{current.matches("idle") ? "Select a country" : null}</h1>
            <select
              onChange={e => {
                send("SELECT", { name: e.target.value });
              }}
            >
              <option disabled>Select one</option>
              {current.context.listCountries.map(country => {
                return <option key={country.name}>{country.name}</option>;
              })}
            </select>
            <div>{countryStat && <GridIndicator />}</div>
          </main>
        </Container>
      </div>
    </MachineProvider.Provider>
  );
}
