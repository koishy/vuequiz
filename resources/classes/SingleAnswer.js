var Answer = require('./Answer.js');

export default class SingleAnswer extends Answer
{
  constructor(text, correct)
  {
    super(text, correct);
    this.type = 'single';
  }
}