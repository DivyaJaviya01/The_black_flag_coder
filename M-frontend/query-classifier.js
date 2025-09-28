const OpenAI = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // Make sure to set your API key in environment variables
});

// Predefined categories with representative keywords
const CATEGORIES = {
  science: ["science", "physics", "chemistry", "biology", "mathematics", "computer science"],
  commerce: ["commerce", "accounting", "finance", "business", "economics", "marketing"],
  arts: ["arts", "history", "literature", "philosophy", "psychology", "political science"],
  vocational: ["vocational", "diploma", "mechanic", "fashion design", "hotel management", "skilled trade"]
};

// Function to calculate cosine similarity between two vectors
function cosineSimilarity(vecA, vecB) {
  if (vecA.length !== vecB.length) {
    throw new Error('Vectors must have the same length');
  }

  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    magnitudeA += vecA[i] * vecA[i];
    magnitudeB += vecB[i] * vecB[i];
  }

  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);

  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }

  return dotProduct / (magnitudeA * magnitudeB);
}

// Function to get embeddings for an array of texts
async function getEmbeddings(texts) {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: texts
    });

    return response.data.map(item => item.embedding);
  } catch (error) {
    console.error('Error getting embeddings:', error);
    throw error;
  }
}

// Function to initialize category embeddings
async function initializeCategoryEmbeddings() {
  console.log('Initializing category embeddings...');
  
  const categoryEmbeddings = {};
  
  // Get embeddings for each category's keywords
  for (const [category, keywords] of Object.entries(CATEGORIES)) {
    console.log(`Processing ${category} keywords...`);
    const embeddings = await getEmbeddings(keywords);
    // Average the embeddings to get a single representative vector for the category
    const avgEmbedding = new Array(embeddings[0].length).fill(0);
    embeddings.forEach(embedding => {
      embedding.forEach((value, index) => {
        avgEmbedding[index] += value;
      });
    });
    avgEmbedding.forEach((value, index) => {
      avgEmbedding[index] = value / embeddings.length;
    });
    
    categoryEmbeddings[category] = avgEmbedding;
  }
  
  console.log('Category embeddings initialized.');
  return categoryEmbeddings;
}

// Function to classify a user query
async function classifyQuery(query, categoryEmbeddings) {
  console.log(`Classifying query: "${query}"`);
  
  // Get embedding for the user query
  const [queryEmbedding] = await getEmbeddings([query]);
  
  // Calculate similarity scores with each category
  const similarityScores = {};
  for (const [category, embedding] of Object.entries(categoryEmbeddings)) {
    similarityScores[category] = cosineSimilarity(queryEmbedding, embedding);
  }
  
  // Find the category with the highest similarity score
  let bestCategory = null;
  let highestScore = -Infinity;
  
  for (const [category, score] of Object.entries(similarityScores)) {
    if (score > highestScore) {
      highestScore = score;
      bestCategory = category;
    }
  }
  
  return {
    category: bestCategory,
    score: highestScore,
    allScores: similarityScores
  };
}

// Main function to run the classifier
async function runClassifier() {
  try {
    // Initialize category embeddings
    const categoryEmbeddings = await initializeCategoryEmbeddings();
    
    // Example usage
    const exampleQuery = "I want to learn about Digital Marketing";
    const result = await classifyQuery(exampleQuery, categoryEmbeddings);
    
    console.log('\n--- Classification Result ---');
    console.log(`Query: "${exampleQuery}"`);
    console.log(`Detected Category: ${result.category}`);
    console.log(`Similarity Score: ${result.score.toFixed(4)}`);
    console.log('All Scores:');
    for (const [category, score] of Object.entries(result.allScores)) {
      console.log(`  ${category}: ${score.toFixed(4)}`);
    }
  } catch (error) {
    console.error('Error in classifier:', error);
  }
}

// Run the classifier if this file is executed directly
if (require.main === module) {
  // Check if API key is set
  if (!process.env.OPENAI_API_KEY) {
    console.error('Please set the OPENAI_API_KEY environment variable');
    process.exit(1);
  }
  
  runClassifier();
}

// Export functions for use in other modules
module.exports = {
  initializeCategoryEmbeddings,
  classifyQuery,
  cosineSimilarity
};