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

