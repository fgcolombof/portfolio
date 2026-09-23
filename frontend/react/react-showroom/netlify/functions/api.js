const db = {
  posts: [
    { id: 1, title: "First Post" },
    { id: 2, title: "About me" },
    { id: 3, title: "First React Post" },
    { id: 4, title: "First Node Post" },
    { id: 5, title: "First Python Post" },
    { id: 6, title: "First Java Post" },
    { id: 7, title: "Java and Spring Boot Post" }
  ],
  users: [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Linda Morton" },
    { id: 3, name: "Patrick Carter" },
    { id: 4, name: "Mary Johnson" },
    { id: 5, name: "Michael Brown" }
  ],
  products: [
    { id: 1, name: "Wireless Headphones", category: "Electronics" },
    { id: 2, name: "Ergonomic Desk Chair", category: "Furniture" },
    { id: 3, name: "Stainless Steel Water Bottle", category: "Accessories" },
    { id: 4, name: "Mechanical Keyboard", category: "Electronics" },
    { id: 5, name: "Laptop Base", category: "Accessories" },
    { id: 6, name: "Optical Mouse", category: "Electronics" }
  ],
  quiz: {
    title: "General Knowledge & Tech Quiz 🧠",
    content: [
      {
        id: 1,
        question: "What is the primary color result of mixing Blue and Yellow?",
        options: ["Green", "Purple", "Orange", "Brown"],
        answer: "Green"
      },
      {
        id: 2,
        question: "What does HTML stand for in web development?",
        options: [
          "High Text Markup Language",
          "HyperText Markup Language",
          "Hyperlink and Text Management Language",
          "Home Tool Markup Language"
        ],
        answer: "HyperText Markup Language"
      },
      {
        id: 3,
        question: "What is the square root of 81?",
        options: ["7", "8", "9", "10"],
        answer: "9"
      },
      {
        id: 4,
        question: "Which hook is used in React to handle side effects?",
        options: ["useState", "useContext", "useReducer", "useEffect"],
        answer: "useEffect"
      },
      {
        id: 5,
        question: "How many planets are in our Solar System?",
        options: ["7", "8", "9", "10"],
        answer: "8"
      }
    ]
  }
};

exports.handler = async (event, context) => {
  const pathParts = event.path.split("/").filter(Boolean);
  const resource = pathParts[pathParts.length - 1];

  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type"
  };

  if (db[resource]) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(db[resource])
    };
  }

  return {
    statusCode: 404,
    headers,
    body: JSON.stringify({ error: "Resource not found" })
  };
};
