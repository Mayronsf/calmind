-- Create mood tracking table
create table public.mood_entries (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    mood_level integer not null check (mood_level >= 1 and mood_level <= 5),
    notes text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up RLS (Row Level Security)
alter table public.mood_entries enable row level security;

-- Create policy to allow users to view their own mood entries
create policy "Users can view their own mood entries"
    on public.mood_entries for select
    using (auth.uid() = user_id);

-- Create policy to allow users to insert their own mood entries
create policy "Users can insert their own mood entries"
    on public.mood_entries for insert
    with check (auth.uid() = user_id);

-- Create policy to allow users to update their own mood entries
create policy "Users can update their own mood entries"
    on public.mood_entries for update
    using (auth.uid() = user_id);

-- Create policy to allow users to delete their own mood entries
create policy "Users can delete their own mood entries"
    on public.mood_entries for delete
    using (auth.uid() = user_id); 