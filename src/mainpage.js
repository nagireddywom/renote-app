import React, { useState } from 'react';
import './mainpage.css'; // Import the CSS file

function BookRecycling() {
  // ... (state management and functions remain the same)
  const [usedBooks, setUsedBooks] = useState([]);
  const [recycledBooks, setRecycledBooks] = useState([]);
  const [newBookTitle, setNewBookTitle] = useState('');

  const handleAddUsedBook = () => {
    if (newBookTitle.trim() !== '') {
      setUsedBooks([...usedBooks, newBookTitle.trim()]);
      setNewBookTitle(''); // Clear input field
    }
  };

  const handleRecycleBook = (index) => {
    const bookToRecycle = usedBooks[index];
    setUsedBooks(usedBooks.filter((_, i) => i !== index));
    setRecycledBooks([...recycledBooks, bookToRecycle]);
  };


  return (
    <div className="book-recycling-container">
      <h1>Book Recycling</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter book title"
          value={newBookTitle}
          onChange={(e) => setNewBookTitle(e.target.value)}
        />
        <button onClick={handleAddUsedBook} className="add-button">Add Book</button>
      </div>

      <div className="lists-container">
        <div className="book-list">
          <h2>Used Books</h2>
          {usedBooks.length === 0 ? (
            <p>No used books added yet.</p>
          ) : (
            <ul>
              {usedBooks.map((book, index) => (
                <li key={index}>
                  {book}
                  <button onClick={() => handleRecycleBook(index)} className="recycle-button">
                    Recycle
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="book-list">
          <h2>Recycled Books</h2>
          {recycledBooks.length === 0 ? (
            <p>No books recycled yet.</p>
          ) : (
            <ul>
              {recycledBooks.map((book, index) => (
                <li key={index}>{book}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookRecycling;