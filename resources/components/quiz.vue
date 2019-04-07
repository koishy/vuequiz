<template>
  <div style="height: 100%;" >
    <component 
      v-for="(question, idx) in questions" 
      :key="idx"
      :is="question.type"
      :data="question.data"
      @guess="$emit('guess')" 
      @wrong="$emit('wrong')"
      v-show="idx == current"
      :current="idx == current"
      ></component>  

    <div v-show="end">
      <h1>Quiz ended</h1>
      <p> Score: {{Math.floor(this.score / questions.length * 100)}}%</p>
      <p> {{ message }}</p>
    </div>
  </div>
</template>

<script>
    import Question from './question.vue';
    import MultipleQuestion from './multipleSelectQuestion.vue';
    import ImageQuestion from './imageQuestion.vue';

    export default {
      props: {
        questions: Array 
      },
      data() {
        return {
          current: 0,
          score: 0
        }
      },
      mounted()
      {
        // console.log(this.questions[0].title);
        // this.questions = _.shuffle(this.questions);
      },
      computed:
      {
        end()
        {
          return this.current >= this.questions.length;
          
        },
        message()
        {
          var ratio = this.score / this.questions.length * 100;
          if (ratio <= 0)
          {
            return 'You know nothing, but you can always start!'
          }
          else if (ratio < 30)
          {
            return 'You should learn a bit more';
          } 
          else if (ratio < 50)
          {
            return 'Not bad, but you still need to learn more';
          }
          else if (ratio < 80)
          {
            return 'Very good!';
          }
          else 
          {
            return 'Impressive, keep up!';
          }
        }
      },
      methods:
      {
        next()
        {
          this.current++;
          this.score++;
          if (this.end)
          {
            this.$emit('end');
          } 
        },
        wrong()
        {
          this.current++;

          if (this.end)
          {
            this.$emit('end');
          } 
        }
      },
      name: 'x-quiz',
      components: {
        'x-question': Question,
        'x-multiple-question': MultipleQuestion,
        'x-image-question': ImageQuestion
      }
    }
</script>
