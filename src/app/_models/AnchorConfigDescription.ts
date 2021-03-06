export interface AnchorConfigDescription {
  configName: string;
  value: any;
  inputType: ConfigInputType;
}

type ConfigInputType = 'INTEGER' | 'DOUBLE' | 'STRING';
export const ConfigInputType = {
  INT: 'INTEGER' as ConfigInputType,
  DOUBLE: 'DOUBLE' as ConfigInputType,
  STRING: 'STRING' as ConfigInputType
};
