<template>
    <div id="rootApp" >
       
    <div id="app">
        <div class="au-container container">
            <x-quiz :questions="questions"
                @guess="guess" 
                ref="quiz"
                @wrong="wrong"
                @end="end"
                ></x-quiz>
        </div>
    </div>
    <transition name="fade"> 
        <x-notification :right="notification.right" @next="next" :title="notification.right?'Right!':'Wrong!'" v-show="notification.open">
            Press continue
        </x-notification>
    </transition>
    </div>
</template>

<script>
    import Notification from './notification.vue';
    import _ from 'lodash';
    import QuizData from '../quiz.json';
    import Question from '../classes/Question.js';
    import SingleAnswer from '../classes/SingleAnswer.js';
    import Quiz from './quiz.vue';
    var wrong = new Audio('/public/wrong.wav');
    var correct = new Audio('/public/correct.mp3');
    var end = new Audio('/public/end.wav');


    export default {
        name: 'x-app',
        components: {
            'x-quiz': Quiz, 
            'x-notification': Notification
        },
        mounted()
        {
            let self = this; 
            window.addEventListener('keyup', function(ev) {
                if (self.notification.open)
                    self.next();
            });
        },
        methods:
        {
            end()
            {
                end.play();
            },
            next()
            {
                if (!this.notification.open) return;
                if (this.notification.right == true)
                {
                    this.$refs.quiz.next();
                }
                else
                {
                    this.$refs.quiz.wrong();
                }
                this.notification.open = false;
            },
            guess()
            {
                if (this.notification.open) return;
                correct.play();
                this.notification.right = true;
                this.notification.open = true;
            },
            wrong()
            {
                if (this.notification.open) return;

                wrong.play();

                this.notification.right = false;
                this.notification.open = true;
            }
        },
        data()
        {
            return {
                "notification": {
                    "open": false,
                    "right": false,
                    "text": "Click continue"
                },
                "questions": _.shuffle(QuizData.questions)
            }
            
        }
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #app {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
    }

    .container {
        width: 100%;
        height: 70vh;
        border-radius: 5px;
        padding: 30px;
        border: 1px solid #ccc;
        box-shadow: 0 5px 60px rgba(0, 0, 0, 0.1);
        background: #fcfcfc;
    }
    .fade-enter-active, .fade-leave-active {
        transition: transform .5s;
    }
    .fade-enter, .fade-leave-to
    {
        transform: translateY(100%);
    }
</style>