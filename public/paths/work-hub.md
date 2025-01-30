# Shared Services work hub

## Overview

### Instructions for documents
This document is to refer to the overall final requirements for the project. Progress and status are kept in scope.md and DEVELOPMENT.md:

1. /docs/scope.md: You will update that file as directed in the in-file instructions after each development step.
This is a detailed, structured development roadmap
Contains comprehensive project phases, tasks, and implementation steps
Serves as a long-term strategic scope for the entire project
Uses ✅ and ⚒️ to track task completion status
Provides in-depth technical rationale for technology choices
Outlines future development directions and milestones


2. /docs/DEVELOPMENT.md: You will update that file only when instructed by me, for the purpose of handing off all important details of current status to another AI coding agent.
Acts as a quick, high-level overview of the current project state
Provides a snapshot of current progress and immediate focus
Includes:
Overall project status (initialization stage)
Recent progress log
Current focus areas
Known issues
Next immediate steps
Environment setup checklist
Dependency information
Designed for quick reference and handoff between team members or AI agents
The key differences are:

Scopemd is comprehensive and strategic, while DEVELOPMENT.md is concise and tactical
Purpose: scope.md guides long-term development, DEVELOPMENT.md provides a current status update when switching teammates or AI agents
Audience: scope.md is for detailed scopening, DEVELOPMENT.md is for quick status communication
They complement each other: scope.md shows the big picture and detailed roadmap, while DEVELOPMENT.md provides a quick, current status check. This approach helps maintain both a strategic view and an immediate understanding of the project's state.

**Product Requirements Document (PRD): Shared Services Portal**

---

### Overview
The Shared Services Portal will streamline and centralize operations for the Shared Services Team, improving efficiency and visibility while integrating seamlessly with existing tools (Slack, Asana, Google Workspace). The portal will be built around a modular architecture to handle core functionalities and enable or disable components on a per-OpCo basis, ensuring a clean codebase and streamlined product development cycles.

---

### Core System
#### **Authentication**
- Google Account-based login for secure, seamless access.
- Role-based permissions with defined roles:
  - **OpCo Representative**: Access to their own OpCo’s data and basic features.
  - **SS Team Member**: Access to tasks assigned to them and their related data.
  - **SS Admin**: Access to all OpCo data and aggregated performance metrics.

#### **Entity Management**
- Manual creation and configuration of entities (OpCos).
- AVSS roles can access aggregated data for AV Holdco's internal performance tracking.

#### **Common Components**
- **Notification Service**: Centralized management of notifications sent via Slack, email, or in-portal alerts.
- **API Integrations**: Middleware for integrations with Slack, Asana, Google Workspace, and other services.

---

### Modular Components
Each component can be toggled on or off for individual OpCos, allowing tailored functionality:

#### 1. **Request Management**
- **Functionality**:
  - Form-based submission of service requests categorized by priority (Standard, Urgent, Critical).
  - Editable priority levels by admins.
  - Supports recurring and one-off requests.
- **Integration Points**:
  - Slack for submission notifications.

#### 2. **Progress Tracking**
- **Functionality**:
  - Integration with Asana for task creation and assignment in defined projects.
  - Tracks time spent on tasks by team members, with manual input upon task completion.
- **Integration Points**:
  - Asana for task synchronization.
  - Slack for key status updates.

#### 3. **Reporting and Analytics**
- **Functionality**:
  - Real-time data reports showing tasks handled, costs, and avoided costs.
  - Monthly compilation and delivery of reports to OpCo Slack channels.
  - Drag-and-drop report builder for custom reports if feasible.
  - Role-based data sensitivity:
    - OpCo Representatives: Access to their OpCo’s data.
    - SS Admins: Access to all data.
    - SS Team Members: Access to their own data.
- **Integration Points**:
  - Google Workspace for exporting data to Sheets and Docs.
  - Google Drive API for secure storage and retrieval of reports.

#### 4. **Invoicing Module**
- **Functionality**:
  - Automated generation of itemized invoices with configurable markup.
  - Input-driven pro-rata cost allocation, with manual processes to start.
  - Editable and removable invoices.
- **Integration Points**:
  - Google Workspace/Drive API for invoice templates, invoice storage, and retrieval, and other file storage.

#### 5. **Capacity scopening** 
- **Functionality**:
  - Reserved for future development in collaboration with the primary capacity scopener.
  - Integration with Google Workspace (ideall Google Calendar API) or another service for work availability tracking.

#### 6. **Notifications and Alerts**
- **Functionality**:
  - SLA-driven alerts for overdue tasks.
  - Basic granular control for notification preferences.
  - Integration with Google Calendar for reminders.
- **Integration Points**:
  - Slack and email for communication.

---

### Architectural Principles
1. **Modularity**:
   - Components are developed as independent modules to enable or disable per OpCo requirements.
   - Simplifies customization and maintenance while ensuring flexibility for future expansions.

2. **Scalability**:
   - Core system handles shared functionalities and API integrations.
   - Modular design ensures additional components can scale independently.

3. **Extensibility**:
   - Open API structure to facilitate integrations with additional tools as needed.
   - Clear separation between core and modular logic.

---

### Key Benefits of Modular Approach
1. **Clean Codebase**:
   - Reduces interdependencies between features, minimizing risk of bugs and regressions.
2. **Faster Development Cycles**:
   - Isolated components can be developed, tested, and deployed independently.
3. **Customizability**:
   - Tailored configurations for OpCos reduce unused functionality and improve performance.

---

### Machine-Readable Structure (Markdown)
#### **Core System**
- **Authentication**: Google Account-based login, role-based permissions.
- **Entity Management**: Manual OpCo creation, aggregated data access for AVSS roles.

#### **Modular Components**
1. **Request Management**:
   - Form submission with editable priorities.
   - Handles recurring and one-off requests.
   - Will require SS Admin and OpCo representative UX interview prior to implementation.
2. **Progress Tracking**:
   - Asana task integration: Creates tasks in defined projects and assigns them to team members.
   - Time tracking via manual input post-task or integration option TBD.
   - Will require SS Admin and OpCo representative UX interview prior to implementation.
3. **Reporting and Analytics**:
   - Real-time and monthly reports for OpCos, and roll-up reports for Shared Services/admins.
   - Drag-and-drop custom reports in a dashboard if feasible.
   - Will require SS Admin and OpCo representative UX interview prior to implementation.
4. **Invoicing Module**:
   - Automated, editable, and removable internal invoicing process that makes it easy for accounts to manage their internal billing. 
   - Pro-rata allocation starting with manual inputs.
   - Will require accountant, SS admin, and OpCo representative UX interview prior to implementation.
   
5. **Capacity scopening**:
   - Utilize Google Calendar API  (or a better solution)for users on the Shared services Google Workspace to provide work availability, and track scheduled work the same way.
   - Interacts with Request Management and Progress Tracking modules
   - Will require SS Admin UX interview prior to implementation.
6. **Notifications and Alerts**:
   - SLA-based alerts, 
   Google Calendar integration, optional Slack integration.

---

### Next Steps
1. Refine modular scope and finalize core features.
2. Develop core authentication and entity management.
3. Begin iterative development of modular components.

---

# Updated Project Handoff Notes - January 2025

## Key Learnings from Initial Implementation

### Stack Considerations
The initial implementation using Python + FastAPI + Postgres with Google OAuth direct integration proved more complex than necessary for the early stages. Here are the key insights:

1. **Authentication Complexity**
   - Direct Google OAuth implementation was overly complex for initial needs
   - Recommendation: Use Firebase Auth initially, which provides:
     - Built-in Google sign-in
     - Simple user management
     - Easy role-based access control
     - Can be migrated to direct OAuth later if needed

2. **Framework Choice**
   - Next.js is the optimal choice because:
     - Combines frontend and backend in single codebase
     - Built-in API routes eliminate need for separate server
     - File-based routing reduces boilerplate
     - Excellent TypeScript support
     - Seamless deployment to Vercel
     - Large ecosystem of components and middleware
     - Built-in optimizations (code splitting, image optimization)
     - Great developer experience with fast refresh

3. **Database Choice**
   - Initial development:
     - Use Prisma with SQLite for rapid development
     - Provides type safety through Prisma's generated types
     - Zero configuration required
     - Perfect for prototyping phase
   - Production:
     - Migrate to Vercel Postgres or scopeetScale
     - Both offer serverless scaling
     - Built-in Next.js integration
     - Managed service reduces operational overhead

4. **Hosting and Deployment**
   - Use Vercel for deployment because:
     - First-class Next.js support (created by same team)
     - Zero configuration deployments
     - Automatic preview deployments for PRs
     - Built-in analytics and performance monitoring
     - Edge functions for optimal performance
     - Seamless integration with Vercel Postgres if needed
     - Free tier suitable for initial launch

### Implementation Strategy
1. **Phased Approach**
   - Start with core authentication and basic CRUD operations
   - Only add integrations in the context of building specific modules -- integrations extend functionality and allow us to avoid building duplicative functionality in-app
   - Build and fully test each module before moving to the next
   - Keep the frontend simple initially - focus on functionality over design

2. **Module Priority**
   Recommended implementation order:
   1. Basic auth and user management
   2. Entity (OpCo) management
   3. Request Management with Slack notifications
   4. Progress Tracking with Asana integration
   5. Basic Reporting
   6. Invoicing
   7. Advanced features (custom reports, capacity scopening)

3. **Integration Strategy**
   - Use webhook-based integration where possible
   - Start with simple notification flows
   - Add complex bi-directional sync later
   - Use service accounts for Google Workspace integration

### Development Guidelines
1. **Code Organization**
   - Keep services independent and loosely coupled
   - Use dependency injection for easier testing
   - Implement proper error handling from the start
   - Add logging early in development

2. **Testing Strategy**
   - Write tests for core functionality first
   - Use integration tests for third-party services
   - Implement end-to-end tests for critical flows

3. **Documentation**
   - Document setup steps thoroughly
   - Keep API documentation updated
   - Document all environment variables
   - Include troubleshooting guides

## Next Steps for New Implementation
1. Set up basic Next.js project
2. Implement Firebase Authentication
3. Create basic OpCo management CRUD
4. Add simple request submission form
5. Implement Slack notifications
6. Build basic reporting dashboard

## Required Environment Variables
```
FIREBASE_CONFIG={}
SLACK_BOT_TOKEN=
SLACK_SIGNING_SECRET=
ASANA_ACCESS_TOKEN=
GOOGLE_SERVICE_ACCOUNT={}
JWT_SECRET=
```

Remember: Start simple, get core functionality working, then iterate with additional features.
