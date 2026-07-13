-- Verify RLS Policies Deployment
-- This script checks if policies are working correctly

-- 1. Count total policies
SELECT 'Total Policies' as metric, COUNT(*) as count FROM pg_policy;

-- 2. List policies by table
SELECT 
    n.nspname as schema_name,
    c.relname as table_name,
    COUNT(p.polname) as policy_count
FROM pg_policy p
JOIN pg_class c ON p.polrelid = c.oid
JOIN pg_namespace n ON c.relnamespace = n.oid
GROUP BY n.nspname, c.relname
ORDER BY policy_count DESC;

-- 3. Check key tables have policies
SELECT 'Tables with Policies' as status, COUNT(*) as count
FROM pg_class c
JOIN pg_namespace n ON c.relnamespace = n.oid
WHERE c.relkind = 'r'
  AND n.nspname = 'public'
  AND EXISTS (SELECT 1 FROM pg_policy p WHERE p.polrelid = c.oid);

-- 4. Test RLS is enabled on key tables
SELECT 
    c.relname as table_name,
    c.relrowsecurity as rls_enabled
FROM pg_class c
JOIN pg_namespace n ON c.relnamespace = n.oid
WHERE c.relkind = 'r'
  AND n.nspname = 'public'
  AND c.relname IN ('profiles', 'user_progress', 'achievements', 'study_groups')
ORDER BY c.relname;

-- 5. Check if service role has bypass capability
SELECT 'Service Role Bypass' as status, rolbypassrls as can_bypass_rls
FROM pg_roles 
WHERE rolname = 'service_role';
