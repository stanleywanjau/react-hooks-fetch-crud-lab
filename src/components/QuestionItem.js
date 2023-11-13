import React from "react";

function QuestionItem({ question , onDelete,onUpdate}) {
  const { id, prompt, answers, correctIndex } = question;


  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleUpdate(e) {
    const updatedCorrectIndex = parseInt(e.target.value, 10);

    // Update the correctIndex on the server using PATCH request
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: updatedCorrectIndex,
      }),
    })
      .then((res) => res.json())
      .then((updatedQuestion) => {
        // Update the state with the new question data
        onUpdate(updatedQuestion);
      })
      .catch((error) => {
        console.error("Error updating question:", error);
        // You might want to handle this error in your UI
      });
  }
  function handleDelete(e) {
        fetch( `http://localhost:4000/questions/${question.id}`,{
      method:"DELETE",
    })
    .then((res)=>res.json)
    .then(()=>onDelete(question));
  }
 

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleUpdate}  defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
