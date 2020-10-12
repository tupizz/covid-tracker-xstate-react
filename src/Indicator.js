import React, { useContext } from "react";
import CountUp from "react-countup";
import { Row, Col } from "react-bootstrap";
import { useService } from "@xstate/react";
import { MachineProvider } from "./App";

export default function Indicator() {
  const service = useContext(MachineProvider);
  const [current] = useService(service);

  const { confirmed, deaths, recovered } = current.context;

  return (
    <section
      data-machine={service.machine.id}
      data-state={current.toStrings().join(" ")}
    >
      <Row style={{ marginRight: "-5px" }}>
        <Col md={4}>
          <div className="grid-col">
            <div style={{ fontSize: 20 }}>Confirmed cases</div>
            <h2 style={{ color: "rgb(189, 33, 48)" }}>
              <CountUp start={0} end={confirmed} duration={2} separator="." />
            </h2>
          </div>
        </Col>
        <Col md={4}>
          <div className="grid-col">
            <div style={{ fontSize: 20 }}>Deaths</div>
            <h2 style={{ color: "rgb(189, 189, 189)" }}>
              <CountUp start={0} end={deaths} duration={2} separator="." />
            </h2>
          </div>
        </Col>
        <Col md={4}>
          <div className="grid-col">
            <div style={{ fontSize: 20 }}>Recovered</div>
            <h2 style={{ color: "rgb(164, 201, 57)" }}>
              <CountUp start={0} end={recovered} duration={2} separator="." />
            </h2>
          </div>
        </Col>
      </Row>
    </section>
  );
}
