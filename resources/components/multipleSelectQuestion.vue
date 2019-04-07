<template>
  <div>
    <h1>{{data.title}}</h1>
    <p>{{data.text}}</p>
    <div class="answers">
      <x-answer v-for="(answer, index) in data.answers" 
        :selected="selected.indexOf(index)!=-1" 
        @click.native="select(index)"
        
        :key="index" :class="answerClasses(index)">{{answer.text}}</x-answer>
        <p><small>Choose multiple</small></p>
    </div>

    <a class="btn" @click="check" href="javascript:void(0)">
      Check
    </a>
  </div>
</template>

<script>
  import Answer from './answer.vue';
  import _ from 'lodash';

  export default {
    props: {
      data: Object
    },
    computed:
    {
      correctAnswers()
      {
        return _.keys(_.pickBy(this.data.answers, (a) => a.correct));
      },
    },
    methods: {
      select(index) {
        if (this.selected.indexOf(index) == -1)
          this.selected.push(index);
        else
          this.selected.splice(this.selected.indexOf(index), 1);
      },
      
      answerClasses(index)
      {
        if (!this.ended) return;
        if (this.correctAnswers.indexOf(""+index) != -1)
        {
          return 'answer right';
        }
        else
        {
          return 'answer wrong'
        }
      },
      check()
      {
        if (this.selected == []) return;
        if (_.isEqual(_.sortBy(_.map(this.selected, (a) => a.toString())), this.correctAnswers))
        {
          this.$emit('guess');
        }
        else
        {
          this.ended = true;
          this.$emit('wrong');
        }
      }
    },
    data() {
      return {
        selected: [],
        ended: false
      }
    },
    components: {
      'x-answer': Answer
    },
    name: 'x-multiple-question'
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .answers .x-answer {
    margin-bottom: 10px;
  }
  .wrong
  {
    color: crimson;
    border-color: crimson;
  }
  .right
  {
    border-color: green;
    color: green;
  }
</style>