export interface RegisterItem {
  title: string;
  id: number;
  isRequired: boolean;
  type: RegisterType;
  maxLength: number;
  isMultiSelect: boolean;
  optionItems: SelectOption[];
  relateRule: RelatedInfo;
  height: number;
}

export enum RegisterType {
  Input = 0,
  Select = 1,
  DatePicker = 2,
}

export interface SelectOption {
  id: number;
  label: string;
}

export interface RelatedInfo {
  relatedComponentId: number;
  relatedOptionsId: number[];
}
