<template>
  <div >
    <h1>{{data.title}}</h1>
    <p>{{data.text}}</p>
    <div class="answers">
      <x-answer v-for="(answer, index) in data.answers" 
        :selected="selectedIndex==index" 
        @click.native="select(index)"
        
        :key="index" :class="answerClasses(index)">{{answer.text}}</x-answer>
        <p><small>Choose one</small></p>

    </div>

    <a class="btn" @click="check" href="javascript:void(0)">
      Check
    </a>
  </div>
</template>

<script>
  import Answer from './answer.vue';

  export default {
    props: {
      data: Object,
      current: Boolean
    },
    computed:
    {
      correctAnswer()
      {
        return this.data.answers.findIndex((a) => a.correct);
      },
    },
    methods: {
      select(index) {
        this.selectedIndex = index;
      },
      answerClasses(index)
      {
        if (!this.ended) return;
        if (this.correctAnswer == index)
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
        if (this.selectedIndex == -1) return;
        if (this.selectedIndex == this.data.answers.findIndex((a) => a.correct))
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
        selectedIndex: -1,
        ended: false
      }
    },
    components: {
      'x-answer': Answer
    },
    name: 'x-question'
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