<template>
  <div :class="answerClass">
    <div :class="markClass">
      <div class="mdi mdi-check"></div>
      <!-- <div class="bullet"></div> -->
    </div>

    <div class="text">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
      text: String,
      selected: Boolean
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
    name: 'x-answer'
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .mark {
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    text-align: center;
    
    color: transparent;
    background: rgba(0,0,0,0.2);
    border-radius: 3px;
    transition: .2s all;
  }

  .mark.selected
  {
    background: rgba(21, 101, 192, 0.767);
    color: #fff;
  }
  .x-answer.selected
  {
    box-shadow: 0 5px 10px rgba(0,0,0,0.05);
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