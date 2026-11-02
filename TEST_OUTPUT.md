# Part 2 test run before fixes

Command: `docker compose run --rm test`
Test file: `src/tests/part2.test.ts`

| Assertion | Result | Expected | Actual |
|---|---|---:|---:|
| A: a viewer cannot update a task | FAIL | 403 | 200 |
| B: a viewer cannot create a task | FAIL | 401 | 403 |
| C: a member can create a task | PASS | 201 | 201 |

**Summary:** 1 passed, 2 failed (3 total).

//Test A failed because the assertion was looking for the status code 403 Forbbiden. However the response was 200 (OK). This seems to be a coding issue.

//Test B failed because the assertion was for status code 401 Unauthorised. However, the response was 403 Forbbiden. This seems to be the testing logic issue. The statuscode needs to be correct to 403

# Part 2 test run after fixes

Command: `docker compose run --rm test`
Test file: `src/tests/part2.test.ts`

| Assertion | Result | Expected | Actual |
|---|---|---:|---:|
| A: a viewer cannot update a task | FAIL | 403 | 200 |
| B: a viewer cannot create a task | PASS | 403 | 403 |
| C: a member can create a task | PASS | 201 | 201 |

**Summary:** 2 passed, 1 failed (3 total).

//Test A failed because the assertion was looking for the status code 403 Forbbiden. However the response was 200 (OK). This seems to be a coding issue.

// Test B passed after modify the assertion status code to 403.

# Part 2 test run after adding multiple scenarios

Command: `docker compose run --rm test`
Test file: `src/tests/part2.test.ts`

| Scenario | Result | Expected | Actual |
|---|---|---|---|
| Login with valid credentials | PASS | HTTP 200, user and token returned | HTTP 200, user and token returned |
| Register page form | PASS | HTTP 200 with account form fields | HTTP 200 with account form fields |
| Project status dropdown labels | FAIL | `To do`, `In progress`, `In review`, `Done` | `todo`, `in_progress`, `review`, `done` |
| Lina cannot patch a Q3 task | FAIL | HTTP 403 | HTTP 200 |
| Lina's patch leaves the task title unchanged | FAIL | Original title unchanged | Title changed to `unauthorized Lina update attempt` |
| Viewer cannot update a task | FAIL | HTTP 403 | HTTP 200 |
| Viewer cannot create a task | PASS | HTTP 403 | HTTP 403 |
| Member can create a task | PASS | HTTP 201 | HTTP 201 |

**Summary:** Vitest reported 4 passed and 3 failed tests (7 tests total). The Lina test contains two failed assertions.
