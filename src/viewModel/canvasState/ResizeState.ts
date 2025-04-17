import { Shape } from "../../entity/Shape";
import { CanvasViewModel } from "../CanvasViewModel";
import { ICanvasState } from "./CanvasState";
import { SelectState } from "./SelectState";

// 리사이즈 모드
export class ResizeState implements ICanvasState {
  private selectedShapes: Shape[] = [];
  private resizing: boolean = false;
  private startX: number = 0;
  private startY: number = 0;
  constructor(
    private viewModel: CanvasViewModel,
    private pos: string, // "top-left", "top-right", "bottom-right", "bottom-left"
    offsetX: number,
    offsetY: number
  ) {
    this.selectedShapes = this.viewModel.getSelectedShapes();
    this.resizing = true;

    document.addEventListener("mouseup", this.handleMouseUpBound);
    this.startX = offsetX; // offsetX - rect.left
    this.startY = offsetY; // offsetY - rect.top
  }
  private handleMouseUpBound = this.handleMouseUp.bind(this);
  handleMouseDown(event: React.MouseEvent): void {
    this.resizing = false;
  }

  handleMouseMove(event: React.MouseEvent): void {
    if (!this.resizing) return;
    const { offsetX, offsetY } = event.nativeEvent;

    if (offsetX === this.startX && offsetY === this.startY) return; // 변화 없으면 무시

    const dx = offsetX - this.startX;
    const dy = offsetY - this.startY;
    this.viewModel.resizeSelectedShapes(dx, dy, this.pos); // resize selected shapes

    this.startX = offsetX;
    this.startY = offsetY;
  }

  handleMouseUp(): void {
    this.resizing = false;
    document.removeEventListener("mouseup", this.handleMouseUpBound);
    this.viewModel.setState(new SelectState(this.viewModel));
  }

  getCurrentShapes(): Shape[] {
    return this.viewModel.getSavedShapes();
  }
}
