// Test script to verify keyword matching for sports careers

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
  'cricket', 'football', 'basketball', 'tennis', 'badminton', 'swimming', 'golf', 'hockey',
  'sportsman', 'sportswoman', 'professional athlete', 'sports professional',
  
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

const careerAspirationPhrases = [
  'how do i become', 'how to become', 'want to be', 'want to work as',
  'interested in becoming', 'dream of being', 'aspire to be',
  'make a living as', 'earn money as', 'build a career as',
  'study to become', 'course for', 'education for', 'what should i study',
  'want to become', 'i want to become', 'i want to be', 'i aspire to be'
];

function isAllowedTopic(query) {
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
  
  // Check for career aspiration phrases
  const hasCareerAspiration = careerAspirationPhrases.some(phrase => 
    lowerCaseQuery.includes(phrase)
  );
  
  console.log('Topic check:', { query, isCareerRelated, isOffTopic, hasCareerAspiration });
  return isCareerRelated || hasCareerAspiration;
}

// Test queries
const testQueries = [
  "I want to become a cricket player",
  "How do I become a professional cricketer",
  "Cricket career path",
  "Sports career opportunities",
  "I want to be a football player",
  "How to become a tennis player",
  "I aspire to be a professional athlete",
  "what should i study to become a cricketer"
];

console.log("Testing sports career queries...\n");

testQueries.forEach(query => {
  const isAllowed = isAllowedTopic(query);
  console.log(`Query: "${query}"`);
  console.log(`Allowed: ${isAllowed ? 'YES' : 'NO'}\n`);
});