create type public.user_role as enum ('CUSTOMER','ADMIN','MASTER_ADMIN');
create type public.ticket_type as enum ('RETURN','REFUND','COMPLAINT');
create type public.ticket_status as enum ('OPEN','RESOLVED');
create table public.profiles (id uuid primary key references auth.users(id) on delete cascade, email text not null, role public.user_role not null default 'CUSTOMER', scopes text[] not null default '{}', phone text, address jsonb, created_at timestamptz not null default now());
create table public.products (id uuid primary key default gen_random_uuid(), name text not null, description text not null, price numeric(10,2) not null check(price >= 0), images text[] not null default '{}', available_colors text[] not null default '{}', available_materials text[] not null default '{}', category_tags text[] not null default '{}', lead_time_days int[] not null default '{3,5}', is_published boolean not null default false, created_at timestamptz not null default now());
create table public.reviews (id uuid primary key default gen_random_uuid(), product_id uuid not null references public.products(id) on delete cascade, user_id uuid not null references public.profiles(id) on delete cascade, rating int not null check(rating between 1 and 5), comment text not null, created_at timestamptz not null default now());
create table public.orders (id uuid primary key default gen_random_uuid(), customer_id uuid references public.profiles(id), status text not null default 'PROCESSING', total_amount numeric(10,2) not null, metadata jsonb not null default '{}', created_at timestamptz not null default now());
create table public.tickets (id uuid primary key default gen_random_uuid(), customer_id uuid not null references public.profiles(id), order_id uuid references public.orders(id), assigned_to uuid references public.profiles(id), type public.ticket_type not null, status public.ticket_status not null default 'OPEN', created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table public.ticket_messages (id uuid primary key default gen_random_uuid(), ticket_id uuid not null references public.tickets(id) on delete cascade, sender_id uuid not null references public.profiles(id), content text not null, created_at timestamptz not null default now());
create table public.blog_posts (id uuid primary key default gen_random_uuid(), title text not null, slug text unique not null, excerpt text not null, keywords text[] not null default '{}', read_time int not null default 5, content text not null, images text[] not null default '{}', author_id uuid references public.profiles(id), published boolean not null default false, created_at timestamptz not null default now());
alter table public.profiles enable row level security; alter table public.products enable row level security; alter table public.reviews enable row level security; alter table public.orders enable row level security; alter table public.tickets enable row level security; alter table public.ticket_messages enable row level security; alter table public.blog_posts enable row level security;
create policy "published products are public" on public.products for select using (is_published = true);
create policy "published blog is public" on public.blog_posts for select using (published = true);
create policy "users read own profile" on public.profiles for select using (auth.uid() = id);
create policy "users update own profile" on public.profiles for update using (auth.uid() = id);
create policy "users read own orders" on public.orders for select using (auth.uid() = customer_id);
create policy "users manage own tickets" on public.tickets for all using (auth.uid() = customer_id);
create policy "users read ticket messages" on public.ticket_messages for select using (exists(select 1 from public.tickets t where t.id = ticket_id and t.customer_id = auth.uid()));
create policy "users create reviews" on public.reviews for insert with check (auth.uid() = user_id);
create policy "users read reviews" on public.reviews for select using (true);

-- Admin access is scoped by the profile role. In production, keep these checks server-side
-- and never trust a role supplied by the client.
create or replace function public.is_admin() returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role in ('ADMIN','MASTER_ADMIN'));
$$;
create policy "admins manage products" on public.products for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage reviews" on public.reviews for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage orders" on public.orders for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage tickets" on public.tickets for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage ticket messages" on public.ticket_messages for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage profiles" on public.profiles for select using (public.is_admin());
create policy "admins manage blog" on public.blog_posts for all using (public.is_admin()) with check (public.is_admin());
