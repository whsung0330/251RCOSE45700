import { Shape } from "../../entity/Shape";
import { CanvasViewModel } from "../CanvasViewModel";
import { ICanvasState } from "./CanvasState";
import { SelectState } from "./SelectState";

// 이동 모드
export class MoveState implements ICanvasState {
  private startX: number = 0;
  private startY: number = 0;
  private endX: number = 0;
  private endY: number = 0;
  private moving = false;

  constructor(
    private viewModel: CanvasViewModel,
    offsetX: number,
    offsetY: number
  ) {
    this.startX = offsetX;
    this.startY = offsetY;
    this.moving = true;
  }

  handleMouseDown(event: React.MouseEvent): void {
    //? required?
    const { offsetX, offsetY } = event.nativeEvent;
    this.startX = offsetX;
    this.startY = offsetY;

    this.moving = true;
  }

  handleMouseMove(event: React.MouseEvent): void {
    if (!this.moving) return;
    const { offsetX, offsetY } = event.nativeEvent;
    if (offsetX === this.endX && offsetY === this.endY) return;

    this.endX = offsetX;
    this.endY = offsetY;

    const dx = this.endX - this.startX;
    const dy = this.endY - this.startY;
    this.startX = offsetX;
    this.startY = offsetY;

    if (this.viewModel.getSelectedShapes().length > 0) {
      this.viewModel.moveSelectedShapes(dx, dy); // move selected shapes
    }
  }

  handleMouseUp(): void {
    this.moving = false;
    this.viewModel.setState(new SelectState(this.viewModel)); // switch back to select state
  }

  getCurrentShapes(): Shape[] {
    return this.viewModel.getSavedShapes();
  }
}
