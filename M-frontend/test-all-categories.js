// Test script to verify the chatbot can handle queries from all career categories

// Since we can't directly import the Chatbot component functions, 
// we'll recreate the isAllowedTopic function here for testing:

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
    
    // Vocational category
    'vocational', 'diploma', 'mechanic', 'fashion design', 'hotel management', 'skilled trade',
    'plumbing', 'electrical work', 'carpentry', 'welding', 'construction',
    'automotive repair', 'aircraft maintenance', ' hvac', 'refrigeration',
    'cosmetology', 'hairdressing', 'makeup artistry', 'nail technology',
    'culinary arts', 'chef', 'baking', 'pastry', 'restaurant management',
    'healthcare assistant', 'nursing', 'medical technician', 'pharmacy assistant',
    'fitness trainer', 'personal trainer', 'physical therapy assistant',
    'emergency medical technician', 'paramedic', 'dental assistant',
    'veterinary assistant', 'agriculture', 'horticulture', 'landscaping',
    'aviation', 'pilot', 'flight attendant', 'air traffic control',
    'maritime', 'shipping', 'logistics', 'warehouse management'
  ];
  
  // Define off-topic keywords that should be rejected
  const offTopicKeywords = [
    'weather', 'news', 'sports', 'entertainment', 'celebrity',
    'recipe', 'cooking', 'food', 'restaurant', 'travel', 'vacation',
    'movie', 'music', 'book', 'game', 'politics', 'election',
    'crypto', 'bitcoin', 'stock', 'investment', 'gambling',
    'dating', 'relationship', 'love', 'marriage', 'family',
    'health', 'medical', 'doctor', 'medicine', 'disease',
    'religion', 'god', 'bible', 'quran', 'church', 'mosque',
    'joke', 'funny', 'meme', 'humor', 'comedy'
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
  
  console.log('Topic check:', { query, isCareerRelated, isOffTopic });
  return isCareerRelated;
};

// Test queries for each category
const testQueries = {
  science: [
    "What is data science?",
    "How to become a software engineer?",
    "Explain machine learning algorithms",
    "What does a physicist do?",
    "Careers in biotechnology",
    "How to start in cybersecurity?",
    "What is artificial intelligence?",
    "Jobs in environmental science"
  ],
  commerce: [
    "How to start a business?",
    "What does a financial analyst do?",
    "Careers in digital marketing",
    "How to become an investment banker?",
    "What is supply chain management?",
    "Jobs in human resources",
    "How to start in e-commerce?",
    "Careers in real estate"
  ],
  arts: [
    "How to become a graphic designer?",
    "Careers in journalism",
    "What does a museum curator do?",
    "How to start in fashion design?",
    "Jobs in creative writing",
    "Careers in film production",
    "How to become a teacher?",
    "What is cultural studies?"
  ],
  vocational: [
    "How to become an electrician?",
    "Careers in culinary arts",
    "What does a dental assistant do?",
    "How to start in aviation?",
    "Jobs in construction management",
    "Careers in healthcare assistance",
    "How to become a fitness trainer?",
    "What is hotel management?"
  ]
};

console.log("Testing career query classification...\n");

let totalTests = 0;
let passedTests = 0;

for (const [category, queries] of Object.entries(testQueries)) {
  console.log(`--- Testing ${category.toUpperCase()} category ---`);
  
  for (const query of queries) {
    totalTests++;
    const result = isAllowedTopicTest(query);
    
    if (result) {
      passedTests++;
      console.log(`✓ "${query}" - RECOGNIZED as career-related`);
    } else {
      console.log(`✗ "${query}" - NOT RECOGNIZED as career-related`);
    }
  }
  
  console.log("");
}

console.log(`--- TEST RESULTS ---`);
console.log(`Total tests: ${totalTests}`);
console.log(`Passed tests: ${passedTests}`);
console.log(`Success rate: ${((passedTests/totalTests) * 100).toFixed(2)}%`);

// Test some off-topic queries
console.log("\n--- Testing off-topic queries ---");
const offTopicQueries = [
  "What's the weather today?",
  "Who won the football match?",
  "Tell me a joke",
  "What's your favorite movie?",
  "How to cook pasta?"
];

for (const query of offTopicQueries) {
  const result = isAllowedTopicTest(query);
  if (!result) {
    console.log(`✓ "${query}" - CORRECTLY REJECTED as off-topic`);
  } else {
    console.log(`✗ "${query}" - INCORRECTLY ACCEPTED as career-related`);
  }
}