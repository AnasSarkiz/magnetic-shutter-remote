import React from "react";
import { createRoot } from "react-dom/client";
import { SchematicViewer } from "@tscircuit/schematic-viewer";
import circuitJson from "../../../dist/index/circuit.json";

createRoot(document.getElementById("root")!).render(
  <SchematicViewer circuitJson={circuitJson} clickToInteractEnabled={false} containerStyle={{ width: "100vw", height: "100vh" }} />
);
