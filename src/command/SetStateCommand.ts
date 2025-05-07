import { ICanvasState } from "../viewModel/canvasState/CanvasState";
import { CanvasViewModel } from "../viewModel/CanvasViewModel";
import { Command } from "./Command";

export class SetStateCommand implements Command {
  private canvasViewModel: CanvasViewModel;
  private state: ICanvasState;

  constructor(canvasViewModel: CanvasViewModel, state: ICanvasState) {
    this.canvasViewModel = canvasViewModel;
    this.state = state;
  }
  execute() {
    this.canvasViewModel.setState(this.state);
  }

  undo(): void {
    return;
  }
  redo(): void {
    return;
  }
}
