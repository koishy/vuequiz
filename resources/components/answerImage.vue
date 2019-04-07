<template>
  <div :class="answerClass">
    <div class="bg" :style="`background: ${bg}`"></div>

    <div class="text">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      selected: Boolean,
      bg: String
    },
    computed: {
      markClass()
      {
        if (this.selected)
        {
          return "mark selected";
        }
        return "mark";
      },
      answerClass()
      {
        if (this.selected)
        {
          return 'x-answer selected'
        }
        return 'x-answer';
      }
    },
    name: 'x-answer-image'
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bg 
  {
    width: 100px;
    height: 100px;


    background-size: 100% !important;
    background-repeat: no-repeat !important;
    background-position: center center;
  }
  .x-answer.selected
  {
    border-color: #1565C0;
  }

  .bullet
  {
    width: 1px;
    height: 10px;
    width: 10px;
    border-radius: 2px;
  }

  .x-answer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: 0.3s all;
    cursor: pointer;
    align-items: center;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .text {
    padding: 0 10px;
  }
</style>