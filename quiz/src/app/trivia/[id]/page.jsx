"use client";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Trivia() {
  const [trivia, setTrivia] = useState(null);
  const { id } = useParams();
  const searchParams = useSearchParams();

  const amount = searchParams.get('amount') || 10; 
  const difficulty = searchParams.get('difficulty') || 'Easy'; 
  const type = searchParams.get('type') || 'multiple'; 

  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=${amount}&category=${id}&difficulty=${difficulty}&type=${type}`)
      .then(response => response.json())
      .then(data => setTrivia(data.results[0]))
      .catch(error => console.error('Error fetching trivia:', error));
  }, [id, amount, difficulty, type]);

  const handleClick = (answer) => {
    if (answer === trivia.correct_answer) {
      alert("Correct!");
    } else {
      alert("Wrong!");
    }
  };

  return (
    <div className='trivia'>
      <h1>Trivia Question</h1>
      {trivia ? (
        <div className="trivia__div">
          <h2 className='trivia-question'>{trivia.question}</h2>
          <p className='trivia-category'>Category: {trivia.category}</p>
          <p className='trivia-difficulty'>Difficulty: {trivia.difficulty}</p>
          <p onClick={() => handleClick(trivia.correct_answer)} className='trivia-answer'>Answer 1: {trivia.correct_answer}</p>
          {trivia.incorrect_answers.map((answer, index) => (
            <p key={index} onClick={() => handleClick(answer)} className='trivia-answer'>Answer {index + 2}: {answer}</p>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
