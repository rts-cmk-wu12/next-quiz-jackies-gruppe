"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState(null);
  const [amount, setAmount] = useState(10);
  const [difficulty, setDifficulty] = useState('medium'); 
  const [type, setType] = useState('multiple'); 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://opentdb.com/api_category.php');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCategories(data.trivia_categories);
      } catch (err) {
        setErrorCategories('Failed to fetch categories');
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  if (loadingCategories) return <div>Loading categories...</div>;
  if (errorCategories) return <div>{errorCategories}</div>;

  return (
    <div>
      <h1>Trivia Categories</h1>
      <label>
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>
      <label>
        Difficulty:
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>
      <label>
        Type:
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="multiple">Multiple Choice</option>
          <option value="boolean">True/False</option>
        </select>
      </label>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <Link href={`/trivia/${category.id}?amount=${amount}&difficulty=${difficulty}&type=${type}`}>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}






