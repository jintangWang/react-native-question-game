import {questionList} from '../data/questions';

export function getQuestions() {
    let questions = [], randoms = [], loaders = [];
    let count = 0;

    while (count < 10) {
        let random = parseInt(Math.random() * questionList.length);
        if (randoms.indexOf(random) === -1) {
            questions.push(questionList[random]);
            randoms.push(random);
            count++;
        }
    }
    return questions;
}