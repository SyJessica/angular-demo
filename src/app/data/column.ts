import { QuestionnaireInfo } from "../businessTypes/questionnaireInfo";

export const questionnaireList: QuestionnaireInfo[] = [
  {
    id: 10,
    topic: '行政满意度调查',
    vote: 100,
    startTime: '2022-08-01 12:00:00',
    endTime: '2022-09-01 12:00:00',
    status: 'beforePublish'
  },
  {
    id: 11,
    topic: '活动满意度调查',
    vote: 200,
    startTime: '2022-08-30 12:00:00',
    endTime: '2022-09-30 12:00:00',
    status: 'published'
  },
]

export const statusList: any[] = [
  {
    label: '未发布',
    value: 'beforePublish'
  },
  {
    label: '发布中',
    value: 'published'
  },
  {
    label: '已截止',
    value: 'end'
  }
]