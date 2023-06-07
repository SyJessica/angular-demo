export interface QuestionnaireInfo {
  id: number
  topic?: string
  vote?: number
  startTime: string
  endTime: string
  status?: string
}

export const defaultQn: QuestionnaireInfo = {
  id: 0,
  topic: '',
  vote: 0,
  startTime: '',
  endTime: '',
  status: ''
}