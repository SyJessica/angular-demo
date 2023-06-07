import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionnaireInfo, defaultQn } from 'src/app/businessTypes/questionnaireInfo';
import { statusList } from 'src/app/data/column';

import * as _ from 'lodash'
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.less']
})
export class CreateModalComponent implements OnInit {

  @Output() createQn = new EventEmitter<QuestionnaireInfo>()

  isVisible = false

  newQuestionnaire = defaultQn
  optionList = statusList

  createForm: FormGroup = this.fb.group({
    topic: ['', Validators.required],
    timeRange: [[], Validators.required],
    status: [''],
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    
  }

  showCreateModal(): void {
    this.isVisible = true
  }

  create(): void {
    this.newQuestionnaire.id = _.random(1000)
    this.newQuestionnaire.topic = this.createForm.value.topic
    this.newQuestionnaire.startTime = formatDate(this.createForm.value.timeRange[0], 'yyyy-MM-dd hh:mm:ss', 'zh-ZN')
    this.newQuestionnaire.endTime = formatDate(this.createForm.value.timeRange[1], 'yyyy-MM-dd hh:mm:ss', 'zh-ZN')
    this.newQuestionnaire.status = this.createForm.value.status
    this.createQn.emit(this.newQuestionnaire)
    this.isVisible = false
    this.createForm.reset()
  }

  cancel(): void {
    this.isVisible = false
  }

}
