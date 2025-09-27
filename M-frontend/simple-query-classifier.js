const axios = require('axios');

// Import API configuration
const { API_CONFIG } = require('./src/config/api');

// Predefined categories with representative keywords
const CATEGORIES = {
  science: {
    keywords: ["science", "physics", "chemistry", "biology", "mathematics", "computer science"],
    description: "Science-related fields including physics, chemistry, biology, mathematics, and computer science"
  },
  commerce: {
    keywords: ["commerce", "accounting", "finance", "business", "economics", "marketing"],
    description: "Commerce-related fields including accounting, finance, business, economics, and marketing"
  },
  arts: {
    keywords: ["arts", "history", "literature", "philosophy", "psychology", "political science"],
    description: "Arts-related fields including history, literature, philosophy, psychology, and political science"
  },
  vocational: {
    keywords: ["vocational", "diploma", "mechanic", "fashion design", "hotel management", "skilled trade"],
    description: "Vocational fields including diploma courses, mechanics, fashion design, hotel management, and skilled trades"
  }
};

// Function to classify a user query using keyword matching
function classifyQueryWithKeywords(query) {
  console.log(`Classifying query: "${query}"`);
  
  // Convert query to lowercase for case-insensitive matching
  const lowerCaseQuery = query.toLowerCase();
  
  // Calculate keyword matches for each category
  const matchScores = {};
  
  for (const [category, data] of Object.entries(CATEGORIES)) {
    let matchCount = 0;
    
    // Count how many keywords from each category appear in the query
    for (const keyword of data.keywords) {
      if (lowerCaseQuery.includes(keyword)) {
        matchCount++;
      }
    }
    
    // Calculate score as percentage of keywords matched
    matchScores[category] = matchCount / data.keywords.length;
  }
  
  // Find the category with the highest match score
  let bestCategory = null;
  let highestScore = 0;
  
  for (const [category, score] of Object.entries(matchScores)) {
    if (score > highestScore) {
      highestScore = score;
      bestCategory = category;
    }
  }
  
  // If no keywords matched, return null
  if (highestScore === 0) {
    return null;
  }
  
  return {
    category: bestCategory,
    score: highestScore,
    allScores: matchScores,
    description: CATEGORIES[bestCategory].description
  };
}

// Function to classify a user query using Gemini AI
async function classifyQueryWithAI(query) {
  console.log(`Classifying query with AI: "${query}"`);
  
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_CONFIG.GOOGLE_AI_KEY}`,
      {
        contents: [{
          parts: [{
            text: `Classify the following query into one of these categories: Science, Commerce, Arts, or Vocational.
            
            Query: "${query}"
            
            Categories:
            1. Science: Physics, Chemistry, Biology, Mathematics, Computer Science
            2. Commerce: Accounting, Finance, Business, Economics, Marketing
            3. Arts: History, Literature, Philosophy, Psychology, Political Science
            4. Vocational: Diploma courses, Mechanics, Fashion Design, Hotel Management, Skilled Trades
            
            Respond ONLY with the category name (Science, Commerce, Arts, or Vocational) and nothing else.`
          }]
        }]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    const aiResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    // Extract the category from the response
    const category = aiResponse.trim();
    
    // Validate that the response is one of our categories
    const validCategories = Object.keys(CATEGORIES);
    const matchedCategory = validCategories.find(cat => 
      category.toLowerCase() === cat.toLowerCase()
    );
    
    if (matchedCategory) {
      return {
        category: matchedCategory,
        method: 'AI',
        description: CATEGORIES[matchedCategory].description
      };
    }
    
    // If AI response doesn't match our categories, fall back to keyword matching
    return classifyQueryWithKeywords(query);
  } catch (error) {
    console.error('Error classifying with AI:', error.message);
    // Fall back to keyword matching if AI fails
    return classifyQueryWithKeywords(query);
  }
}

// Main function to classify a query using hybrid approach (keyword matching + AI as fallback)
async function classifyQuery(query) {
  // First try keyword matching
  const keywordResult = classifyQueryWithKeywords(query);
  
  // If we have a strong match with keywords, return it
  if (keywordResult && keywordResult.score >= 0.5) {
    return {
      ...keywordResult,
      method: 'Keyword Matching'
    };
  }
  
  // Otherwise, try AI classification
  const aiResult = await classifyQueryWithAI(query);
  
  // If AI gave us a result, return it
  if (aiResult) {
    return aiResult;
  }
  
  // If both methods failed, return the keyword result (even if weak) or null
  return keywordResult;
}

// Main function to run the classifier
async function runClassifier() {
  try {
    // Example usage
    const exampleQuery = "I want to learn about Digital Marketing";
    const result = await classifyQuery(exampleQuery);
    
    if (result) {
      console.log('\n--- Classification Result ---');
      console.log(`Query: "${exampleQuery}"`);
      console.log(`Detected Category: ${result.category}`);
      console.log(`Method: ${result.method}`);
      if (result.score !== undefined) {
        console.log(`Confidence Score: ${result.score.toFixed(4)}`);
      }
      console.log(`Description: ${result.description}`);
      
      if (result.allScores) {
        console.log('All Scores:');
        for (const [category, score] of Object.entries(result.allScores)) {
          console.log(`  ${category}: ${score.toFixed(4)}`);
        }
      }
    } else {
      console.log(`Could not classify query: "${exampleQuery}"`);
    }
  } catch (error) {
    console.error('Error in classifier:', error);
  }
}

// Run the classifier if this file is executed directly
if (require.main === module) {
  runClassifier();
}

// Export functions for use in other modules
module.exports = {
  classifyQuery,
  classifyQueryWithKeywords,
  classifyQueryWithAI
};