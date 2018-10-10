import { Injectable } from '@angular/core';
import { Question } from '../models/question';
@Injectable()
export class QuestionService {
  questionlist: Question[] = [
{question: 'Qtn 9',
questionType: 'CHK',
questionMandatory: true,
questionStatus: 'A',
answerOptions: ['Sunday', 'Monday', 'Friday']
},
{
question: 'Which is your favourite team',
questionType: 'OPT',
questionMandatory: true,
questionStatus: 'A',
answerOptions: ['Real Madrid', 'Barcelona', 'Juventus']
},
];
getQuestions() {
 return this.questionlist;
}
saveQuestion(question: Question) {
  this.questionlist.push(question);
}
}
