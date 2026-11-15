-- The visual editor's element styles (lib/site/styles.ts) are kept under the document's own top-level part "styles",
-- so the content saves may write there too. Otherwise the same as in the content functions.
create or replace function private.content_path_ok(p_path text[])
returns boolean
language sql
immutable
as $$
  select coalesce(array_length(p_path, 1), 0) between 1 and 12
    and p_path[1] = any (array['settings', 'company', 'navigation', 'footer', 'form', 'ui', 'servicePage', 'notFound',
                               'services', 'uppdrag', 'certificates', 'pages', 'styles'])
    and not exists (select 1 from unnest(p_path) part where part !~ '^[A-Za-z0-9_-]{1,64}$');
$$;
