import React from "react";

export interface ICanvasState {
  handleMouseDown(event: React.MouseEvent): void;
  handleMouseMove(event: React.MouseEvent): void;
  handleMouseUp(): void;
  handleDoubleClick(event: React.MouseEvent): void
}
