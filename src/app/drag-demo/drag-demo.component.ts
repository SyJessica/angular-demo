import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  copyArrayItem,
} from '@angular/cdk/drag-drop';
import * as _ from 'lodash';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  RegisterItem,
  RegisterType,
  RelatedInfo,
  SelectOption,
} from '../businessTypes/regitsterItem';
import { registerItems } from '../data/registerItems';
import { getItem, setItem } from '../functions/data-base';
import { FormGroup } from '@angular/forms';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-drag-demo',
  templateUrl: './drag-demo.component.html',
  styleUrls: ['./drag-demo.component.less'],
})
export class DragDemoComponent implements OnInit {
  @ViewChild('editForm') editForm?: FormGroup;
  @ViewChild('infoForm') infoForm?: FormGroup;
  registerItems = registerItems;
  registerType = RegisterType;

  registerList: RegisterItem[][] = [[]];
  relatedComponentList: RegisterItem[] = [];
  relatedOptionsList: SelectOption[] = [];

  hoveredOption = {} as SelectOption;

  selectedItem = {} as RegisterItem;
  selectedId: number = -1;

  drawerVisible: boolean = false;
  createIndex: number = -1;
  startCreate: boolean = false;

  registerData = {} as any;

  dataKey = 'RegisterItem';

  constructor() {}

  addColumn() {
    this.registerList.push([]);
    setItem(this.dataKey, this.registerList);
  }

  deleteColumn() {
    if (this.registerList.length < 2) {
      return;
    }
    this.registerList.pop();
    setItem(this.dataKey, this.registerList);
  }

  ngOnInit(): void {
    this.selectedItem.relateRule = {} as RelatedInfo;
    this.registerList = getItem(this.dataKey);
    this.registerList?.flat()?.forEach((m) => {
      this.registerData[m.id] = null;
    });
    console.log(uuid());
  }

  selectItem(item: RegisterItem) {
    if (this.selectedItem !== item) this.drawerVisible = false;
    this.relatedComponentList = this.registerList
      ?.flat()
      ?.filter((m) => m.type === RegisterType.Select && m.id !== item.id);

    if (item.relateRule?.relatedComponentId) {
      this.relatedOptionsList =
        this.registerList
          ?.flat()
          ?.find((m) => m.id === item.relateRule.relatedComponentId)
          ?.optionItems || [];
    } else {
      this.relatedOptionsList = [];
    }
    this.selectedId = item.id;

    setTimeout(() => {
      if (this.selectedItem !== item) {
        this.drawerVisible = true;
      }
      this.selectedItem = item;
    }, 200);
    // console.log(this.registerList);
  }

  drop(event: CdkDragDrop<any[]>, target: RegisterItem[]) {
    if (event.previousContainer === event.container) {
      // 本列拖拽排序
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else if (event.previousContainer.id === 'cdk-drop-list-0') {
      // 创建自定义组件
      const registerItems = _.cloneDeep(this.registerItems);
      copyArrayItem(
        registerItems,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      target[event.currentIndex].id = Date.now();
      this.selectedId = target[event.currentIndex].id;
      this.selectedItem = target[event.currentIndex];
      this.drawerVisible = true;
      this.startCreate = false;
    } else {
      // 编辑区跨列拖拽
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    setItem(this.dataKey, this.registerList);
  }

  noReturnPredicate() {
    return false;
  }

  // 创建组件开始拖拽
  startCopy(index: any) {
    this.startCreate = true;
    this.createIndex = index;
  }

  // 结束创建或创建成功
  endCopy() {
    this.startCreate = false;
  }

  // 删除自定义组件
  removeItem(list: RegisterItem[], index: number) {
    list.splice(index, 1);
    setItem(this.dataKey, this.registerList);
    this.drawerVisible = false;
  }

  // 新增自定义选项
  addOption() {
    const option: SelectOption = {
      id: Date.now(),
      label: '默认选项',
    };
    this.selectedItem.optionItems.push(option);
    this.updateList();
  }

  // 删除自定义选项
  removeOption(index: number, id: number) {
    this.selectedItem.optionItems.splice(index, 1);
    this.registerList?.forEach((list) => {
      list?.forEach((item) => {
        if (item.relateRule.relatedOptionsId.length) {
          item.relateRule.relatedOptionsId =
            item.relateRule.relatedOptionsId.filter((m) => m !== id);
        }
      });
    });
    this.updateList();
  }

  // 自定义选项拖拽排序
  optionDrop(event: CdkDragDrop<any[]>) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
    this.updateList();
  }

  hoverOption(item: SelectOption) {
    this.hoveredOption = item;
  }

  unHoverOption() {
    this.hoveredOption = {} as SelectOption;
  }

  updateList() {
    setItem(this.dataKey, this.registerList);
  }

  // 手动关闭抽屉回调
  closeDrawer() {
    this.drawerVisible = false;
    this.selectedItem = {} as RegisterItem;
    this.selectedItem.relateRule = {} as RelatedInfo;
    this.selectedId = -1;
  }

  submit() {
    for (const i in this.infoForm?.controls) {
      this.infoForm?.controls[i].markAsDirty();
      this.infoForm?.controls[i].updateValueAndValidity();
    }
    console.log('form invalid:', this.infoForm?.invalid);
    console.log(this.registerData);
  }

  /******  关联关系逻辑处理 ******/

  // 重新选择关联组件时更新关联选项列表
  relatedComponentChange() {
    if (!this.selectedItem.relateRule.relatedComponentId) {
      this.selectedItem.relateRule.relatedComponentId = 0;
    }
    this.selectedItem.relateRule.relatedOptionsId = [];
    this.relatedOptionsList =
      this.registerList
        ?.flat()
        ?.find((m) => m.id === this.selectedItem.relateRule.relatedComponentId)
        ?.optionItems || [];
    this.updateList();
  }

  // 根据表单填写数据判断关联的子组件是否展示，参数为子组件
  showRelatedItem(item: RegisterItem) {
    const dataMap = new Map(Object.entries(this.registerData));
    if (
      dataMap.has(item.relateRule.relatedComponentId.toString()) &&
      item.relateRule.relatedOptionsId.length
    ) {
      const parentItem = this.registerList
        ?.flat()
        ?.find((m) => m.id === item.relateRule.relatedComponentId);
      const parentData: any = dataMap.get(
        item.relateRule.relatedComponentId.toString()
      );
      if (parentItem?.isMultiSelect) {
        let isShow = false;
        // 遍历子组件的关联选项，并判断父组件已选择项是否包含该关联选项
        item.relateRule.relatedOptionsId?.forEach((m) => {
          if (parentData?.some((id: number) => id === m)) {
            isShow = true;
          }
        });
        return isShow;
      } else {
        return item.relateRule.relatedOptionsId.some((m) => m === parentData);
      }
    }

    return false;
  }

  // 表单填写数据变化（目前父组件只能为选择框），触发关联的子组件隐藏时，清空子组件内填写的数据，参数为父组件
  updateFormData(item: RegisterItem) {
    // 先获取所有关联到该组件的子组件
    const childrenList: RegisterItem[] = [];
    this.registerList?.flat()?.forEach((m) => {
      if (m.relateRule.relatedComponentId === item.id) {
        childrenList.push(m);
      }
    });

    if (!childrenList.length) {
      return;
    }

    // 再取父组件勾选的选项，并根据选择框是否支持多选分情况处理
    const itemData = this.registerData[item.id];
    if (item.isMultiSelect) {
      childrenList.forEach((m) => {
        let isShow = false;
        // 遍历子组件的关联选项，并判断父组件已选择项是否包含该关联选项
        m.relateRule.relatedOptionsId?.forEach((optionId) => {
          if (itemData?.some((id: number) => id === optionId)) {
            isShow = true;
          }
        });
        if (!isShow) {
          this.registerData[m.id] = null;
        }
      });
    } else {
      childrenList.forEach((m) => {
        if (!m.relateRule.relatedOptionsId?.some((id) => id === itemData)) {
          this.registerData[m.id] = null;
        }
      });
    }
  }
}
