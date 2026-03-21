# AI Meeting Scheduler & Persona Customization (Work in Progress 🚧)

---

## Project Overview

Welcome to the repository for the **AI Meeting Scheduler & Personal Customization** project! This is an innovative, full-stack AI SaaS platform currently under active development. Our goal is to revolutionize virtual communication by enabling users to schedule and conduct live, interactive video calls directly with AI personas. Imagine having an AI expert, a specialized coach, or even a specific character available 24/7, whose behavior and responses you can fully customize using natural language prompts.

---

## The Problem It Solves

* **Rigid, Human-Dependent Interactions:** Traditional virtual meetings often lack flexibility and can be limited by human availability or specific expertise.
* **Lack of Personalized AI Interaction:** Existing AI tools can be generic. There's a need for highly customizable AI participants that can adapt to specific conversational styles or roles.
* **Inefficient Information Exchange:** Wouldn't it be powerful to have an AI tailored to deliver specific information or practice scenarios without human intervention?

---

## Our Solution

This platform addresses these challenges by offering:

* **AI-Driven Scheduling:** Seamlessly book meetings with AI entities.
* **Dynamic AI Personas:** Define and refine the AI's role, tone, and knowledge base through intuitive text prompts.
* **Live Video/Audio Interaction:** Engage in real-time, "Zoom-like" conversations with your customized AI, complete with video and audio streaming.
* **Versatile Applications:** From virtual coaches and customer support simulations to interactive learning modules and specialized expert consultations, the possibilities are vast.

---

## Current Status & Roadmap

This project is in its early to mid-development phase. Key functionalities are being built out, and we're actively iterating on the user experience and AI integration.

**Currently Implemented:**

* **Basic User Authentication:** Secure sign-up/login flow(Better-Auth).
* **Core UI Structure:** Initial dashboard and meeting scheduling interface.
* **Preliminary AI Integration:** Proof-of-concept for sending prompts to OpenAI and receiving basic responses.
* **Database Setup:** Schema design and connection for user and meeting data.

**Upcoming Features & Next Steps:**

* **Real-time Video/Audio Streaming Integration:** Implementing live call functionality with the Stream API.
* **Advanced AI Persona Management:** Enhancing prompt engineering for more nuanced AI behavior.
* **Meeting Room UI/UX:** Designing a polished and intuitive in-call experience.
* **Payment & Subscription Management:** (Future phase)
* **Scalable Deployment Strategy:** Optimizing for production environment.

---

## Technologies Used

This project is built with a modern and robust tech stack:

* **Frontend/Full-Stack Framework:** **Next.js** (React)
* **Authentication:** **Better Auth** solution 
* **Real-time Communication:** **Stream API** (for video/audio calls)
* **AI Integration:** **OpenAI API**
* **Database ORM:** **Drizzle ORM**
* **Database:** **PostgreSQL**
* **Styling:** Tailwind CSS
* **Version Control:** Git & GitHub

---

## Getting Started (for Contributors/Reviewers)

As this project is under active development, specific setup instructions are being finalized. However, here's a general overview:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Jeshan26/letsmeet-ai
    cd letsmeet-ai
    ```
2.  **Install dependencies:**
    ```bash
    npm install 
    ```
3.  **Set up environment variables:**
    * Create a `.env.local` file in the root directory.
    * You will need API keys for **OpenAI** and **Stream API**, and your **PostgreSQL** database connection string. (Details will be added soon).
4.  **Run migrations (Drizzle ORM):**
    ```bash
    # Command to run migrations (will be added soon)
    ```
5.  **Start the development server:**
    ```bash
    npm run dev  
    ```

---
