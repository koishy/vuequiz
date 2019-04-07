<template>
  <div class="x-notification" :style="style">
    <div class="au-container controls">
      <div>
        <h1>{{title}}</h1>
        <slot></slot>
      </div>
      <div>
        <div class="btn" @click="$emit('next')">Continue</div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'x-notification',
    props: {
      title: String,
      right: Boolean
    },
    computed: {
      style()
      {
        if (this.right)
        {
          return 'background: rgb(107, 180, 23);';
        }

        return 'background: rgb(180, 41, 23)';
      }
    }
  }
</script>

<style scoped>
  .x-notification {
    position: fixed;
    width: 100%;
    bottom: 0;
    height: 150px;
    /* background: rgb(180, 41, 23) rgb(163, 52, 74); */
    
    color: rgba(0, 0, 0, 0.6);
  }

  .x-notification h1 {
    color: rgba(0, 0, 0, 0.7);
    margin-bottom: 20px;
  }

  .btn {
    border: 2px solid rgba(0, 0, 0, 0.7);
    background: none;
    color: rgba(0, 0, 0, 0.7);
  }

  .controls {
    font-size: 1.5em;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>