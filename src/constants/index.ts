export const CANVAS = {
  WIDTH: 800,
  HEIGHT: 600,
};

export const DEFAULT_SHAPE = {
  WIDTH: 300,
  HEIGHT: 100,
  COLOR: "#000000",
  FONT_SIZE: 30,
  TEXT_CONTENT: "Enter text here.",
  FONT_FAMILY: "Arial",
};

export const PROPERTY_NAMES = {
  POS_HORIZONTAL: "가로 위치",
  POS_VERTICAL: "세로 위치",
  SHAPE_WIDTH: "너비",
  SHAPE_HEIGHT: "높이",
  SHAPE_COLOR: "색",
  SHAPE_LINELENGTH: "길이",
  SHAPE_LINEWIDTH: "선 굵기",
  FONT_CONTENT: "텍스트",
  FONT_FAMILY: "폰트",
  FONT_SIZE: "글자 크기",
  FONT_COLOR: '글자 색',
  FONT_BOLD: "B",
  FONT_ITALIC: "I",
  SHADOW_ANGLE: "그림자 각도",
  SHADOW_RADIUS: "그림자 간격",
  SHADOW_BLUR: "그림자 흐리게",
  SHADOW_COLOR: "그림자 색",
  BORDER_WIDTH: "테두리 굵기",
  BORDER_COLOR: "테두리 색",
};

export const PROPERTY_TYPES = {
  COLOR: "color",
  TEXT: "text",
  NUMBER: "number",
  DROPDOWN: "dropdown",
  READ: "read",
  BOOLEAN: "boolean",
};

export const DROPDOWN_OPTIONS: { [key: string]: string[] } = {
  [PROPERTY_NAMES.FONT_FAMILY]: [
    "Arial",
    "Times New Roman",
    "Tahoma",
    "Georgia",
    "Courier New",
    "Brush Script MT",
  ],
};

export enum ResizeHandlePosition {
  TopLeft = "top-left",
  TopRight = "top-right",
  BottomRight = "bottom-right",
  BottomLeft = "bottom-left",
}

export enum CommandType {
  ADD_TEMPLATE_SHAPE = "ADD_TEMPLATE_SHAPE",
  SET_PROPERTY = "SET_PROPERTY",
  Z_ORDER_MOVE = "Z_ORDER_MOVE",
  CANVAS_RESET = "CANVAS_RESET",
  SET_STATE = "SET_STATE",
  START_DRAW = "START_DRAW",
  CONTINUE_DRAW = "CONTINUE_DRAW",
  END_DRAW = "END_DRAW",
  START_MOVE = "START_MOVE",
  CONTINUE_MOVE = "CONTINUE_MOVE",
  START_RESIZE = "START_RESIZE",
  CONTINUE_RESIZE = "CONTINUE_RESIZE",
  UPDATE_SELECTED = "UPDATE_SELECTED",
  GROUP = "GROUP",
  UNGROUP = "UNGROUP",
}

export enum CanvasStateType {
  SELECT = "SelectState",
  RESIZE = "ResizeState",
  MOVE = "MoveState",
  DRAW = "DrawState",
  EDIT_TEXT = "EditTextState",
}
