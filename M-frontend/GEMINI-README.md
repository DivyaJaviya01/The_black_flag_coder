# Query Classifier using Gemini Embeddings

This Node.js application classifies user queries into predefined categories (Science, Commerce, Arts, Vocational) using Google Gemini embeddings and cosine similarity. It uses the same API key as your existing M-frontend project.

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
node gemini-query-classifier.js
```

## How It Works

1. The application initializes by creating embeddings for predefined keywords in each category using the Gemini API
2. For each category, it averages the embeddings to create a representative vector
3. When a query is submitted, it gets converted to an embedding using Gemini
4. Cosine similarity is calculated between the query embedding and each category embedding
5. The category with the highest similarity score is returned

## Customization

You can modify the categories and keywords in the `CATEGORIES` object in `gemini-query-classifier.js`:

```javascript
const CATEGORIES = {
  science: ["science", "physics", "chemistry", "biology", "mathematics", "computer science"],
  commerce: ["commerce", "accounting", "finance", "business", "economics", "marketing"],
  arts: ["arts", "history", "literature", "philosophy", "psychology", "political science"],
  vocational: ["vocational", "diploma", "mechanic", "fashion design", "hotel management", "skilled trade"]
};
```

## Example Output

```
Initializing category embeddings using Gemini API...
Processing science keywords...
Processing commerce keywords...
Processing arts keywords...
Processing vocational keywords...
Category embeddings initialized.

--- Classification Result ---
Query: "I want to learn about Digital Marketing"
Detected Category: commerce
Similarity Score: 0.8247
All Scores:
  science: 0.7723
  commerce: 0.8247
  arts: 0.7512
  vocational: 0.7345
```

## Integration with Your Existing Project

This classifier uses the same API configuration as your existing project, so it will automatically use your configured Gemini API key from `src/config/api.js`.

## Updated Implementation

The project now uses the official Google Generative AI SDK (@google/generative-ai) for better reliability, error handling, and future compatibility. The SDK provides:
- Improved error handling with specific error types
- Better timeout management
- Easier model switching
- Official support from Google