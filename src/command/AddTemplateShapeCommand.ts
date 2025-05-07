import { SelectedShapeModel } from "../model/SelectedShapeModel";
import { ShapeModel } from "../model/ShapeModel";
import { CanvasViewModel } from "../viewModel/CanvasViewModel";
import { Command } from "./Command";

export class AddTemplateShapeCommand implements Command {
    constructor(
        private canvasViewModel: CanvasViewModel,
        private shapeModel: ShapeModel,
        private selectedShapeModel: SelectedShapeModel,
        private type: string,
        private properties: any
    ) {}

    execute(): void {
        const shape = this.shapeModel.addTemplateShape(this.type, this.properties);
        this.selectedShapeModel.continueSelectShapes([shape]);
    }

    redo(): void {
        this.execute();
    }
    
    undo(): void {}
}