// Test script to verify the chatbot can handle specific career queries

// Recreate the isAllowedTopic function for testing
const isAllowedTopicTest = (query) => {
  // Define comprehensive career-related keywords and topics across all categories
  const careerKeywords = [
    // General career terms
    'career', 'job', 'employment', 'profession', 'occupation', 'work', 'industry',
    'skill', 'education', 'degree', 'course', 'training', 'certification',
    'resume', 'cv', 'interview', 'salary', 'promotion', 'growth',
    'university', 'college', 'graduation', 'major', 'field of study',
    'job search', 'networking', 'application', 'cover letter',
    'work-life balance', 'remote work', 'freelance', 'entrepreneur',
    'leadership', 'management', 'team', 'colleague', 'boss',
    'technology', 'software', 'programming', 'design', 'marketing',
    'finance', 'healthcare', 'education sector', 'engineering', 'business',
    'creative', 'arts', 'media', 'law', 'government', 'non-profit',
    'startup', 'corporate', 'small business', 'consulting',
    'career change', 'transition', 'switch', 'pivot',
    'goal', 'objective', 'plan', 'strategy', 'development',
    'trend', 'market', 'demand', 'opportunity', 'prospect',
    'internship', 'volunteer', 'portfolio', 'personal brand',
    'negotiation', 'benefits', 'workplace', 'culture', 'diversity',
    'productivity', 'time management', 'communication', 'problem solving',
    
    // Science category
    'science', 'physics', 'chemistry', 'biology', 'mathematics', 'computer science',
    'ai', 'ml', 'artificial intelligence', 'machine learning', 'data science',
    'data scientist', 'data analysis', 'data analyst', 'big data',
    'neural network', 'deep learning', 'algorithm', 'python', 'tensorflow',
    'pytorch', 'nlp', 'computer vision', 'predictive analytics',
    'automation', 'robotics', 'scientific research', 'lab work', 'experiment',
    'astronomy', 'geology', 'environmental science', 'biotechnology',
    'genetics', 'microbiology', 'biochemistry', 'organic chemistry',
    'quantum physics', 'astrophysics', 'mathematician', 'statistician',
    'software developer', 'web developer', 'mobile app developer',
    'cybersecurity', 'information technology', 'networking', 'database',
    'cloud computing', 'devops', 'blockchain', 'cryptocurrency',
    
    // Commerce category
    'commerce', 'accounting', 'finance', 'business', 'economics', 'marketing',
    'sales', 'investment', 'banking', 'insurance', 'tax', 'audit',
    'financial planning', 'stock market', 'corporate finance', 'business management',
    'entrepreneurship', 'startup', 'small business', 'retail', 'e-commerce',
    'digital marketing', 'social media marketing', 'content marketing',
    'brand management', 'public relations', 'advertising', 'market research',
    'human resources', 'hr', 'recruitment', 'talent management',
    'supply chain', 'logistics', 'operations', 'project management',
    'business analyst', 'financial analyst', 'investment banker',
    'management consultant', 'real estate', 'hospitality', 'tourism',
    
    // Arts category
    'arts', 'history', 'literature', 'philosophy', 'psychology', 'political science',
    'sociology', 'anthropology', 'archaeology', 'languages', 'linguistics',
    'fine arts', 'painting', 'sculpture', 'drawing', 'photography',
    'music', 'theater', 'dance', 'film', 'cinema', 'media studies',
    'journalism', 'writing', 'creative writing', 'poetry', 'fiction',
    'graphic design', 'ux design', 'ui design', 'interior design',
    'fashion design', 'animation', 'game design', 'digital media',
    'communications', 'public speaking', 'debate', 'education', 'teaching',
    'museum studies', 'curator', 'art history', 'cultural studies',
    
    // Entertainment and Sports
    'actor', 'actress', 'acting', 'singer', 'musician', 'dance', 'dancer',
    'athlete', 'sports career', 'cricket career', 'football career', 'basketball career', 'tennis career',
    'olympics', 'professional sports', 'sports management', 'coach',
    'youtuber', 'content creator', 'influencer', 'streamer', 'social media career',
    'performing arts', 'entertainment career', 'celebrity', 'fame',
    
    // Military and Government Services
    'army', 'navy', 'air force', 'military', 'defense', 'soldier',
    'police', 'law enforcement', 'firefighter', 'emergency services',
    'government job', 'civil service', 'public administration',
    'indian army', 'navy', 'air force', 'paramilitary',
    
    // Culinary and Hospitality
    'chef', 'cooking career', 'culinary', 'baking', 'pastry', 'restaurant',
    'hotel management', 'catering', 'food service', 'nutrition',
    
    // Skilled Trades and Vocational
    'vocational', 'diploma', 'mechanic', 'fashion design', 'hotel management', 'skilled trade',
    'plumbing', 'electrical work', 'carpentry', 'welding', 'construction',
    'automotive repair', 'aircraft maintenance', ' hvac', 'refrigeration',
    'cosmetology', 'hairdressing', 'makeup artistry', 'nail technology',
    'healthcare assistant', 'nursing', 'medical technician', 'pharmacy assistant',
    'fitness trainer', 'personal trainer', 'physical therapy assistant',
    'emergency medical technician', 'paramedic', 'dental assistant',
    'veterinary assistant', 'agriculture', 'horticulture', 'landscaping',
    'aviation', 'pilot', 'flight attendant', 'air traffic control',
    'maritime', 'shipping', 'logistics', 'warehouse management'
  ];
  
  // Define off-topic keywords that should be rejected
  const offTopicKeywords = [
    'weather', 'news', 'sports results', 'entertainment', 'celebrity gossip',
    'recipe', 'cooking instructions', 'food recipe', 'restaurant review', 'travel', 'vacation',
    'movie plot', 'music album', 'book summary', 'game score', 'politics', 'election results',
    'crypto price', 'bitcoin value', 'stock price', 'investment return', 'gambling',
    'dating', 'relationship advice', 'love life', 'marriage', 'family drama',
    'health symptom', 'medical diagnosis', 'doctor appointment', 'medicine dosage', 'disease treatment',
    'religion', 'god', 'bible', 'quran', 'church', 'mosque',
    'joke', 'funny', 'meme', 'humor', 'comedy',
    'who won', 'match result', 'game result', 'score'
  ];
  
  // Convert query to lowercase for case-insensitive matching
  const lowerCaseQuery = query.toLowerCase();
  
  // Check if query contains off-topic keywords (reject if found)
  const isOffTopic = offTopicKeywords.some(keyword => 
    lowerCaseQuery.includes(keyword)
  );
  
  if (isOffTopic) {
    console.log('Off-topic query detected:', query);
    return false;
  }
  
  // Check if query contains any career-related keywords
  const isCareerRelated = careerKeywords.some(keyword => 
    lowerCaseQuery.includes(keyword)
  );
  
  // Additional check for queries that express career aspirations
  // These are phrases that indicate someone is thinking about a career path
  const careerAspirationPhrases = [
    'how do i become', 'how to become', 'want to be', 'want to work as',
    'interested in becoming', 'dream of being', 'aspire to be',
    'make a living as', 'earn money as', 'build a career as',
    'study to become', 'course for', 'education for', 'what should i study'
  ];
  
  const hasCareerAspiration = careerAspirationPhrases.some(phrase => 
    lowerCaseQuery.includes(phrase)
  );
  
  console.log('Topic check:', { query, isCareerRelated, isOffTopic, hasCareerAspiration });
  return isCareerRelated || hasCareerAspiration;
};

// Test the specific queries mentioned
const specificQueries = [
  "How do I become a cricketer?",
  "I want to be a singer, which course should I take?",
  "Can I make a living as a YouTuber?",
  "What should I study if I like cooking?",
  "How to join the Indian Army?",
  "Is acting a good career choice?"
];

console.log("Testing specific career queries...\n");

let totalTests = 0;
let passedTests = 0;

for (const query of specificQueries) {
  totalTests++;
  const result = isAllowedTopicTest(query);
  
  if (result) {
    passedTests++;
    console.log(`✓ "${query}" - RECOGNIZED as career-related`);
  } else {
    console.log(`✗ "${query}" - NOT RECOGNIZED as career-related`);
  }
}

console.log(`\n--- TEST RESULTS ---`);
console.log(`Total tests: ${totalTests}`);
console.log(`Passed tests: ${passedTests}`);
console.log(`Success rate: ${((passedTests/totalTests) * 100).toFixed(2)}%`);

// Additional test for off-topic queries to ensure we haven't become too permissive
console.log("\n--- Testing off-topic queries ---");
const offTopicQueries = [
  "What's the weather today?",
  "Who won the football match?",
  "Tell me a joke",
  "What's your favorite movie?",
  "How to cook pasta?"
];

let offTopicTotal = 0;
let offTopicCorrectlyRejected = 0;

for (const query of offTopicQueries) {
  offTopicTotal++;
  const result = isAllowedTopicTest(query);
  if (!result) {
    offTopicCorrectlyRejected++;
    console.log(`✓ "${query}" - CORRECTLY REJECTED as off-topic`);
  } else {
    console.log(`✗ "${query}" - INCORRECTLY ACCEPTED as career-related`);
  }
}

console.log(`\n--- OFF-TOPIC TEST RESULTS ---`);
console.log(`Total off-topic tests: ${offTopicTotal}`);
console.log(`Correctly rejected: ${offTopicCorrectlyRejected}`);
console.log(`Accuracy: ${((offTopicCorrectlyRejected/offTopicTotal) * 100).toFixed(2)}%`);