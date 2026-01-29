# System Architecture Documentation

## Table of Contents
1. [Overall Architecture](#overall-architecture)
2. [Component Breakdown](#component-breakdown)
3. [Data Flow](#data-flow)
4. [Deployment Architecture](#deployment-architecture)
5. [Design Patterns Used](#design-patterns-used)

---

## Overall Architecture

### Client-Centric Architecture (Current Implementation)

**Architecture Philosophy**: The system uses a **client-side execution model** with Skulpt (JavaScript-based Python interpreter) for immediate feedback and `input()` support. The backend API and database layers are designed but not yet integrated, following a phased implementation approach.

```
┌──────────────────────────────────────────────────────────────┐
│              User Browser (Frontend)                         │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  React.js + Skulpt Python Runtime                      │ │
│  │  ├── Monaco Editor (VS Code Engine)                    │ │
│  │  ├── CodeEditor Component                              │ │
│  │  ├── ContentPanel Component                            │ │
│  │  ├── OutputPanel Component                             │ │
│  │  ├── Sidebar Component                                 │ │
│  │  ├── ResizablePanel System                             │ │
│  │  └── Skulpt Interpreter (Python Execution)             │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│              ✅ Code executes here (client-side)            │
│              ✅ Instant feedback with input() support       │
│              ✅ No server latency                            │
└──────────────┬───────────────────────────────────────────────┘
               │ HTTP/HTTPS REST API
               │ (For data persistence - Future Phase 2)
┌──────────────▼───────────────────────────────────────────────┐
│      API Gateway Layer (Flask Backend) - PLANNED             │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Security & Validation Layer                           │  │
│  │  ├── Authentication (JWT tokens)                       │  │
│  │  ├── Input Validation                                  │  │
│  │  ├── Authorization Checks                              │  │
│  │  ├── Progress Tracking API                             │  │
│  │  ├── User Management API                               │  │
│  │  └── Content Management API                            │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────┬───────────────────────────────────────────────┘
               │ SQL Queries (Parameterized)
               │ (Future Phase 3)
┌──────────────▼───────────────────────────────────────────────┐
│      Database (PostgreSQL) - PLANNED                         │
│  ├── Users Table (authentication & profile)                  │
│  ├── User Progress Table (track chapter completion)          │
│  ├── Chapters Table (learning content)                       │
│  └── Test Results Table (assessment scores)                  │
└──────────────────────────────────────────────────────────────┘

**Current Status**:
✅ Phase 1: Frontend with Skulpt (Fully Implemented)
⏳ Phase 2: API Layer (Prepared, not yet integrated)
⏳ Phase 3: Database Persistence (Schema ready, awaiting integration)
```

### Why Client-Side Execution?

**Key Benefits**:
1. **Instant Feedback**: No network latency - code executes in milliseconds
2. **`input()` Support**: Skulpt natively supports interactive input via browser prompts
3. **Scalability**: Zero server-side processing overhead
4. **Educational Focus**: Students learn Python fundamentals without deployment complexity
5. **Cost Efficiency**: No compute resources needed for code execution

---

## Component Breakdown

### Frontend Architecture

#### Component Hierarchy
```
App.js (Root Component)
│
├── Sidebar.js
│   └── Navigation & Chapter Selection
│
├── ResizablePanel.js (Container)
│   ├── CodeEditor.js
│   │   ├── Syntax Highlighting
│   │   ├── Code Input Area
│   │   └── Execute Button
│   │
│   ├── ContentPanel.js
│   │   ├── Chapter Content Display
│   │   ├── Learning Material
│   │   └── Examples
│   │
│   └── OutputPanel.js
│       ├── Execution Results
│       ├── Error Messages
│       └── Performance Metrics
│
└── State Management (Context API)
    └── Shared State (currentChapter, userProgress, etc.)
```

#### Key Components

**1. CodeEditor Component**
- **Responsibility**: Handle code input, syntax highlighting, and code execution
- **Props**: 
  - `initialCode`: Initial Python code to display in the editor
  - `onRunCode`: Callback function when user clicks "Run" button (receives code, error, output)
- **State**: 
  - `code`: Current code content
  - `isRunning`: Execution status flag
- **Language**: Fixed to Python (hardcoded, as this is a Python learning platform)
- **External Libraries**: 
  - **Monaco Editor**: Industry-standard code editor (VS Code's engine)
    - IntelliSense support
    - Python syntax highlighting
    - Auto-completion
    - Error detection
    - Line numbers and word wrap
  - **Skulpt**: Client-side Python interpreter
    - Executes Python code in browser
    - Native `input()` function support via `window.prompt()`
    - Instant feedback (< 100ms execution time)
    - Error handling and output capture
- **Key Features**:
  - Run button to execute code
  - Reset button to restore initial code
  - Loading state during execution
  - Disabled controls while running

**2. ContentPanel Component**
- **Responsibility**: Display educational content including lectures, tests, and practice exercises
- **Props**: 
  - `lesson`: Complete lesson object containing:
    - `id`: Lesson identifier
    - `title`: Lesson title
    - `content`: Lecture content (Markdown format)
    - `test`: Test questions with options and correct answers
    - `practice`: Practice exercises with hints and solutions
    - `initialCode`: Starting code for practice
- **State**: 
  - `mode`: Current view mode ('lecture', 'test', or 'practice')
  - `selectedAnswer`: User's selected test answer
  - `showResult`: Whether to display test result
  - `showHints`: Whether to show practice hints
  - `showSolution`: Whether to reveal practice solution
- **Features**: 
  - Markdown rendering with syntax highlighting
  - Interactive test with multiple choice questions
  - Practice mode with hints and solutions
  - Tab switching between lecture/test/practice
  - Welcome message when no lesson selected

**3. OutputPanel Component**
- **Responsibility**: Display code execution results and errors
- **Props**: 
  - `output`: Execution output text (stdout or error messages)
  - `isError`: Boolean flag indicating if output is an error
- **State**: None (stateless component)
- **Features**: 
  - Conditional styling (green for success, red for errors)
  - Empty state message when no output
  - Pre-formatted text display preserving whitespace
  - Icons indicating output status (💡, ❌, ✅)

**4. ResizablePanel Component**
- **Responsibility**: Manage three-panel layout with drag-to-resize functionality
- **Props**: 
  - `children`: Array of exactly 3 child components (left, middle, right panels)
  - `minWidth`: Minimum width for panels in pixels (default: 200)
- **State**: 
  - `leftWidth`: Width percentage of left panel (default: 35%)
  - `middleWidth`: Width percentage of middle panel (default: 40%)
  - `isDraggingLeft`: Boolean tracking left divider drag state
  - `isDraggingRight`: Boolean tracking right divider drag state
- **Features**: 
  - Two draggable dividers between panels
  - Real-time width adjustment during drag
  - Boundary constraints (15%-70% for left, 20%-85% for middle)
  - Smooth mouse event handling
  - Percentage-based responsive layout

**5. Sidebar Component**
- **Responsibility**: Navigation and lesson selection with collapsible chapters
- **Props**: 
  - `lessons`: Array of lesson objects with chapters and subsections
  - `onSelectLesson`: Callback function when user selects a subsection/lesson
  - `selectedLessonId`: Currently active lesson ID for highlighting
  - `isCollapsed`: Boolean controlling sidebar visibility
  - `onToggle`: Callback function to toggle sidebar collapse/expand
- **State**: 
  - `expandedChapters`: Array of chapter IDs that are currently expanded (default: [1])
- **Features**: 
  - Collapsible/expandable chapters with ▶/▼ icons
  - Subsection highlighting for active lesson
  - Sidebar collapse/expand toggle button
  - Nested chapter structure display
  - Mobile-friendly collapsed mode

---

### Backend Architecture

#### API Layer Structure
```
Flask Application (app.py)
│
├── Route Handlers
│   ├── /api/execute (POST)
│   ├── /api/chapters (GET, POST)
│   ├── /api/chapters/:id (GET)
│   ├── /api/progress (GET, POST)
│   ├── /api/tests (GET, POST)
│   └── /api/health (GET)
│
├── Business Logic Layer
│   ├── CodeExecutor (handles code execution)
│   ├── ChapterManager (manages educational content)
│   ├── ProgressTracker (tracks user progress)
│   └── TestRunner (executes and validates tests)
│
├── Data Access Layer
│   ├── Database Connection Pool
│   ├── Query Builders
│   └── ORM Models
│
└── Utilities
    ├── Authentication (future)
    ├── Error Handlers
    └── Logging
```

#### Code Execution Engine (Skulpt)

**Purpose**: Execute Python code safely in the browser for instant feedback

**Current Implementation (Phase 1 - Client-Side)**:
```
User Types Code in Monaco Editor
    ↓
User Clicks "Run" Button
    ↓
CodeEditor passes code to Skulpt interpreter
    ↓
Skulpt compiles Python → JavaScript
    ↓
Browser executes compiled code
    ↓
Skulpt captures output (print, errors)
    ↓
Skulpt handles input() via window.prompt()
    ↓
OutputPanel displays results immediately
```

**Safety Measures (Browser Sandbox)**:
- JavaScript sandbox (cannot access file system)
- No network requests from code
- Memory managed by browser
- No system command execution
- Limited to basic Python libraries (math, random, string)

**Future Backend Execution (Phase 2+)**:
```
User Code → API → Flask Backend
    ↓
Input Validation
    ↓
Sanitization
    ↓
Subprocess execution with timeout
    ↓
Capture output → Return to frontend
```

**Why Skulpt for Phase 1?**
- ✅ Perfect `input()` support for interactive learning
- ✅ Instant execution (no server latency)
- ✅ Lightweight bundle size (~200KB)
- ✅ Ideal for teaching Python fundamentals
- ✅ No backend infrastructure needed

---

### Database Architecture

#### Entity-Relationship Diagram

```
┌──────────────┐         ┌──────────────┐
│    Users     │         │   Chapters   │
├──────────────┤         ├──────────────┤
│ id (PK)      │         │ id (PK)      │
│ username     │         │ title        │
│ email        │         │ content      │
│ created_at   │         │ order        │
└──────────────┘         │ created_at   │
      │                  └──────────────┘
      │ 1:N                     │
      │                         │ 1:N
      │                         │
      ├─→ ┌──────────────────┐  │
      │   │ UserProgress     │◄─┘
      │   ├──────────────────┤
      │   │ id (PK)          │
      │   │ user_id (FK)     │
      │   │ chapter_id (FK)  │
      │   │ completed_at     │
      │   │ last_accessed    │
      │   └──────────────────┘
      │
      └─→ ┌──────────────────┐
          │ TestResults      │
          ├──────────────────┤
          │ id (PK)          │
          │ user_id (FK)     │
          │ test_id          │
          │ passed           │
          │ score            │
          │ submitted_at     │
          └──────────────────┘
```

#### Table Specifications

**Users Table**
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Chapters Table**
```sql
CREATE TABLE chapters (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  "order" INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**User Progress Table**
```sql
CREATE TABLE user_progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  chapter_id INTEGER REFERENCES chapters(id),
  completed_at TIMESTAMP,
  last_accessed TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, chapter_id)
);
```

---

## Data Flow

### Code Execution Flow

#### Current Implementation (Phase 1 - Client-Side with Skulpt)

```
1. User Types Code
   │
   ├─ Monaco Editor provides syntax highlighting & IntelliSense
   │
2. User Clicks "Run Code"
   │
   ├─ CodeEditor Component captures code string
   │
3. Execute with Skulpt (Browser-Side)
   │
   ├─ Pass code to Skulpt.importMainWithBody()
   ├─ Skulpt compiles Python → JavaScript
   ├─ Browser executes compiled code
   ├─ Handle input() calls with window.prompt()
   ├─ Capture print() output and errors
   │
4. Display Results (< 100ms total)
   │
   ├─ OutputPanel shows stdout
   ├─ Error messages highlighted in red
   ├─ Execution time displayed
   │
5. No Backend Involved
   │
   └─ Everything happens in user's browser
```

#### Future Backend Execution (Phase 2+)

```
1. User Types Code
   │
   ├─ Frontend: CodeEditor captures input
   │
2. User Clicks Execute
   │
   ├─ Frontend: Validates code (length, syntax highlighting)
   │
3. Send to Backend
   │
   ├─ HTTP POST /api/execute
   ├─ Payload: { code, language, chapterId }
   │
4. Backend Processing
   │
   ├─ Validate input
   ├─ Check for malicious patterns
   ├─ Create execution environment
   ├─ Run subprocess with timeout
   ├─ Capture stdout/stderr
   │
5. Return Results
   │
   ├─ HTTP Response: { output, error, executionTime }
   │
6. Frontend Display
   │
   └─ OutputPanel renders results
```

### User Progress Flow

```
1. User Completes Chapter
   │
   ├─ Click "Complete" or finish all exercises
   │
2. Frontend Notification
   │
   ├─ HTTP POST /api/progress/update
   ├─ Payload: { userId, chapterId, completed }
   │
3. Backend Update
   │
   ├─ Insert/Update in user_progress table
   ├─ Record timestamp
   │
4. Data Persistence
   │
   └─ Database commits transaction
```

---

## Deployment Architecture

### Docker Compose Setup

#### Current Deployment (Phase 1 - Frontend Only)

```
docker-compose.yml (Simplified)
│
└── frontend (Service)
    ├── Image: node:18-alpine
    ├── Build: ./frontend
    │   ├── React build (npm run build)
    │   ├── Bundles Skulpt interpreter
    │   └── Includes Monaco Editor
    ├── Ports: 3000:80
    ├── Nginx: Static file serving + routing
    └── No Dependencies (standalone)

**Deployment Strategy**:
- Lightweight: Only frontend container needed
- CDN-Ready: Static assets can be served via CDN
- Scalable: No backend processing, horizontal scaling trivial
- Cost-Efficient: Minimal infrastructure requirements
```

#### Future Deployment (Phase 2-3 - Full Stack)

```
docker-compose.yml (Full Stack)
│
├── frontend (Service 1)
│   ├── Image: node:18-alpine
│   ├── Build: ./frontend
│   ├── Ports: 3000:80
│   ├── Nginx: Reverse proxy + static serving
│   └── Dependencies: backend (optional)
│
├── backend (Service 2)
│   ├── Image: python:3.11-slim
│   ├── Build: ./backend
│   ├── Ports: 5000:5000
│   ├── Environment: FLASK_ENV, DB configs
│   └── Dependencies: database
│
└── database (Service 3)
    ├── Image: postgres:15-alpine
    ├── Ports: 5432:5432
    ├── Environment: POSTGRES_PASSWORD, DB name
    ├── Volumes: db_data (persistent storage)
    └── Init Script: schema.sql
```

### Network Architecture

#### Current Architecture (Phase 1)

```
┌─────────────────────────────────────┐
│         User's Browser              │
│                                     │
│  ┌──────────────────────────────┐  │
│  │   React App + Skulpt         │  │
│  │   (All execution happens     │  │
│  │    client-side)              │  │
│  └──────────────────────────────┘  │
└──────────────┬──────────────────────┘
               │ HTTP (static files only)
┌──────────────▼──────────────────────┐
│     Nginx Server (Static Host)      │
│  Serves: HTML, CSS, JS, Assets      │
└─────────────────────────────────────┘

**Benefits**:
- No backend communication during code execution
- Works offline after initial load
- Minimal server resources
```

#### Future Architecture (Phase 2-3)

```
┌─────────────────────────────────────┐
│     Docker Network (app_network)    │
│                                     │
│  ┌──────────────┐  ┌────────────┐  │
│  │  Frontend    │  │  Backend   │  │
│  │  Container   │──│ Container  │  │
│  │  (nginx)     │  │  (Flask)   │  │
│  └──────────────┘  └────┬───────┘  │
│                         │           │
│                    ┌────▼────────┐  │
│                    │  Database   │  │
│                    │  Container  │  │
│                    │ (PostgreSQL)│  │
│                    └─────────────┘  │
│                                     │
└─────────────────────────────────────┘
```

### Volume & Data Persistence

```
Volumes:
├── db_data (PostgreSQL)
│   └── Persists database files
├── frontend_build (React build)
│   └── Static assets
└── backend_logs (Application logs)
    └── Execution logs
```

---

## Design Patterns Used

### 1. Component Pattern (Frontend)
- **Usage**: React components for UI abstraction
- **Benefit**: Reusability, maintainability, testability

### 2. Container Pattern (Deployment)
- **Usage**: Docker containers for environment consistency
- **Benefit**: Development/production parity, easy deployment

### 3. MVC Pattern (Backend)
- **Model**: Database schema (users, chapters, progress)
- **View**: JSON API responses
- **Controller**: Flask route handlers and business logic

### 4. Repository Pattern (Data Access)
- **Usage**: Database abstraction layer
- **Benefit**: Decouples business logic from database implementation

### 5. Singleton Pattern (Database Connection)
- **Usage**: Single database connection pool
- **Benefit**: Resource efficiency, connection management

### 6. Observer Pattern (State Management)
- **Usage**: React Context for state changes
- **Benefit**: Decoupled component communication

---

## Performance Considerations

### Frontend Optimization
- **Lazy loading of chapters**: Load content on-demand
- **Code splitting by route**: Separate bundles for each view
- **CSS modules**: Avoid style conflicts
- **Memoization**: Cache expensive component renders
- **Skulpt bundle optimization**: Load interpreter once, reuse for all executions
- **Monaco Editor lazy loading**: Load editor library only when needed
- **Local execution**: Zero network latency for code execution
- **Browser caching**: Static assets cached aggressively

### Backend Optimization
- Connection pooling
- Query optimization with indexes
- Response caching (future)
- Async task queues (future)

### Database Optimization
```sql
-- Key indexes for performance
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_chapter_id ON user_progress(chapter_id);
CREATE INDEX idx_test_results_user_id ON test_results(user_id);
```

---

## Security Architecture

### Frontend Security
- Input validation before submission
- XSS protection (React's built-in escaping)
- CSRF tokens (future implementation)

### Backend Security
- Code execution sandboxing
- Input sanitization
- SQL injection prevention (parameterized queries)
- Error handling without information disclosure

### Data Security
- TLS/SSL encryption (in production)
- Password hashing (future with authentication)
- Database access control

---

## Scalability Architecture

### Current Design (Client-Side Execution)
- **Suitable for**: Educational institutions of any size
- **User capacity**: Unlimited (code executes client-side)
- **Server requirements**: Minimal (static file serving only)
- **Cost**: Very low (no compute resources for execution)
- **Scalability**: Horizontal scaling via CDN

**Key Advantage**: Since code execution happens in each user's browser, the system can handle thousands of concurrent users without additional server resources.

### Future Scaling Options

**Horizontal Scaling**:
```
┌────────────┐
│ Load       │
│ Balancer   │
└─────┬──────┘
      │
  ┌───┼───┬────────┐
  │   │   │        │
┌─▼─┐┌─▼─┐┌─▼──┐┌──▼──┐
│ B ││ B ││ B  ││ B   │  Backend instances
│ 1 ││ 2 ││ 3  ││ N   │
└───┘└───┘└────┘└─────┘
       │
    ┌──▼──┐
    │ DB  │  Shared database
    └─────┘
```

**Caching Layer**:
```
Frontend
   │
   ├─ Redis Cache (frequently accessed chapters)
   │
Backend
   │
   └─ Database
```

---

## Conclusion

The architecture demonstrates:
- ✅ Clear separation of concerns
- ✅ Scalable design patterns
- ✅ Security-conscious implementation
- ✅ Performance-optimized structure
- ✅ Future extensibility

This modular, well-documented architecture supports both current educational needs and future platform growth.
