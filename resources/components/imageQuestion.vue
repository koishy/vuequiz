<template>
  <div class="ans-root">
    <h1>{{data.title}}</h1>
    <p>{{data.text}}</p>
    <div class="answers">
      <x-answer-image v-for="(answer, index) in data.answers" 
        :selected="selectedIndex==index" 
        :bg="answer.bg"
        @click.native="select(index)"
        :key="index" :class="answerClasses(index)">{{answer.text}}</x-answer-image>

    </div>
    <p><small>Choose one</small></p>

    <a class="btn" @click="check" href="javascript:void(0)">
      Check
    </a>
  </div>
</template>

<script>
  import Answer from './answerImage.vue';

  export default {
    props: {
      data: Object
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
      'x-answer-image': Answer
    },
    name: 'x-image-question'
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .ans-root
  {
    overflow-y: scroll;
    height: 100%;
  }
  .answers .x-answer {
    margin-bottom: 10px;
    margin-right: 10px;
  }
  .answers
  {
    display: flex;
    flex-wrap: wrap;
  }
  .answers > *
  {
    flex: 1 0 40%;
  }
  .wrong
  {
    color: crimson;
    border-color: crimson !important;
  }
  .right
  {
    border-color: green !important;
    color: green;
  }
</style>