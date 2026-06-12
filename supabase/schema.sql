-- Rhema Supabase Schema
-- Run this in the Supabase SQL Editor for a new project.
-- This sets up user data (notes, highlights, studies) while the core Bible texts live in the app (or can be migrated later for search).

-- Enable extensions if needed
create extension if not exists "pg_trgm";  -- for trigram search on notes/text

-- Profiles (extends auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique,
  display_name text,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Personal Notes (tied to scripture reference like "John 1:1")
create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  ref text not null,                    -- e.g. "John 1:1" or "Genesis 1:1-5"
  content text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.notes enable row level security;

create policy "Users can CRUD own notes" on public.notes
  for all using (auth.uid() = user_id);

-- Highlights / annotations on specific words or ranges
create table if not exists public.highlights (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  ref text not null,                    -- passage or verse ref
  token_ids text[] ,                    -- array of word token ids e.g. ["j1-1-5"]
  color text default '#c5a26f',
  note text,                            -- optional short annotation
  created_at timestamptz default now()
);

alter table public.highlights enable row level security;

create policy "Users can CRUD own highlights" on public.highlights
  for all using (auth.uid() = user_id);

-- Saved Studies / Collections (group passages + personal insights)
create table if not exists public.studies (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  title text not null,
  refs text[] not null,                 -- array of refs e.g. ["John 1:1-5", "Genesis 1:1"]
  description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.studies enable row level security;

create policy "Users can CRUD own studies" on public.studies
  for all using (auth.uid() = user_id);

-- Optional: Word bookmarks or personal lexicon entries
create table if not exists public.word_bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  strongs text,                         -- e.g. "G3056"
  lemma text,
  note text,
  created_at timestamptz default now()
);

alter table public.word_bookmarks enable row level security;

create policy "Users can CRUD own word bookmarks" on public.word_bookmarks
  for all using (auth.uid() = user_id);

-- Indexes for performance
create index if not exists notes_ref_idx on public.notes (ref);
create index if not exists notes_user_ref_idx on public.notes (user_id, ref);
create index if not exists highlights_user_idx on public.highlights (user_id);

-- Trigger to update updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger notes_updated_at before update on public.notes
  for each row execute procedure public.handle_updated_at();

create trigger studies_updated_at before update on public.studies
  for each row execute procedure public.handle_updated_at();

-- Note: For the core Bible texts (original language + translations), we start with versioned files in the app (`data/bible/`).
-- Later we can load them into a `public.scripture` table or use Supabase for full-text search across everything.
-- This keeps the app fast, accurate, and respects licensing for original language datasets (SBLGNT, OSHB, etc.).
