import { useEffect, useState } from "react";
import React from "react";
import QuestionItem from "./QuestionItem"
import QuestionForm from "./QuestionForm";

function QuestionList() {
  const [quizs,setQuiz]=useState([])
  useEffect(()=>{
    fetch(" http://localhost:4000/questions")
    .then((res)=>res.json())
    .then((data)=>setQuiz(data))
  },[])
 function handleSubmit(newQuiz){
  setQuiz([...quizs,newQuiz])
 }
 function handleDelete(deleted){
  const updatedItems = quizs.filter((quiz) => quiz.id !== deleted.id);
  setQuiz(updatedItems);
  }
  
  function handleUpdate(updatedQuestion) {
    // Update the state with the new question data
    setQuiz((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === updatedQuestion.id ? updatedQuestion : question
      )
    );
  }
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{quizs.map((quiz)=>{
        return <QuestionItem key={quiz.id} question={quiz} onDelete={handleDelete} onUpdate={handleUpdate}/>
      })}</ul>
      <QuestionForm onSubmit={handleSubmit}/>
    </section>
  );
}

export default QuestionList;
