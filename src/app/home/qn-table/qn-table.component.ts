import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuestionnaireInfo, defaultQn } from 'src/app/businessTypes/questionnaireInfo';  
import { NzModalService } from 'ng-zorro-antd/modal';                                                                                                                                                                                     

@Component({
  selector: 'app-qn-table',
  templateUrl: './qn-table.component.html',
  styleUrls: ['./qn-table.component.less']
})
export class QnTableComponent implements OnInit {

  @Input() tableList!: QuestionnaireInfo[]
  @Output() removeQn = new EventEmitter<QuestionnaireInfo[]>()

  showEditModal = false
  editThis = defaultQn

  constructor(private modal: NzModalService) { }

  ngOnInit(): void {
  }

  edit(data: QuestionnaireInfo): void {
    this.editThis = data
    this.showEditModal = true
  }

  removeAt(index: number, data: QuestionnaireInfo): void {
    this.modal.confirm({
      nzContent: `确认删除问卷 <b>${data.topic}</b> ？`,
      nzOkText: '删除',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzCentered: true,
      nzOnOk: () => {
        this.tableList.splice(index, 1)
        this.tableList = [...this.tableList]
      },
      
      nzCancelText: '取消'
    })
  }

  closeEditModal(isVisible: boolean): void {
    this.showEditModal = isVisible
  }

}
