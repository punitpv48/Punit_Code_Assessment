# Bug Findings

Scope: Reviewed application, configuration, and data-layer files; excluded `src/tests/**`. UI reports A-D were checked in the running browser. Severity reflects likely impact in a deployed app.

## BUG-01: Project responses expose password hashes

- Category: Security
- Severity: High
- File/line: [project detail route](src/app/api/projects/%5Bid%5D/route.ts#L28), [member relation](src/app/api/projects/%5Bid%5D/route.ts#L30), [task relations](src/app/api/projects/%5Bid%5D/route.ts#L34)
- Reproduced: Yes. Navigating to a project returns `passwordHash` for the owner and all 4 project members in the JSON response.
- Description: The project query serializes complete owner, membership-user, assignee, and creator records, including password hashes. Any project member can retrieve these bcrypt hashes from the project response or browser developer tools, enabling offline password cracking.

## BUG-02: Task updates do not enforce project permissions

- Category: Security
- Severity: High
- File/line: [task update handler](src/app/api/tasks/%5Bid%5D/route.ts#L16), [task update write](src/app/api/tasks/%5Bid%5D/route.ts#L29)
- Description: `PATCH` checks only that the caller is authenticated and the task exists; it does not verify project membership or call `canEditTasks`, unlike the `DELETE` handler. An authenticated viewer or nonmember who obtains a task ID can change the task.

## BUG-03: Task search interpolates user input into SQL

- Category: Security
- Severity: High
- File/line: [task search query](src/app/api/projects/%5Bid%5D/tasks/route.ts#L31), [raw query execution](src/app/api/projects/%5Bid%5D/tasks/route.ts#L34)
- Description: The `q` query parameter is concatenated into SQL and executed with `$queryRawUnsafe`. Crafted search input can alter the query predicate and expose task records outside the selected project; use a parameterized query instead.

## BUG-04: Email uniqueness is case-sensitive and not enforced by the database

- Category: Data Integrity
- Severity: Medium
- File/line: [registration duplicate check](src/app/api/auth/register/route.ts#L17), [user email field](prisma/schema.prisma#L25)
- Reproduced: Yes. The UI accepted lowercase and uppercase versions of the same address with HTTP 201; the database also contains the reported `punit` case variants.
- Description: Registration checks only an exact email string, and the `User.email` column has no unique constraint; PostgreSQL treats differently cased strings as distinct. The same person can therefore create multiple accounts with one email address, and concurrent identical registrations can also race past the application check.


//Other Defects other than the top 4 defects:-


## BUG-05: Task APIs allow assigning work to nonmembers

- Category: Data Integrity
- Severity: Medium
- File/line: [task assignee input](src/schemas/task.ts#L10), [task creation write](src/app/api/projects/%5Bid%5D/tasks/route.ts#L79)
- Description: The create-task API accepts any `assigneeId` that satisfies the string schema and does not check whether that user belongs to the project. A crafted request can assign project work to an unrelated account even though the UI selector offers only project members.

## BUG-06: Concurrent task creation can produce duplicate positions

- Category: Data Integrity
- Severity: Medium
- File/line: [read current maximum position](src/app/api/projects/%5Bid%5D/tasks/route.ts#L67), [assign next position](src/app/api/projects/%5Bid%5D/tasks/route.ts#L81), [task indexes](prisma/schema.prisma#L85)
- Description: Task creation reads the current maximum position and writes the next value without a transaction or uniqueness constraint. Concurrent creates in the same project and status can receive identical positions, leaving their display order nondeterministic.

## BUG-07: Dashboard loads every task to display a count

- Category: Performance
- Severity: Medium
- File/line: [project list query](src/app/api/projects/route.ts#L16), [task count calculation](src/app/api/projects/route.ts#L29)
- Description: The project-list endpoint fetches every task row for each project only to calculate `taskCount` from the array length. This increases database transfer and server memory as projects grow; Prisma relation counts can return the same value without loading full task records.

## BUG-08: Airtable integration is only an in-memory mock

- Category: Architecture
- Severity: Medium
- File/line: [Airtable mock declaration](src/lib/airtable-mock.ts#L2), [in-memory record store](src/lib/airtable-mock.ts#L49)
- Description: The only Airtable client in the application is an in-memory test double, and no production route or service calls the official Airtable client. If Airtable synchronization is required, task changes currently remain in PostgreSQL and are never sent to Airtable; this finding depends on that integration being in scope.


//UI Defects:-

## BUG-09: UI headings are not in sentence case

- Category: UI
- Severity: Low
- File/line: [dashboard heading](src/app/dashboard/page.tsx#L38), [project heading](src/app/projects/%5Bid%5D/page.tsx#L97)
- Description:
	> When a user opens the dashboard and project page, the app renders headings such as “your projects” and “add a task” entirely in lowercase, but it should use sentence case (“Your projects” and “Add a task”).
- Reproduced: Yes, on the dashboard and project page.

## BUG-10: Add-task status options do not match board headers

- Category: UI
- Severity: Low
- File/line: [add-task status options](src/app/projects/%5Bid%5D/page.tsx#L120), [display status labels](src/types/index.ts#L42)
- Description:
	> When a user opens the add-task status dropdown, the app shows raw values such as “todo” and “in_progress” while the board headers show “To do” and “In progress,” but it should use the same readable labels in both places.
- Reproduced: Yes, on the Q3 Launch project page.

