export default class Question
{
  constructor(title, text, answers)
  {
    this.data = {};
    this.data.title = title;
    this.data.text = text;
    this.data.answers = answers;
  }
}

