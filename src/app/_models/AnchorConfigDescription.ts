export interface AnchorConfigDescription {
  configName: string;
  defaultValues: Array<any>;
  inputType: ConfigInputType;
}

export enum ConfigInputType {
  INTEGER = 'int',
  DOUBLE = 'double',
  STRING = 'string',
  ARRAY = 'array',
}
