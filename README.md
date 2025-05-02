# SkipLegal Immigration Assistant

This is a frontend prototype for SkipLegal's AI-driven immigration platform, created as part of a technical interview process.

## Project Overview

This web application demonstrates a user-friendly interface for simplifying the U.S. immigration process. It includes:

- **Secure Authentication**: Login and signup functionality
- **AI Chatbot**: Virtual assistant for immigration questions with conversation history
- **RFE Check & Analysis**: Upload and analyze Request for Evidence documents
- **Case Status Tracking**: Monitor immigration case progress and timeline
- **Smart Form Filling**: Guided form completion for family-based green card applications

## Technologies Used

- Next.js (React framework)
- Tailwind CSS for styling
- React Icons
- Deployed on Vercel

## Live Demo

You can access the live demo of this application here: [SkipLegal Immigration Assistant](https://v0-skip-legal-frontend-prototype.vercel.app/)

## Features

### Authentication
The application starts with a login/signup page to authenticate users before accessing the main features.

### Dashboard
After authentication, users can access four main features through the sidebar navigation:

1. **ChatBot with Immigration Assistant**
   - Ask questions about immigration processes
   - View conversation history
   - Get contextual responses based on immigration topics

2. **RFE Check**
   - Upload Request for Evidence documents (PDF, DOC, DOCX)
   - Get guidance on responding to immigration requests

3. **Case Status**
   - Enter case numbers to track immigration applications
   - View detailed case timelines and status updates

4. **Form Filling**
   - Interactive wizard for completing immigration forms
   - Support for various USCIS forms (I-130, I-485, I-765, N-400)
   - Step-by-step guidance with form-specific input fields

## Running Locally

1. Clone this repository
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser
