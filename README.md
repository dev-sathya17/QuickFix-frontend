# Quick Fix - Frontend

## Project Overview

Quick Fix is a ticket management system built with the MERN stack. It allows users to raise tickets for issues and provides real-time chat and status updates between users and employees. The frontend of this application is built using React with Redux for state management, and Redux Persist for persisting the state across sessions. It supports Google OAuth for user authentication and offers a clean, intuitive UI.

---

## Features

### 1. **User Authentication**

- Users can sign in via Google OAuth using the Google Sign-In feature.
- Session management is handled via Redux Persist, allowing users to remain logged in even after refreshing the page.

### 2. **Ticket Management**

- Users can raise support tickets for various issues.
- Tickets are categorized based on predefined categories managed by the admin.
- Users can see the status of their raised tickets in real-time.

### 3. **Real-Time Chat**

- Users and employees assigned to tickets can engage in real-time chat to discuss and resolve issues.
- Socket.io is used for the chat functionality to enable seamless, real-time communication.

### 4. **Redux State Management**

- The application state, including user data, tickets, and chat, is managed using Redux.
- Redux Persist is used to save the state in localStorage, ensuring the state is preserved across browser sessions.

### 5. **Ticket Status Updates**

- Users receive real-time updates on the status of their tickets (e.g., pending, in progress, resolved).
- Admins and employees can update ticket statuses, and these updates are reflected in real-time for users.

### 6. **Admin Dashboard**

- Admins can view various metrics and analytics related to tickets, employees, and users.
- The dashboard is equipped with charts and graphs for data visualization (e.g., tickets by status, user activity).
- Admins can manage categories, users, and employees.

---

## Dependencies

The project uses the following dependencies:

- `axios`: Promise-based HTTP client for API calls.
- `dnd-kit`: Drag-and-drop toolkit for creating kanban boards.
- `formik`: Form library for React.
- `html2pdf`: Convert HTML to PDF for report downloading.
- `react-icons`: Collection of popular icons.
- `react-router-dom`: Declarative routing for React.
- `yup`: Schema validation for forms.
- `recharts`: Library for building charts.

## Components

- **Navbar:** Top navigation bar.
- **Header:** A header which consists of the title and logo.
- **Pie Chart and Bar Graph:** Visualization components for data.
- **TicketCard:** Card component to display the ticket information.
- **Ticket Modal:** Modal for adding a ticket
- **OAuth:** Component to initiate Open Authentication using Google.

## Contexts

- **Socket Context:** To provide socket connection across all components.

## Loaders

Functions that fetch data from various backend APIs for different routes, ensuring data is available when needed.

## Pages

Contains all the different pages that every route points to, providing a structured navigation flow.

## Routes

- **Protected Routes:** Ensure only authenticated users can access certain parts of the application.
- **Authenticated Routes:** Manage routes based on user authentication status.

## Services

Different services for API calls, split by category of entity. Also includes an `instance.js` file which exports two axios instances:

- **Protected Instance:** For authenticated API calls.
- **Normal Instance:** For unauthenticated API calls.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm

### Installation

1. Pull the repository to your local machine.

```
git pull
```

2. To install all the dependencies:

```
npm install
```

3. Once everything is installed successfully, now it's time to run the server.

```
npm run dev
```

### Sample Admin Credentials for walkthorugh

```
email: vsvs2209@gmail.com
pass: Admin@1212
```
