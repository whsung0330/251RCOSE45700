import { ShapeModel } from "../model/ShapeModel";
import { 
  ZOrderStrategy,
  MoveForwardStrategy,
  MoveBackwardStrategy,
  MoveToFrontStrategy,
  MoveToBackStrategy,
 } from "../strategy/zOrder/ZOrderStrategy";
import { Command } from "./Command";

export class ZOrderMoveCommand implements Command {
  private shapeModel: ShapeModel;
  private strategy: ZOrderStrategy;
  private shapeId: number;

  constructor(shapeModel: ShapeModel, strategy: ZOrderStrategy, shapeId: number) {
    this.shapeModel = shapeModel;
    this.strategy = strategy;
    this.shapeId = shapeId;
  }

  execute(): void {
    const zOrder = this.shapeModel.getZOrder();
    const index = zOrder.indexOf(this.shapeId);
    if (index !== -1) {
      this.strategy.execute(zOrder, index);
    }
  }

  redo(): void {
    this.execute();
  }
  undo(): void {
    // Undo logic if needed
  }
}

export class ZOrderMoveCommandFactory {
  private strategies: Record<string, ZOrderStrategy> = {
    forward: new MoveForwardStrategy(),
    backward: new MoveBackwardStrategy(),
    toFront: new MoveToFrontStrategy(),
    toBack: new MoveToBackStrategy(),
  };

  constructor(private shapeModel: ShapeModel) {}

  createCommand(action: string, shapeId: number): Command {
    const strategy = this.strategies[action];
    if (!strategy) {
      throw new Error(`Unknown z-order action: ${action}`);
    }
    return new ZOrderMoveCommand(this.shapeModel, strategy, shapeId);
  }
}