-- Fix: run statements separately. 1/7: List all tables with RLS enabled and their row_security flag
SELECT n.nspname AS schema_name,
       c.relname AS table_name,
       c.relrowsecurity AS rls_enabled,
       c.relacl IS NOT NULL AS has_acl
FROM pg_class c
JOIN pg_namespace n ON c.relnamespace = n.oid
WHERE c.relkind = 'r'
  AND n.nspname NOT IN ('pg_catalog','information_schema')
ORDER BY n.nspname, c.relname;

-- 2/7: List all policies (full) across the DB
SELECT n.nspname AS schema_name,
       c.relname AS table_name,
       p.polname AS policy_name,
       p.polcmd AS for_command,
       pg_get_expr(p.polqual, p.polrelid) AS using_expression,
       pg_get_expr(p.polwithcheck, p.polrelid) AS with_check_expression,
       (SELECT string_agg(rolname, ',') FROM pg_roles WHERE oid = ANY(p.polroles)) AS roles
FROM pg_policy p
JOIN pg_class c ON p.polrelid = c.oid
JOIN pg_namespace n ON c.relnamespace = n.oid
ORDER BY n.nspname, c.relname, p.polname;

-- 3/7: List all triggers
SELECT n.nspname AS schema_name,
       t.tgname AS trigger_name,
       c.relname AS table_name,
       pg_get_triggerdef(t.oid) AS trigger_definition
FROM pg_trigger t
JOIN pg_class c ON t.tgrelid = c.oid
JOIN pg_namespace n ON c.relnamespace = n.oid
WHERE NOT t.tgisinternal
ORDER BY n.nspname, c.relname, t.tgname;

-- Workaround: use regexp_match on prosrc for pg_proc entries (covers non SQL-language too). 4/7
SELECT n.nspname AS schema_name,
       p.proname AS function_name,
       pg_get_functiondef(p.oid) AS definition
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE p.prosrc ~* 'auth\.uid\(|auth\.jwt\(|realtime\.broadcast_changes\('
ORDER BY n.nspname, p.proname;

-- 5/7: List indexes on key tables (auth.users, storage.objects, realtime.messages, public.* selected)
SELECT n.nspname AS schema_name,
       t.relname AS table_name,
       i.relname AS index_name,
       pg_get_indexdef(i.oid) AS index_def
FROM pg_index ix
JOIN pg_class i ON i.oid = ix.indexrelid
JOIN pg_class t ON t.oid = ix.indrelid
JOIN pg_namespace n ON t.relnamespace = n.oid
WHERE n.nspname NOT IN ('pg_catalog','information_schema')
  AND t.relname IN ('users','objects','messages','profiles','community_posts','storage_objects','buckets','sessions')
ORDER BY n.nspname, t.relname, i.relname;

-- 6/7: List roles and memberships
SELECT r.rolname,
       r.rolsuper,
       r.rolcreaterole,
       r.rolcanlogin,
       array_to_string(array(SELECT b.rolname FROM pg_auth_members m JOIN pg_roles b ON m.roleid = b.oid WHERE m.member = r.oid), ',') AS member_of
FROM pg_roles r
ORDER BY r.rolname;

-- 7/7: List ownership and grants for schemas
SELECT nspname, pg_catalog.pg_get_userbyid(nspowner) AS owner
FROM pg_namespace
WHERE nspname NOT LIKE 'pg_%' AND nspname <> 'information_schema'
ORDER BY nspname;