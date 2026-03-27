# Admin Dashboard Structure and Role Access

## Purpose
This dashboard is for administrative and officer roles in the Collaborative Research Management Platform. It supports proposal handling, approvals, budget control, progress inspection, requests, publications, notifications, and user governance. The platform’s documented workflow includes role-based access control, project-type-based permissions, and action-based permissions across proposal submission, evaluation, budget approval, progress inspection, termination, extension, team replacement, agreement, and publication processes. fileciteturn1file9 fileciteturn1file17 fileciteturn1file18

## 1. Recommended Sidebar Structure

### 1. Dashboard
**Purpose:** Overview of pending work, approvals, project counts, budget summaries, and alerts.  
**Visible to:** All admin-type roles.

### 2. Projects
**Contains:** All projects, active projects, completed projects, submitted projects, under-review projects, approved projects, rejected projects, and terminated projects.  
**Main actions:** View, search, filter, assign, approve, reject, inspect, comment.  
**Visible to:** RAD, RA, ADRPM, AC, VPRTT, Finance, Coordinator, Department, College/School, Examiner/Evaluator, PGMO.  
The document repeatedly describes project listing, viewing, searching, status tracking, approval, rejection, and inspection as core system functions. fileciteturn1file17 fileciteturn1file15

### 3. Proposals
**Contains:** New proposals, drafts, submitted proposals, revisions, reviewer comments, evaluator assignment, and proposal status timeline.  
**Main actions:** Open proposal, assign evaluator, comment, request revision, approve, reject.  
**Visible to:** RAD, RA, Coordinator, Department, College/School, Examiner/Evaluator.  
Proposal initiation, evaluator assignment, revision, and approval are explicit requirements in the document. fileciteturn1file9 fileciteturn1file15

### 4. Evaluations
**Contains:** Assigned reviews, scoring, feedback, decision history, and evaluation status.  
**Main actions:** Review, score, comment, approve, reject.  
**Visible to:** Examiner/Evaluator, RAD, RA, Coordinator, Department, College/School, AC.  
The system includes assigning examiners, project evaluation, examiner comments, and final decisions. fileciteturn1file17 fileciteturn1file15

### 5. Progress
**Contains:** Progress reports, submitted files, milestones, comments, and inspection history.  
**Main actions:** View report, comment, approve progress, flag missing items.  
**Visible to:** RAD, RA, ADRPM, AC, Finance, VPRTT.  
The document states that PI submits progress reports and officers inspect progress and add comments. fileciteturn1file9 fileciteturn1file15

### 6. Budget
**Contains:** Budget requests, budget approvals, budget amendments, release records, expense tracking, refund records, and budget status.  
**Main actions:** Review budget, approve, reject, add comment, release funds, calculate refund, amend budget.  
**Visible to:** RA, ADRPM, AC, VPRTT, Finance, RAD.  
The document includes budget request approval, budget release, budget amendment, and refund handling, including the rule that larger budgets can escalate to AC. fileciteturn1file0 fileciteturn1file3 fileciteturn1file9

### 7. Requests
**Contains:** Extension requests, termination requests, PI transfer requests, team replacement requests, and clarification messages.  
**Main actions:** Review request, comment, approve, reject, escalate, and notify.  
**Visible to:** RAD, RA, ADRPM, AC, VPRTT, Finance, Coordinator, Department.  
The document explicitly includes extension, termination, team replacement, and PI transfer workflows. fileciteturn1file4 fileciteturn1file8 fileciteturn1file12

### 8. Publications
**Contains:** Submitted papers, validation status, journal/index evaluation, approved publications, and certification records.  
**Main actions:** Validate paper, approve publication, record paper, issue certification.  
**Visible to:** PGMO, RAD, ADRPM, RA, VPRTT, Finance, and relevant academic reviewers.  
The document contains publication validation, journal evaluation, paper recording, and certification use cases. fileciteturn1file0 fileciteturn1file15

### 9. Users & Roles
**Contains:** User list, role assignment, access permissions, profile management, and activity tracking.  
**Main actions:** Add user, edit role, deactivate user, assign permissions, review access logs.  
**Visible to:** Super-admin level roles such as RAD, ADRPM, AC, Department, College/School, and system administrators.  
The document describes user management and role control as a subsystem and access-control requirement. fileciteturn1file17 fileciteturn1file18

### 10. Notifications
**Contains:** Approvals, rejections, comments, reminders, escalations, and deadline alerts.  
**Main actions:** Mark read, filter by type, open related item, clear all.  
**Visible to:** All roles.  
The document repeatedly emphasizes real-time notifications for approvals, rejections, evaluation, and progress updates. fileciteturn1file4 fileciteturn1file9

### 11. Reports & Analytics
**Contains:** Project counts, approval rate, budget usage, overdue tasks, publication counts, and progress summaries.  
**Main actions:** Filter, export, print, compare, and drill into project data.  
**Visible to:** RAD, ADRPM, AC, VPRTT, Finance, Department, College/School, PGMO.  
The document supports dashboards, progress visualization, and admin monitoring. fileciteturn1file1 fileciteturn1file9

### 12. Audit Log
**Contains:** All major actions, approvals, comments, budget changes, and role changes.  
**Main actions:** View history, filter by user, export logs.  
**Visible to:** RAD, ADRPM, AC, and system admins.  
The document highlights traceability, auditability, and secure record keeping. fileciteturn1file5 fileciteturn1file18

### 13. Settings
**Contains:** Profile settings, password change, notification preferences, theme settings, and system preferences.  
**Visible to:** All roles.

---

## 2. Role Access Matrix

| Module / Feature | RAD | RA | ADRPM / ADPRM | AC | VPRTT | Finance | Coordinator | Department | College / School | PGMO | Examiner / Evaluator |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Dashboard overview | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Limited |
| Projects list / view / search | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| Proposal review / assignment | Yes | Yes | Limited | Yes | Limited | No | Yes | Yes | Yes | No | Yes |
| Evaluation / scoring / comments | Yes | Limited | Limited | Yes | Limited | No | Yes | Yes | Yes | No | Yes |
| Progress inspection / comments | Yes | Yes | Yes | Yes | No | No | No | No | No | No | No |
| Budget approve / amend / release | Yes | Yes | Yes | Yes | Yes | Yes | No | No | No | No | No |
| Budget refund handling | Yes | Yes | Yes | Yes | No | Yes | No | No | No | No | No |
| Extension requests | Yes | Yes | Yes | Yes | No | No | No | No | No | No | No |
| Termination requests | Yes | Yes | Yes | Yes | No | Yes | No | No | No | No | No |
| PI transfer / team replacement | Yes | Yes | Yes | Yes | No | No | No | No | No | No | No |
| Publications / certification | Yes | Yes | Yes | Limited | Limited | No | No | No | No | Yes | No |
| User & role management | Limited | No | Yes | Limited | No | No | No | No | No | No | No |
| Notifications | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| Reports & analytics | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Limited |
| Audit log | Yes | No | Yes | Yes | No | Yes | No | No | No | No | No |

---

## 3. Access Rules for the 3-Layer Setup

### Presentation Layer
Controls what is shown in the sidebar, topbar, cards, pages, and buttons.

### Application Layer
Enforces role permissions, approval routing, escalation rules, and conditional visibility.

### Data Layer
Stores users, roles, projects, documents, reviews, budgets, notifications, and audit logs with restricted access.

### Permission Logic
The platform should not only check the user role. It should also check:
- project type
- current workflow stage
- requested action

This matches the document’s role-based access model, where permissions depend on the institutional role, the project type, and the action being performed. fileciteturn1file18

---

## 4. Best Sidebar Order for the Admin Dashboard
1. Dashboard  
2. Projects  
3. Proposals  
4. Evaluations  
5. Progress  
6. Budget  
7. Requests  
8. Publications  
9. Users & Roles  
10. Reports & Analytics  
11. Notifications  
12. Audit Log  
13. Settings  

---

## 5. Recommended Visibility by Default
For a clean professional dashboard:
- show only the modules the role can use
- keep advanced sections collapsed by default
- use badges for pending counts
- show only the actions allowed at the current project stage
- hide restricted actions instead of disabling everything
