import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Question } from '../question';
import { QuestionService } from '../question.service';
import { Usercredentials } from '../usercredentials';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  questions:Question[]=[];
  //this is used to keep track of current question the user is attempting
  public currentQuestion:any=1;
  public name:string="";
  public points:number=0;
  public timer:number=60;
  correctAnswer:number=0;
  interval$:any;
  progress:string="0";

  constructor(private questionService:QuestionService) { }

  ngOnInit(): void {
    this.startCounter();
    this.name=localStorage.getItem("name")!;
    this.questionService.getAllQuestions("prg").subscribe((data)=>{
      console.log(data);
      this.questions=data;
    });
  }
  previousQuestion(){
    this.currentQuestion--;
  }
  nextQuestion(){
    this.currentQuestion++;
    
    this.resetCounter();
  }
  answer(currentQuestion:any,option:string){
    if (option==this.questions[currentQuestion].answer){
      this.correctAnswer+=10;
      currentQuestion++;
    }
    else{
      this.correctAnswer+=0;
      currentQuestion++;
    }
  }
  startCounter(){
    this.interval$=interval(1000)
    .subscribe(val=>{
      this.timer--;
      if(this.timer===0){
        this.timer=60;
        this.currentQuestion++;
        this.points+=0;
      }
    });
    setTimeout(()=>{
      this.interval$.unsubscribe();
    },600000);
  }

  stopCounter(){
    this.interval$.unsubscribe();
    this.timer=0;
  }

  resetCounter(){
    this.stopCounter();
    this.timer = 60;
    this.startCounter();
  }
  getProgressPercent(){
    this.progress=(((this.currentQuestion)/(this.questions.length))*100).toString();
  }
}
