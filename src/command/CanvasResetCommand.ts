import { SelectedShapeModel } from "../model/SelectedShapeModel";
import { ShapeModel } from "../model/ShapeModel";
import { DrawState } from "../viewModel/canvasState/DrawState";
import { CanvasViewModel } from "../viewModel/CanvasViewModel";
import { Command } from "./Command";

export class CanvasResetCommand implements Command {
  private canvasViewModel: CanvasViewModel;
  private shapeModel: ShapeModel;
  private selectedShapeModel: SelectedShapeModel;

  constructor(
    canvasViewModel: CanvasViewModel,
    shapeModel: ShapeModel,
    selectedShapeModel: SelectedShapeModel
  ) {
    this.canvasViewModel = canvasViewModel;
    this.shapeModel = shapeModel;
    this.selectedShapeModel = selectedShapeModel;
  }

  execute(): void {
    this.shapeModel.clearShapes();
    this.selectedShapeModel.clearSelectedShapes();
    this.canvasViewModel.setShapeType("rectangle"); // default 값으로
    this.canvasViewModel.setState(
      new DrawState(
        this.canvasViewModel,
        this.shapeModel,
        this.selectedShapeModel,
        this.canvasViewModel.getShapeType()
      )
    ); // default: 그리기 모드

    // 만약 입력창이 남아있다면 삭제 << 위치 여기가 아닐 것 같은데 급한대로 추가해놨었어요
    const textareas = document.querySelectorAll("textarea");
    textareas.forEach((textarea) => {
        textarea.remove();
    });
  }

  redo(): void {
    this.execute();
  }
  undo(): void {
    // Undo logic if needed
  }
}
