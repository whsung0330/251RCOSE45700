import React from "react";
import { CanvasViewModel } from "../viewModel/CanvasViewModel";
import useCanvasEvent from "../hooks/useCanvasEvent";
import "./Toolbar.css";
import { DEFAULT_SHAPE } from "../constants";

const Toolbar: React.FC<{ viewModel: CanvasViewModel }> = ({ viewModel }) => {
  const initialState = {
    currentState: "DrawState",
    drawingShape: "rectangle",
  }; // 초기 상태 설정

  const currentState = useCanvasEvent<{
    currentState: string;
    drawingShape?: string;
  }>(viewModel, "STATE_CHANGED", initialState, "currentState");

  const drawingShape = useCanvasEvent<{
    currentState: string;
    drawingShape?: string;
  }>(viewModel, "STATE_CHANGED", initialState, "drawingShape");

  const isActive = (shapeType: string) =>
    currentState === "DrawState" && drawingShape === shapeType;

  const isSelectActive = () =>
    currentState === "SelectState" ||
    currentState === "MoveState" ||
    currentState === "ResizeState";

  return (
    <div className="toolbar">
      <button
        className={`tool-button ${isActive("rectangle") ? "active" : ""}`}
        onClick={() => {
          viewModel.setShapeType("rectangle");
          viewModel.requestSetState("DrawState", { shapeType: "rectangle" });
        }}
      >
        ▭ 사각형
      </button>

      <button
        className={`tool-button ${isActive("ellipse") ? "active" : ""}`}
        onClick={() => {
          viewModel.setShapeType("ellipse");
          viewModel.requestSetState("DrawState", { shapeType: "ellipse" });
        }}
      >
        ◯ 원
      </button>

      <button
        className={`tool-button ${isActive("line") ? "active" : ""}`}
        onClick={() => {
          viewModel.setShapeType("line");
          viewModel.requestSetState("DrawState", { shapeType: "line" });
        }}
      >
        ㅡ 선
      </button>
      <button className="tool-button">
        <label htmlFor="image-upload" style={{ cursor: "pointer" }}>
          사진 업로드
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = () => {
                const imageUrl = reader.result as string;

                const img = new Image();
                img.src = imageUrl;
                img.onload = () => {
                  const aspectRatio = img.width / img.height;
                  const baseWidth = DEFAULT_SHAPE.WIDTH;
                  const baseHeight = Math.round(baseWidth / aspectRatio); // 비율에 따른 높이 계산

                  viewModel.requestAddTemplateShape("image", {
                    imageUrl,
                    width: baseWidth,
                    height: baseHeight,
                  });

                  viewModel.setShapeType("");
                  viewModel.requestSetState("SelectState", {});
                };
                img.onerror = () => {
                  console.error("이미지 로드 실패:", file.name);
                };
              };
              reader.readAsDataURL(file);
            } else {
              console.error("파일이 선택되지 않았습니다.");
            }

            event.target.value = "";
          }}
        />
      </button>
      <button
        className={`tool-button ${isActive("text") ? "active" : ""}`}
        onClick={() => {
          viewModel.requestAddTemplateShape("text", {
            width: DEFAULT_SHAPE.WIDTH,
            height: DEFAULT_SHAPE.HEIGHT,
          })
          viewModel.setShapeType("");
          viewModel.requestSetState("SelectState", {});
        }}
      >
        텍스트
      </button>

      <button
        className={`tool-button ${isSelectActive() ? "active" : ""}`}
        onClick={() => {
          viewModel.setShapeType("");
          viewModel.requestSetState("SelectState", {});
        }}
      >
        선택
      </button>

      <button
        className={`tool-button`}
        onClick={() => {
          viewModel.requestResetCanvas();
        }}
      >
        리셋
      </button>
    </div>
  );
};

export default Toolbar;
