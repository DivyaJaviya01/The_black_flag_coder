// Example of using the query classifier as a module
const { initializeCategoryEmbeddings, classifyQuery } = require('./query-classifier');

async function testClassifier() {
  try {
    // Initialize category embeddings
    const categoryEmbeddings = await initializeCategoryEmbeddings();
    
    // Test queries
    const testQueries = [
      "I want to learn about Digital Marketing",
      "How do black holes work?",
      "What is the capital of France?",
      "I'm interested in fashion design",
      "Explain the theory of relativity",
      "How to balance a budget?",
      "Tell me about Renaissance art"
    ];
    
    console.log('Testing multiple queries:\n');
    
    for (const query of testQueries) {
      const result = await classifyQuery(query, categoryEmbeddings);
      console.log(`Query: "${query}"`);
      console.log(`Category: ${result.category} (Score: ${result.score.toFixed(4)})`);
      console.log('---');
    }
  } catch (error) {
    console.error('Error testing classifier:', error);
  }
}

// Run the test if this file is executed directly
if (require.main === module) {
  // Check if API key is set
  if (!process.env.OPENAI_API_KEY) {
    console.error('Please set the OPENAI_API_KEY environment variable');
    process.exit(1);
  }
  
  testClassifier();
}