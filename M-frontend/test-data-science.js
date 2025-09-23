const { classifyQuery } = require('./simple-query-classifier.js');

async function testDataScienceQueries() {
  const testQueries = [
    "I want to learn about Data Science",
    "What is machine learning?",
    "How to become a data analyst?",
    "Tell me about artificial intelligence careers",
    "I'm interested in computer science",
    "What jobs are available in data science?",
    "How do I start a career in AI?",
    "What skills do I need for machine learning?"
  ];

  console.log('Testing Data Science related queries:\n');

  for (const query of testQueries) {
    try {
      const result = await classifyQuery(query);
      
      if (result) {
        console.log(`Query: "${query}"`);
        console.log(`  Category: ${result.category}`);
        console.log(`  Method: ${result.method}`);
        if (result.score !== undefined) {
          console.log(`  Confidence: ${(result.score * 100).toFixed(2)}%`);
        }
        console.log('---');
      } else {
        console.log(`Query: "${query}" - Could not classify`);
        console.log('---');
      }
    } catch (error) {
      console.error(`Error classifying "${query}":`, error.message);
      console.log('---');
    }
  }
}

// Run the test
testDataScienceQueries();