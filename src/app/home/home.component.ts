import { Component, OnInit } from '@angular/core';
import { questionnaireList } from 'src/app/data/column';
import { QuestionnaireInfo, defaultQn } from '../businessTypes/questionnaireInfo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  qnList = questionnaireList
  qn = defaultQn

  constructor() { }

  ngOnInit(): void {

  }

  addQnToList(qn: QuestionnaireInfo): void {
    this.qn = {...qn}
    this.qnList.push(this.qn)
    this.qnList = [...this.qnList]
  }

}
