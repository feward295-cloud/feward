create table post (
    id integer primary key,
    autor_id integer not null references contas(id) on delete cascade,
    titulo text,
    conteudo text,
    media_type text check (media_type in ('none', 'foto', 'video')) not null default 'none',
    media_url text,
    thumbnail_url text,
    created_at timestamp not null default current_timestamp
);