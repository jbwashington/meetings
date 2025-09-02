---
name: test-specialist-examples
description: Usage examples and patterns for the test specialist agent
---

# Test Specialist Agent - Usage Examples

## Example Prompts and Expected Behaviors

### 1. Creating Database Tests

**Prompt**: "Create pgTAP tests for the user profile RLS policies"

**Agent Response Pattern**:
```sql
-- supabase/tests/04_profile_rls_tests.sql
BEGIN;
SELECT plan(6);

-- Test: Users can read their own profile
SELECT test_helpers.create_test_user('user1@test.com') AS user1_id;
SELECT test_helpers.authenticate_as(user1_id);

SELECT ok(
    EXISTS(SELECT 1 FROM profiles WHERE id = user1_id),
    'User can read their own profile'
);

-- Test: Users cannot read other profiles (unless public)
SELECT test_helpers.create_test_user('user2@test.com') AS user2_id;

SELECT ok(
    NOT EXISTS(SELECT 1 FROM profiles WHERE id = user2_id AND is_public = false),
    'User cannot read private profiles of others'
);

-- Additional tests...
SELECT * FROM finish();
ROLLBACK;
```

### 2. Creating Integration Tests

**Prompt**: "Write integration tests for the team invitation flow"

**Agent Response Pattern**:
```typescript
// __tests__/integration/team-invitation.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('Team Invitation Flow', () => {
  let mockSupabase: ReturnType<typeof createClient>;
  
  beforeEach(() => {
    // Setup comprehensive mocks
    mockSupabase = {
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: { user: { id: 'owner-123', email: 'owner@test.com' } },
          error: null
        })
      },
      from: vi.fn().mockImplementation((table) => {
        if (table === 'team_invitations') {
          return {
            insert: vi.fn().mockReturnThis(),
            select: vi.fn().mockResolvedValue({
              data: { id: 'invite-123', status: 'pending' },
              error: null
            })
          };
        }
        // Handle other tables...
      })
    };
  });

  it('should create invitation for valid email', async () => {
    // Test implementation
  });

  it('should prevent duplicate invitations', async () => {
    // Test implementation
  });
});
```

### 3. Fixing Failing Tests

**Prompt**: "The auth test is failing with 'Cannot read property 'id' of undefined'"

**Agent Response Pattern**:
1. Identifies the issue: "The mock is not returning the expected user object structure"
2. Provides fix:
```typescript
// Fix: Ensure mock returns complete structure
mockSupabase.auth.getUser = vi.fn().mockResolvedValue({
  data: {
    user: {
      id: 'test-123',
      email: 'test@example.com',
      // Add all required properties
      app_metadata: {},
      user_metadata: {},
      created_at: new Date().toISOString()
    }
  },
  error: null
});
```
3. Explains: "The test was expecting a user object but the mock wasn't providing it in the correct structure"

### 4. Improving Test Coverage

**Prompt**: "Improve test coverage for the subscription management module"

**Agent Response Pattern**:
- Analyzes current coverage
- Identifies gaps
- Creates tests for:
  - Edge cases (expired cards, insufficient funds)
  - Error scenarios (network failures, invalid data)
  - State transitions (upgrade, downgrade, cancellation)
  - Webhook handling

### 5. Setting Up Test Infrastructure

**Prompt**: "Setup testing infrastructure for a new feature module"

**Agent Response Pattern**:
1. Creates test file structure:
```
__tests__/
  unit/
    feature/
      validation.test.ts
      utils.test.ts
  integration/
    feature/
      api.test.ts
      workflow.test.ts
supabase/tests/
  05_feature_database.sql
```

2. Provides boilerplate with proper mocking setup
3. Creates test data factories
4. Sets up CI/CD pipeline updates

## Advanced Usage Patterns

### Pattern 1: Test Data Builders

```typescript
// __tests__/helpers/builders.ts
class UserBuilder {
  private user = {
    id: 'test-user-123',
    email: 'test@example.com',
    role: 'athlete'
  };

  withRole(role: string) {
    this.user.role = role;
    return this;
  }

  withStripeCustomer() {
    this.user.stripe_customer_id = 'cus_test123';
    return this;
  }

  build() {
    return this.user;
  }
}

// Usage in tests
const coach = new UserBuilder().withRole('coach').build();
```

### Pattern 2: Custom Assertions

```typescript
// __tests__/helpers/assertions.ts
expect.extend({
  toBeValidEmail(received: string) {
    const pass = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(received);
    return {
      pass,
      message: () => `Expected ${received} to be a valid email`
    };
  }
});

// Usage
expect(user.email).toBeValidEmail();
```

### Pattern 3: Database Test Helpers

```sql
-- supabase/tests/helpers/data_generators.sql
CREATE OR REPLACE FUNCTION test_helpers.create_test_team(
    owner_id uuid,
    team_name text DEFAULT 'Test Team'
) RETURNS uuid AS $$
DECLARE
    team_id uuid;
BEGIN
    INSERT INTO teams (name, created_by)
    VALUES (team_name, owner_id)
    RETURNING id INTO team_id;
    
    -- Auto-add owner as admin
    INSERT INTO team_members (team_id, user_id, role)
    VALUES (team_id, owner_id, 'admin');
    
    RETURN team_id;
END;
$$ LANGUAGE plpgsql;
```

## Debugging Test Failures

### Common Scenarios

1. **"Test times out"**
   - Check for missing mock resolutions
   - Verify async operations complete
   - Look for infinite loops in mocks

2. **"Cannot find module"**
   - Verify import paths
   - Check mock setup order
   - Ensure module exports match

3. **"RLS policy blocks operation"**
   - Verify authentication in test
   - Check user roles
   - Review policy conditions

4. **"Mock not called"**
   - Verify mock is properly connected
   - Check execution path
   - Review mock implementation

## Performance Optimization

### Database Tests
- Use prepared statements
- Minimize setup/teardown operations
- Run independent tests in parallel
- Use partial indexes for test data

### Integration Tests
- Share expensive setup between tests
- Use test.concurrent for parallel execution
- Mock heavy operations
- Cache compiled test files

## CI/CD Integration

### Optimized GitHub Actions
```yaml
strategy:
  matrix:
    test-suite: [unit, integration, database]
  fail-fast: false

steps:
  - name: Run ${{ matrix.test-suite }} tests
    run: |
      case ${{ matrix.test-suite }} in
        unit)
          bun test __tests__/unit --coverage
          ;;
        integration)
          supabase start
          bun test __tests__/integration
          ;;
        database)
          psql -f supabase/tests/*.sql
          ;;
      esac
```

## Troubleshooting Guide

### Issue: Tests pass locally but fail in CI
**Solutions**:
1. Check environment variables
2. Verify service versions match
3. Review timezone differences
4. Check for hardcoded paths

### Issue: Flaky tests
**Solutions**:
1. Remove time-dependent assertions
2. Use proper wait utilities
3. Mock external services
4. Ensure test isolation

### Issue: Slow test execution
**Solutions**:
1. Parallelize independent tests
2. Reduce database operations
3. Use test doubles instead of real services
4. Optimize beforeEach setup