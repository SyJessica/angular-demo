import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { defaultQn } from 'src/app/businessTypes/questionnaireInfo';
import { statusList } from 'src/app/data/column';

import { formatDate } from '@angular/common';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.less']
})
export class EditModalComponent implements OnInit, OnChanges {

  @Input() isVisible = false
  @Input() editQuestionnaire = defaultQn
  @Output() closeModal = new EventEmitter<boolean>()

  optionList = statusList
  editForm: FormGroup = this.fb.group({
    topic: ['', Validators.required],
    timeRange: [[], Validators.required],
    status: [''],
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    
  }

  ngOnChanges(): void {
    let startTime = new Date(this.editQuestionnaire.startTime)
    let endTime = new Date(this.editQuestionnaire.endTime)
    this.editForm = this.fb.group({
      topic: [this.editQuestionnaire.topic, Validators.required],
      timeRange: [[startTime, endTime], Validators.required],
      status: [this.editQuestionnaire.status],
    })
  }

  edit(): void {
    this.editQuestionnaire.topic = this.editForm.value.topic
    this.editQuestionnaire.startTime = formatDate(this.editForm.value.timeRange[0], 'yyyy-MM-dd hh:mm:ss', 'zh-ZN')
    this.editQuestionnaire.endTime = formatDate(this.editForm.value.timeRange[1], 'yyyy-MM-dd hh:mm:ss', 'zh-ZN')
    this.editQuestionnaire.status = this.editForm.value.status
    this.isVisible = false
    this.closeModal.emit(this.isVisible)
    this.editForm.reset()
  }

  cancel(): void {
    this.isVisible = false
    this.closeModal.emit(this.isVisible)
    this.editForm.reset()
  }
}
