# Query Classifier using OpenAI Embeddings

This Node.js application classifies user queries into predefined categories (Science, Commerce, Arts, Vocational) using OpenAI embeddings and cosine similarity.

## Prerequisites

- Node.js (v14 or higher)
- An OpenAI API key

## Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Setup

1. Set your OpenAI API key as an environment variable:
   
   On Windows (PowerShell):
   ```powershell
   $env:OPENAI_API_KEY="your-api-key-here"
   ```
   
   On macOS/Linux:
   ```bash
   export OPENAI_API_KEY="your-api-key-here"
   ```

## Usage

Run the classifier:
```bash
npm start
```

Or directly with Node:
```bash
node query-classifier.js
```

## How It Works

1. The application initializes by creating embeddings for predefined keywords in each category
2. For each category, it averages the embeddings to create a representative vector
3. When a query is submitted, it gets converted to an embedding
4. Cosine similarity is calculated between the query embedding and each category embedding
5. The category with the highest similarity score is returned

## Customization

You can modify the categories and keywords in the `CATEGORIES` object in `query-classifier.js`:

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
Initializing category embeddings...
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