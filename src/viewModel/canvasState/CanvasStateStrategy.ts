import { SetStateCommand } from "../../command/SetStateCommand";
import { Command } from "../../command/Command";
import { SelectedShapeModel } from "../../model/SelectedShapeModel";
import { ShapeModel } from "../../model/ShapeModel";
import { CanvasViewModel } from "../CanvasViewModel";
import { DrawState } from "./DrawState";
import { MoveState } from "./MoveState";
import { ResizeState } from "./ResizeState";
import { SelectState } from "./SelectState";

export interface CanvasStateStrategy {
  createCommand(
    canvasViewModel: CanvasViewModel,
    shapeModel: ShapeModel,
    selectedShapeModel: SelectedShapeModel,
    params: any // 상태별로 필요한 추가 인자
  ): Command;
}

export class DrawStateStrategy implements CanvasStateStrategy {
  createCommand(
    canvasViewModel: CanvasViewModel,
    shapeModel: ShapeModel,
    selectedShapeModel: SelectedShapeModel,
    params: { shapeType: string }
  ): Command {
    return new SetStateCommand(
      canvasViewModel,
      new DrawState(
        canvasViewModel,
        shapeModel,
        selectedShapeModel,
        params.shapeType
      )
    );
  }
}

export class SelectStateStrategy implements CanvasStateStrategy {
  createCommand(
    canvasViewModel: CanvasViewModel,
    shapeModel: ShapeModel,
    selectedShapeModel: SelectedShapeModel,
    params: {}
  ): Command {
    return new SetStateCommand(
      canvasViewModel,
      new SelectState(canvasViewModel, shapeModel, selectedShapeModel)
    );
  }
}

export class MoveStateStrategy implements CanvasStateStrategy {
  createCommand(
    canvasViewModel: CanvasViewModel,
    shapeModel: ShapeModel,
    selectedShapeModel: SelectedShapeModel,
    params: { offsetX: number; offsetY: number }
  ): Command {
    return new SetStateCommand(
      canvasViewModel,
      new MoveState(
        canvasViewModel,
        shapeModel,
        selectedShapeModel,
        params.offsetX,
        params.offsetY
      )
    );
  }
}

export class ResizeStateStrategy implements CanvasStateStrategy {
  createCommand(
    canvasViewModel: CanvasViewModel,
    shapeModel: ShapeModel,
    selectedShapeModel: SelectedShapeModel,
    params: { pos: string; offsetX: number; offsetY: number }
  ): Command {
    return new SetStateCommand(
      canvasViewModel,
      new ResizeState(
        canvasViewModel,
        shapeModel,
        selectedShapeModel,
        params.pos,
        params.offsetX,
        params.offsetY
      )
    );
  }
}
