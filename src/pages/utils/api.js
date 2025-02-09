// src/utils/api.js

// List of topics to choose from if no query is provided
const randomTopics = [
  'technology',
  'history',
  'science',
  'art',
  'fiction',
  'travel',
  'music',
  'philosophy',
  'nature',
  'sports'
];

export const fetchBooks = async (query, startIndex = 0) => {
  const maxResults = 10;
  // Use the provided query if it's non-empty; otherwise pick a random topic.
  const safeQuery =
    query && query.trim() !== ""
      ? query
      : randomTopics[Math.floor(Math.random() * randomTopics.length)];

  // Build the URL according to the Google Books API documentation
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    safeQuery
  )}&startIndex=${startIndex}&maxResults=${maxResults}`;

  const response = await fetch(url);
  const data = await response.json();

  // Return an object containing the items and metadata
  return {
    items: data.items || [],
    totalItems: data.totalItems || 0,
    // Include the actual query used (this can help in debugging or display)
    queryUsed: safeQuery,
  };
};

export const fetchBookById = async (id) => {
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
  const data = await response.json();
  return data;
};
