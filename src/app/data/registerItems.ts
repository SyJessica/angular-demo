import { RegisterItem } from '../businessTypes/regitsterItem';

export const registerItems: RegisterItem[] = [
  {
    title: '输入框',
    id: 0,
    isRequired: false,
    type: 0,
    maxLength: 0,
    isMultiSelect: false,
    optionItems: [],
    height: 1,
    relateRule: {
      relatedComponentId: 0,
      relatedOptionsId: [],
    },
  },
  {
    title: '选择框',
    id: 1,
    isRequired: false,
    type: 1,
    maxLength: 0,
    isMultiSelect: false,
    optionItems: [],
    height: 1,
    relateRule: {
      relatedComponentId: 0,
      relatedOptionsId: [],
    },
  },
  {
    title: '日期框',
    id: 2,
    isRequired: false,
    type: 2,
    maxLength: 0,
    isMultiSelect: false,
    optionItems: [],
    height: 1,
    relateRule: {
      relatedComponentId: 0,
      relatedOptionsId: [],
    },
  },
];
