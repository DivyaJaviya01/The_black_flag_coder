# Simple Query Classifier

This Node.js application classifies user queries into predefined categories (Science, Commerce, Arts, Vocational) using a hybrid approach:
1. Keyword matching as the primary method
2. Gemini AI as a fallback for ambiguous queries

It works within the free tier limits of the Gemini API by minimizing embedding requests.

## Prerequisites

- Node.js (v14 or higher)
- The Gemini API key already configured in your project

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

## Usage

Run the classifier:
```bash
npm start
```

Or directly with Node:
```bash
node simple-query-classifier.js
```

## How It Works

1. **Keyword Matching (Primary)**: The application first tries to classify queries by matching keywords. Each category has predefined keywords, and the classifier counts how many keywords from each category appear in the query.

2. **AI Classification (Fallback)**: If keyword matching doesn't provide a confident result (less than 50% match), the application uses the Gemini API to classify the query.

3. **Hybrid Approach**: This approach minimizes API usage while maintaining accuracy.

## Customization

You can modify the categories and keywords in the `CATEGORIES` object in `simple-query-classifier.js`:

```javascript
const CATEGORIES = {
  science: {
    keywords: ["science", "physics", "chemistry", "biology", "mathematics", "computer science"],
    description: "Science-related fields including physics, chemistry, biology, mathematics, and computer science"
  },
  // ... other categories
};
```

## Example Output

```
Classifying query: "I want to learn about Digital Marketing"

--- Classification Result ---
Query: "I want to learn about Digital Marketing"
Detected Category: commerce
Method: Keyword Matching
Confidence Score: 0.1667
Description: Commerce-related fields including accounting, finance, business, economics, and marketing
All Scores:
  science: 0.0000
  commerce: 0.1667
  arts: 0.0000
  vocational: 0.0000
```

## Integration with Your Existing Project

This classifier uses the same API configuration as your existing project, so it will automatically use your configured Gemini API key from `src/config/api.js`.