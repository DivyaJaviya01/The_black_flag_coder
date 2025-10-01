# Career Guidance Platform - M-Frontend

This React-based frontend application assists users in career exploration and guidance. It integrates AI-powered query classification to understand user intent and provide personalized recommendations in domains such as Science, Commerce, Arts, and Vocational fields.

## Features

- **AI-Powered Query Classification**: Uses OpenAI or Google Gemini embeddings and cosine similarity to categorize user queries
- **Interactive Chatbot**: Integrated via `react-chatbot-kit` for conversational UX
- **Career Assessment & Roadmaps**: Visual diagrams and assessments to guide users
- **Navigation & Information Pages**: Includes Home, About, Colleges, Trending Jobs, Privacy, Terms, etc.
- **Authentication Modal**: Supports sign-in flows

## Prerequisites

- Node.js (v14 or higher)
- An OpenAI API key OR a Google Gemini API key

## Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Setup

### For OpenAI API:
1. Set your OpenAI API key as an environment variable:
   
   On Windows (PowerShell):
   ```powershell
   $env:OPENAI_API_KEY="your-api-key-here"
   ```
   
   On macOS/Linux:
   ```bash
   export OPENAI_API_KEY="your-api-key-here"
   ```

### For Google Gemini API:
1. Set your Google Gemini API key in `src/config/api.js`:
   ```javascript
   // API configuration
   export const API_CONFIG = {
     // Google AI API key
     GOOGLE_AI_KEY: 'your-gemini-api-key-here',
     // ... other config
   };
   ```

## Usage

Start the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## How It Works

The application uses AI embeddings and cosine similarity to classify user queries into career-related categories:

1. The application initializes by creating embeddings for predefined keywords in each category
2. For each category, it averages the embeddings to create a representative vector
3. When a query is submitted, it gets converted to an embedding
4. Cosine similarity is calculated between the query embedding and each category embedding
5. The category with the highest similarity score is returned

## Technology Stack

- React v19.1.1
- React DOM v19.1.1
- React Router DOM v7.9.1
- Vite v7.1.6 (Build Tool)
- Tailwind CSS v3.4.0 (Styling)
- Axios v1.12.2: HTTP client for API communication
- react-chatbot-kit v2.2.2: Chatbot interface
- @heroicons/react v2.1.5: Icon library
- @google/generative-ai: Official Google Generative AI SDK for Gemini integration

## Customization

You can modify the categories and keywords in the classifier files:
- For OpenAI: `query-classifier.js`
- For Google Gemini: `gemini-query-classifier.js`

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