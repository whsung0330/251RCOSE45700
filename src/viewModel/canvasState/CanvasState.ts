import React from "react";
import { Shape } from "../../entity/Shape";

export interface ICanvasState {
  handleMouseDown(event: React.MouseEvent): void;
  handleMouseMove(event: React.MouseEvent): void;
  handleMouseUp(): void;
  getCurrentShapes(): Shape[];
}
