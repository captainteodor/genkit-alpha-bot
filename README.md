Genkit Alpha Bot
The Genkit Alpha Bot is an advanced chatbot application developed with the Genkit framework, Firebase Firestore, and Google’s Vertex AI for NLP processing. This bot is designed to guide users through setting up their dating profiles with personalized responses based on user details, preferences, and goals. With a focus on user experience, the bot uses a series of flows for generating responses and suggestions that align with the user’s objectives.

Features
Profile Setup Flow: Users receive a step-by-step guided setup for creating a dating profile.
Archetype Suggestions: Custom suggestions for archetypes based on users' relationship goals and personal attributes.
In-Memory Caching: Efficient data retrieval through Firestore with a caching mechanism.
Stateful Conversations: Each conversation retains context through flow states, allowing for smooth transitions.
Vertex AI Integration: Leverages Google's Vertex AI for natural language processing.
Customizable Prompt Tones: Response tones are dynamically adjusted based on user input, such as "friendly" or "sarcastic".
Table of Contents
Setup
Environment Variables
Project Structure
Main Components
Usage
Development Workflow
License
Setup
Requirements
Node.js (version 14 or higher)
Firebase: Ensure Firebase is configured with Firestore access for user data storage.
Genkit CLI: The Genkit CLI can simplify plugin installations.
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/genkit-alpha-bot.git
cd genkit-alpha-bot
Install dependencies:

bash
Copy code
npm install
Set up environment variables as described below.

Run the development server:

bash
Copy code
npm run dev
Environment Variables
Create a .env file in the project root and add the following configurations:

plaintext
Copy code
MODEL_TEMPERATURE=0.7                  # Controls response creativity
CACHE_DURATION=60000                    # Cache duration in milliseconds
FIREBASE_API_KEY=your-firebase-api-key  # Firebase configuration
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_MESSAGING_SENDER_ID=your-sender-id
FIREBASE_APP_ID=your-app-id
FIREBASE_STORAGE_BUCKET=your-storage-bucket
FIREBASE_AUTH_DOMAIN=your-auth-domain
Project Structure
plaintext
Copy code
genkit-alpha-bot/
├── src/
│   ├── config/
│   │   └── firebase.ts                # Firebase initialization
│   ├── constants/
│   │   └── flowState.ts               # Defines flow states
│   ├── data/
│   │   ├── repositories/              # Data repositories for user and archetype handling
│   │   └── models/                    # Type definitions for user details and archetypes
│   ├── flows/
│   │   ├── profileSetupFlow.ts        # Profile setup flow logic
│   │   └── resetFlowStateFlow.ts      # Flow reset logic
│   ├── memory/                        # In-memory cache setup
│   ├── services/
│   │   ├── promptService.ts           # Generates prompts for Vertex AI
│   │   └── stateService.ts            # Manages flow state persistence
│   ├── utils/
│   │   └── utils.ts                   # Utility functions
│   └── index.ts                       # Entry point to start the server
├── .env                               # Environment variable configurations
├── package.json                       # Project dependencies and scripts
└── README.md                          # Project documentation
Main Components
Flows
Profile Setup Flow: profileSetupFlow.ts

Guides the user through setting up their profile with a welcome prompt and archetype suggestions.
Flow state management transitions from awaiting_welcome to awaiting_archetype and beyond.
Reset Flow State: resetFlowStateFlow.ts

Resets the flow state for a given conversation, allowing users to start afresh if necessary.
Services
Prompt Service: promptService.ts

Uses Google’s Vertex AI to generate customized responses based on user details and archetypes.
Contains generateWelcomeMessage and generateArchetypeSuggestion functions to drive response generation.
State Service: stateService.ts

Stores and retrieves conversation flow states for each user session.
Works with Firebase or a mock in-memory store, making it versatile across environments.
Utilities
Response Parsing: parseResponse and parseWelcomeResponse
Ensures JSON structure integrity for responses from Vertex AI.
Filters out non-essential data like safety ratings, focusing only on user-facing content.
Usage
Starting the Bot Server
Run the bot server locally with:

bash
Copy code
npm start
Sample API Requests
Profile Setup Initialization

Endpoint: POST /profileSetupFlow

json
Copy code
{
  "data": {
    "conversationId": "1234-5678-91011",
    "userDetails": {
      "firstName": "Teodor",
      "age": 22,
      "sex": "male",
      "goal": "long-term"
    }
  }
}
Expected Response:

json
Copy code
{
  "flowState": "awaiting_welcome",
  "response": "Hey Teodor, welcome! 22 years old, huh? Still figuring out the whole 'adulting' thing, I see. What's your relationship goal, long-term or short-term?",
  "suggestions": ["Long-term relationship", "Short-term relationship"]
}
Transition to Archetype Suggestions

Endpoint: POST /profileSetupFlow

json
Copy code
{
  "data": {
    "conversationId": "1234-5678-91011",
    "prompt": "Long-term relationship",
    "flowState": "awaiting_archetype",
    "userDetails": {
      "firstName": "Teodor",
      "age": 22,
      "sex": "male",
      "goal": "long-term"
    }
  }
}
Reset Flow State

Endpoint: POST /resetFlowStateFlow

json
Copy code
{
  "data": {
    "conversationId": "1234-5678-91011"
  }
}
Development Workflow
Testing: Run unit tests for flows and services with:
bash
Copy code
npm test
Flow Inspection: Use the Genkit CLI to inspect flow state transitions and ensure expected states are met.
Environment Configurations: Adjust environment variables in .env to control model behavior and Firestore access.
License
This project is licensed under the MIT License. See the LICENSE file for more details.

Note: This README provides the setup and usage instructions based on our development work on genkit-alpha-bot. For further customization, refer to the respective flow and service configurations in the code.

