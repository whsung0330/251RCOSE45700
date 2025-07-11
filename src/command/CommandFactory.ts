import { CommandType } from "../constants";
import {
  AddTemplateShapeCommand,
  CanvasResetCommand,
  SetPropertyCommand,
  SetStateCommand,
  ZOrderMoveCommand,
} from "./";
import { Command } from "./Command";
import {
  ContinueDrawShapeCommand,
  EndDrawShapeCommand,
  StartDrawShapeCommand,
} from "./DrawShapeCommand";
import { GroupCommand, UngroupCommand } from "./GroupCommand";
import { ContinueMoveCommand, StartMoveCommand } from "./MoveCommand";
import { ContinueResizeCommand, StartResizeCommand } from "./ResizeCommand";
import { UpdateSelectedCommand } from "./UpdateSelectedCommand";

interface CommandCreator {
  create(props?: any): Command;
}

class AddTemplateShapeCommandCreator implements CommandCreator {
  create(props: { shapeType: string; properties: any }): Command {
    return new AddTemplateShapeCommand(props.shapeType, props.properties);
  }
}

class CanvasResetCommandCreator implements CommandCreator {
  create(): Command {
    return new CanvasResetCommand();
  }
}

class SetPropertyCommandCreator implements CommandCreator {
  create(props: {
    shapeId: number;
    propertyName: string;
    value: any;
  }): Command {
    return new SetPropertyCommand(
      props.shapeId,
      props.propertyName,
      props.value
    );
  }
}

class ZOrderMoveCommandCreator implements CommandCreator {
  create(props: { actionType: string; shapeId: number }): Command {
    return new ZOrderMoveCommand(props.actionType, props.shapeId);
  }
}

class SetStateCommandCreator implements CommandCreator {
  create(props: { stateType: string; shapeType?: string }): Command {
    return new SetStateCommand(props.stateType, props.shapeType);
  }
}

class StartDrawShapeCommandCreator implements CommandCreator {
  create(props: { offsetX: number; offsetY: number }): Command {
    return new StartDrawShapeCommand(props.offsetX, props.offsetY);
  }
}

class ContinueDrawShapeCommandCreator implements CommandCreator {
  create(props: { offsetX: number; offsetY: number }): Command {
    return new ContinueDrawShapeCommand(props.offsetX, props.offsetY);
  }
}

class EndDrawShapeCommandCreator implements CommandCreator {
  create(): Command {
    return new EndDrawShapeCommand();
  }
}

class StartMoveCommandCreator implements CommandCreator {
  create(props: { offsetX: number; offsetY: number }): Command {
    return new StartMoveCommand(props.offsetX, props.offsetY);
  }
}

class ContinueMoveCommandCreator implements CommandCreator {
  create(props: { offsetX: number; offsetY: number }): Command {
    return new ContinueMoveCommand(props.offsetX, props.offsetY);
  }
}

class StartResizeCommandCreator implements CommandCreator {
  create(props: { pos: string; offsetX: number; offsetY: number }): Command {
    return new StartResizeCommand(props.pos, props.offsetX, props.offsetY);
  }
}

class ContinueResizeCommandCreator implements CommandCreator {
  create(props: { offsetX: number; offsetY: number }): Command {
    return new ContinueResizeCommand(props.offsetX, props.offsetY);
  }
}

class UpdateSelectedCommandCreator implements CommandCreator {
  create(props: { selectedShapes: any[] }): Command {
    return new UpdateSelectedCommand(props.selectedShapes);
  }
}

class GroupCommandCreator implements CommandCreator {
  create(): Command {
    return new GroupCommand();
  }
}

class UngroupCommandCreator implements CommandCreator {
  create(props: { shapeId: number }): Command {
    return new UngroupCommand(props.shapeId);
  }
}

export class CommandFactory {
  private static commandCreators: Record<string, CommandCreator> = {
    [CommandType.ADD_TEMPLATE_SHAPE]: new AddTemplateShapeCommandCreator(),
    [CommandType.CANVAS_RESET]: new CanvasResetCommandCreator(),
    [CommandType.SET_PROPERTY]: new SetPropertyCommandCreator(),
    [CommandType.Z_ORDER_MOVE]: new ZOrderMoveCommandCreator(),
    [CommandType.SET_STATE]: new SetStateCommandCreator(),
    [CommandType.START_DRAW]: new StartDrawShapeCommandCreator(),
    [CommandType.CONTINUE_DRAW]: new ContinueDrawShapeCommandCreator(),
    [CommandType.END_DRAW]: new EndDrawShapeCommandCreator(),
    [CommandType.START_MOVE]: new StartMoveCommandCreator(),
    [CommandType.CONTINUE_MOVE]: new ContinueMoveCommandCreator(),
    [CommandType.START_RESIZE]: new StartResizeCommandCreator(),
    [CommandType.CONTINUE_RESIZE]: new ContinueResizeCommandCreator(),
    [CommandType.UPDATE_SELECTED]: new UpdateSelectedCommandCreator(),
    [CommandType.GROUP]: new GroupCommandCreator(),
    [CommandType.UNGROUP]: new UngroupCommandCreator(),
  };

  static createCommand(commandType: string, props: any): Command {
    const commandCreator = this.commandCreators[commandType];
    if (!commandCreator) {
      throw new Error(`Command ${commandType} not found`);
    }
    return commandCreator.create(props);
  }
}
