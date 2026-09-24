-- Chạy trong Supabase SQL Editor để khởi tạo bảng "tasks"

create table if not exists public.tasks (
  id text primary key,
  title text not null,
  assignee text not null,
  category text not null default 'Frontend',
  status text not null default 'To-do' check (status in ('To-do', 'In Progress', 'Done')),
  priority text not null default 'Medium' check (priority in ('High', 'Medium', 'Low')),
  "dueDate" date not null,
  description text,
  created_at timestamp with time zone default now(),
  user_id uuid references auth.users (id) default auth.uid()
);

alter table public.tasks enable row level security;

-- Mỗi người dùng chỉ thấy và thao tác trên task của chính mình
create policy "Users can view own tasks"
  on public.tasks for select
  using (auth.uid() = user_id);

create policy "Users can insert own tasks"
  on public.tasks for insert
  with check (auth.uid() = user_id);

create policy "Users can update own tasks"
  on public.tasks for update
  using (auth.uid() = user_id);

create policy "Users can delete own tasks"
  on public.tasks for delete
  using (auth.uid() = user_id);

-- (Tuỳ chọn) import nhanh dữ liệu mẫu từ src/data/mockData.json qua Table Editor > Insert > Import CSV/JSON
