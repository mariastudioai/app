#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================

user_problem_statement: "MARI.A Launch — luxury static-hosting landing page (clone of ezlaunch.app). Added full account signup with JWT auth and editorial brand imagery."

backend:
  - task: "Auth endpoints — signup / login / me with JWT"
    implemented: true
    working: true
    file: "backend/server.py"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Implemented POST /api/auth/signup (201, returns token+user, 409 if email exists), POST /api/auth/login (200/401), GET /api/auth/me (Bearer token, 401 if invalid). Passwords hashed with bcrypt via passlib. JWT HS256, 7-day TTL, secret from JWT_SECRET env. Stores users in MongoDB collection `users` with uuid id, lowercased unique email, name, password_hash, created_at. Email validation via pydantic EmailStr. Min password length 6."
        - working: true
          agent: "testing"
          comment: "✅ ALL 19 TESTS PASSED (100% success rate). Verified: (1) POST /api/auth/signup returns 201 with token+user, creates user in DB with lowercased email; (2) Duplicate email returns 409 (case-insensitive check working); (3) Invalid email format returns 422; (4) Password <6 chars returns 422; (5) POST /api/auth/login returns 200 with token+user for valid credentials; (6) Login with wrong password returns 401; (7) Login with non-existent email returns 401; (8) Case-insensitive email matching works (uppercase email accepted); (9) GET /api/auth/me with valid Bearer token returns 200 with user object (id, name, email, created_at); (10) GET /api/auth/me without token returns 401; (11) GET /api/auth/me with invalid token returns 401; (12) JWT token structure validated - contains sub, email, exp, iat claims; (13) JWT uses HS256 algorithm. All endpoints working correctly at https://fast-deploy-33.preview.emergentagent.com/api."

frontend:
  - task: "Auth dialog + context wiring on CTAs"
    implemented: true
    working: true
    file: "frontend/src/components/AuthDialog.jsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "AuthContext hydrates from localStorage token via /auth/me. AuthDialog has Sign up / Sign in tabs and a Welcome view after signup. Navbar, Hero, Pricing, CTA all open the dialog. Navbar shows user pill+logout once authenticated. Not flagged for automated FE test yet — user wants to manually test FE first."
        - working: true
          agent: "testing"
          comment: "✅ COMPREHENSIVE E2E AUTH TESTING COMPLETE - ALL FLOWS WORKING. Tested at https://fast-deploy-33.preview.emergentagent.com. (1) Signup dialog opens from navbar 'Get started free' button with correct elements: MARI.A LAUNCH eyebrow, 'Create your account' heading with italic 'account', Sign up/Sign in tabs, 3 input fields (name, email, password). (2) Validation working: browser blocks empty fields, invalid email format blocked, password <6 chars shows 'Password must be at least 6 characters' error. (3) Successful signup with unique email (marie+timestamp@mariatest.com) displays Welcome view with gold checkmark, 'YOU'RE IN' eyebrow, 'Welcome, Marie.' heading (uses first name), descriptive text, and 'Start deploying' button. (4) After signup, navbar shows brown user pill with gold 'M' initial avatar and 'MARIE' uppercase first name. (5) User menu dropdown opens on pill click, displays full name 'Marie Lune', email, and 'Sign out' button. (6) Logout reverts navbar to 'Sign in' / 'Get started free' buttons. (7) Login flow: clicking 'Get started free' → 'Sign in' tab changes heading to 'Welcome back'. Wrong password shows red error 'Invalid email or password'. Correct password closes dialog, shows toast 'Welcome back, Marie', and restores user pill. (8) Pricing CTA: clicking 'Start with Pro' on Pro card opens signup dialog with badge 'You're starting on the PRO plan' (PRO in gold uppercase). (9) Hero interactions: ZIP dropzone click shows toast 'mysite.zip selected', GitHub tab switch displays input + Connect button. (10) Session persistence: after login + page reload, user pill remains visible (token persists in localStorage). (11) Responsive: tested at 390×844 mobile viewport - hamburger menu works, dialog fits and is usable. Console clean (only expected 401 from wrong password test). Backend logs confirm all API calls working correctly (201 signup, 409 duplicate, 422 validation, 200 login, 401 wrong password). No critical issues found."

metadata:
  created_by: "main_agent"
  version: "1.0"
  test_sequence: 1

test_plan:
  current_focus: []
  stuck_tasks: []
  test_all: false
  test_priority: "high_first"

agent_communication:
  - agent: "main"
    message: "Backend now has JWT auth (signup/login/me). Please test the three endpoints end-to-end: 1) signup creates user and returns valid JWT, 2) duplicate signup returns 409, 3) signup with invalid email / short password (<6) fails validation (422), 4) login with correct creds returns token, 5) login with wrong password returns 401, 6) GET /auth/me with valid Bearer returns user, with missing/invalid/expired token returns 401, 7) email is normalized lowercase. Use REACT_APP_BACKEND_URL (https://fast-deploy-33.preview.emergentagent.com) + /api prefix. Mongo URL and JWT_SECRET are already configured in backend/.env."
  - agent: "testing"
    message: "✅ Backend authentication testing COMPLETE - ALL TESTS PASSED (19/19, 100% success). All three auth endpoints (signup, login, me) are working correctly with proper validation, error handling, JWT token generation/verification, and case-insensitive email matching. Backend is production-ready. Main agent can now summarize and finish the task."
  - agent: "testing"
    message: "✅ FRONTEND E2E AUTH TESTING COMPLETE - ALL FLOWS WORKING PERFECTLY. Comprehensive testing completed covering: (1) Signup dialog UI with all required elements, (2) Form validation (empty fields, invalid email, short password), (3) Successful signup with Welcome view, (4) Navbar user pill display, (5) User menu dropdown with logout, (6) Login flow with wrong/correct password, (7) Pricing CTA with plan badge, (8) Hero interactive elements (ZIP upload, GitHub tab), (9) Session persistence after reload, (10) Mobile responsive design. All features working as specified in the review request. No critical issues found. Console clean. Backend API integration working correctly. The MARI.A Launch landing page with JWT auth is production-ready."
