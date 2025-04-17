import React from "react";
import { Shape } from "../entity/Shape"; // Shape 인터페이스 또는 클래스 import 경로 맞춰줘
import { CanvasViewModel } from "../viewModel/CanvasViewModel";
import useCanvasEvent from "../hooks/useCanvasEvent";
import "./PropertyWindow.css";

const PropertyWindow: React.FC<{ viewModel: CanvasViewModel }> = ({
  viewModel,
}) => {
  const selectedShapes = useCanvasEvent<{
    shapes: Shape[];
    selectedShapes: Shape[];
  }>(
    viewModel,
    "SHAPES_UPDATED",
    { shapes: [], selectedShapes: [] },
    "selectedShapes"
  );

  if (!selectedShapes) {
    return (
      <div className="container">
        <p className="emptyText">선택된 도형이 없습니다.</p>
      </div>
    );
  }

  if (selectedShapes.length === 1) {
    return (
      <div className="container">
        <h3 className="title">도형 속성</h3>
        <div className="item">
          <span>타입:</span>{" "}
          <strong>{selectedShapes[0].constructor.name}</strong>
        </div>
        <button
          onClick={() => {
            viewModel.moveForward(selectedShapes[0].id);
          }}
        >
          앞으로
        </button>
        <button
          onClick={() => {
            viewModel.moveBackward(selectedShapes[0].id);
          }}
        >
          뒤로
        </button>
        <button
          onClick={() => {
            viewModel.moveToFront(selectedShapes[0].id);
          }}
        >
          맨 앞으로
        </button>
        <button
          onClick={() => {
            viewModel.moveToBack(selectedShapes[0].id);
          }}
        >
          맨 뒤로
        </button>
        {/* <div className="item">
            <span>색상:</span> <strong>{selectedShapes[0].color}</strong>
          </div>
          <div className="item">
            <span>위치:</span>{" "}
            <strong>
              ({selectedShape.x}, {selectedShape.y})
            </strong>
          </div>
          <div className="item">
            <span>크기:</span>{" "}
            <strong>
              {selectedShape.width} × {selectedShape.height}
            </strong>
          </div> */}
      </div>
    );
  }
};

export default PropertyWindow;
