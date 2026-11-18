-- The staff see every improvement suggestion that has come in, with who sent it, what it is about, when and how far
-- the admin has come with it, on their page on the site (/personal). They only read; the admin marks and removes.

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.role in ('staff', 'admin'));
$$;
revoke all on function public.is_staff() from public, anon;
grant execute on function public.is_staff() to authenticated;

drop policy if exists "Staff read suggestions" on public.site_suggestions;
create policy "Staff read suggestions" on public.site_suggestions
  for select to authenticated using ((select public.is_staff()));
