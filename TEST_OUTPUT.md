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

// Login with valid credentials passed. This test was added by Punit as an addition scenario to be tested
// Register page tested passed. This test was added by Punit as an addition scenario to be tested
// Project status dropdown labels failed as the dropdown option and the label are not matching. This test was added by Punit as an addition scenario to be tested
// Both test Scenarios failed for User Lina. First failuer is due to the status code as Lina should not able to fetech Q3 task since she is not the member of that project and system should have returned 403 forbidden error. But Lina was able to view the Q3 task and the system returned 200 Ok code. This task could not be performed at the UI level but at the backend code, the application is allowing such opertaion as the `PATCH` checks only that the caller is authenticated and the task exists; it does not verify project membership or call `canEditTasks`, unlike the `DELETE` handler. An authenticated viewer or nonmember who obtains a task ID can change the task. Due to this the second assertion related to the validation of the title change for Lina's patch also failed.
//Test A failed because the assertion was looking for the status code 403 Forbbiden. However the response was 200 (OK). This seems to be a coding issue.
// Test B passed after modify the assertion status code to 403 in the previous commit.
// Test C is always passing from first commit
