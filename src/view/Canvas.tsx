import React, { useCallback, useEffect, useRef } from "react";
import { CanvasViewModel } from "../viewModel/CanvasViewModel";
import { Shape } from "../entity/shape/Shape";
import useCanvasEvent from "../hooks/useCanvasEvent";
import { CANVAS } from "../constants";
import "./Canvas.css";

const Canvas: React.FC<{ viewModel: CanvasViewModel }> = ({ viewModel }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const shapes = useCanvasEvent<{ shapes: Shape[]; selectedShapes: Shape[] }>(
    viewModel,
    "SHAPES_UPDATED",
    { shapes: [], selectedShapes: [] },
    "shapes"
  );

  //캔버스 렌더링
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    shapes.forEach((shape) => {
      shape.draw(ctx);
    });
  }, [shapes]);

  useEffect(() => {
    if (canvasRef.current) {
      redrawCanvas();
    }
  }, [shapes, canvasRef, redrawCanvas]);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS.WIDTH}
      height={CANVAS.HEIGHT}
      onMouseDown={viewModel.handleMouseDown}
      onMouseMove={viewModel.handleMouseMove}
      onMouseUp={viewModel.handleMouseUp}
      onDoubleClick={viewModel.handleDoubleClick}
      style={{ border: "1px solid black" }}
    />
  );
};

export default Canvas;
