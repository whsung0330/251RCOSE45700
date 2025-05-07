import { PROPERTY_NAMES, PROPERTY_TYPES } from "../../constants";

export interface Property {
  type: string;
  name: string;
  value: string | number;
}

export interface PropertyHandler<T> {
  type: string;
  name: string;
  getValue(shape: T): string | number;
  setValue(shape: T, value: any): void;
}

export const CommonPropertyHandlers = {
  HorizontalPos: <T extends { centerX: number; setCenterX(newX: number): void }>(): PropertyHandler<T> => ({
    type: PROPERTY_TYPES.NUMBER,
    name: PROPERTY_NAMES.HORIZONTAL_POS,
    getValue: (shape) => Math.round(shape.centerX),
    setValue: (shape, value) => shape.setCenterX(Number(value)),
  }),
  VerticalPos: <T extends { centerY: number; setCenterY(newY: number): void }>(): PropertyHandler<T> => ({
    type: PROPERTY_TYPES.NUMBER,
    name: PROPERTY_NAMES.VERTICAL_POS,
    getValue: (shape) => Math.round(shape.centerY),
    setValue: (shape, value) => shape.setCenterY(Number(value)),
  }),
  Width: <T extends { width: number; setWidth(newWidth: number): void }>(): PropertyHandler<T> => ({
    type: PROPERTY_TYPES.NUMBER,
    name: PROPERTY_NAMES.WIDTH,
    getValue: (shape) => Math.round(shape.width),
    setValue: (shape, value) => shape.setWidth(Number(value)),
  }),
  Height: <T extends { height: number; setHeight(newHeight: number): void }>(): PropertyHandler<T> => ({
    type: PROPERTY_TYPES.NUMBER,
    name: PROPERTY_NAMES.HEIGHT,
    getValue: (shape) => Math.round(shape.height),
    setValue: (shape, value) => shape.setHeight(Number(value)),
  }),
  Color: <T extends { color: string }>(): PropertyHandler<T> => ({
    type: PROPERTY_TYPES.COLOR,
    name: PROPERTY_NAMES.COLOR,
    getValue: (shape) => shape.color,
    setValue: (shape, value) => { shape.color = value.toString(); },
  }),
  ShadowAngle: <T extends { shadowAngle: number; shadowRadius: number; shadowOffsetX: number; shadowOffsetY: number }>(): PropertyHandler<T> => ({
    type: PROPERTY_TYPES.NUMBER,
    name: PROPERTY_NAMES.SHADOW_ANGLE,
    getValue: (shape) => Math.round(shape.shadowAngle * (180 / Math.PI)),
    setValue: (shape, value) => {
      const newAngle = Number(value) * (Math.PI / 180);
      const radius = shape.shadowRadius;
      shape.shadowOffsetX = radius * Math.cos(newAngle);
      shape.shadowOffsetY = radius * Math.sin(newAngle);
    },
  }),
  ShadowRadius: <T extends { shadowRadius: number; shadowAngle: number; shadowOffsetX: number; shadowOffsetY: number }>(): PropertyHandler<T> => ({
    type: PROPERTY_TYPES.NUMBER,
    name: PROPERTY_NAMES.SHADOW_RADIUS,
    getValue: (shape) => shape.shadowRadius,
    setValue: (shape, value) => {
      const newRadius = Number(value);
      const shadowAngle = shape.shadowAngle;
      shape.shadowOffsetX = newRadius * Math.cos(shadowAngle);
      shape.shadowOffsetY = newRadius * Math.sin(shadowAngle);
    },
  }),
  ShadowBlur: <T extends { shadowBlur: number }>(): PropertyHandler<T> => ({
    type: PROPERTY_TYPES.NUMBER,
    name: PROPERTY_NAMES.SHADOW_BLUR,
    getValue: (shape) => shape.shadowBlur,
    setValue: (shape, value) => { shape.shadowBlur = Number(value); },
  }),
  ShadowColor: <T extends { shadowColor: string }>(): PropertyHandler<T> => ({
    type: PROPERTY_TYPES.COLOR,
    name: PROPERTY_NAMES.SHADOW_COLOR,
    getValue: (shape) => shape.shadowColor,
    setValue: (shape, value) => { shape.shadowColor = value.toString(); },
  }),
  textContentHandler: <T extends { textContent: string }> (): PropertyHandler<T> => ({
    type: PROPERTY_TYPES.TEXT,
    name: PROPERTY_NAMES.TEXT_CONTENT,
    getValue: (shape) => shape.textContent,
    setValue: (shape, value) => { shape.textContent = value.toString(); },
  }),
};

export const BorderedShapePropertyHandlers = {
  BorderWidth: <T extends { borderWidth: number }>() => ({
    type: PROPERTY_TYPES.NUMBER,
    name: PROPERTY_NAMES.BORDER_WIDTH,
    getValue: (shape: T) => Math.round(shape.borderWidth),
    setValue: (shape: T, value: any) => { shape.borderWidth = Number(value); },
  }),
  BorderColor: <T extends { borderColor: string }>(): PropertyHandler<T> => ({
    type: PROPERTY_TYPES.COLOR,
    name: PROPERTY_NAMES.BORDER_COLOR,
    getValue: (shape) => shape.borderColor,
    setValue: (shape, value) => { shape.borderColor = value.toString(); },
  }),
};