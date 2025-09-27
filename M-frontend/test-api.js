import axios from 'axios';

async function testAPI() {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAE3W1w8Ae8WAXRZcctwI68sVKVaMuiIUo`,
      {
        contents: [{
          parts: [{
            text: "Hello, what is your name?"
          }]
        }]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('Success:', response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

testAPI();