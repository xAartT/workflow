-- ============================================
-- CRIAÇÃO DAS TABELAS
-- ============================================

-- =========================
-- EMPRESAS (TENANTS)
-- =========================
create table empresas (
    id serial primary key,
    nome varchar(100) not null,
    documento_responsavel text not null,
    valor_mensalidade numeric(10,2) not null default 0,
    quantidade_usuarios integer not null default 1,
    data_cadastro timestamp not null default now()
);

-- =========================
-- USUÁRIOS
-- =========================
create table usuarios (
    id serial primary key,
    empresa_id integer not null,
    nome varchar(100) not null,
    email text not null,
    login varchar(50) not null,
    senha_hash text not null,
    tipo varchar(20) not null default 'funcionario',
    data_cadastro timestamp not null default now(),
    
    constraint fk_usuario_empresa
        foreign key (empresa_id)
        references empresas(id)
        on delete cascade
);

-- =========================
-- SETORES (ETAPAS DO FLUXO)
-- =========================
create table setores (
    id serial primary key,
    empresa_id integer not null,
    nome varchar(50) not null,
    ordem integer not null, -- define ordem do fluxo
    tempo_estimado_minutos integer default 0,
    
    constraint fk_setor_empresa
        foreign key (empresa_id)
        references empresas(id)
        on delete cascade
);

-- =========================
-- CAMPOS PERSONALIZADOS DO SETOR
-- (definidos por cada empresa)
-- =========================
create table campos_setores (
    id serial primary key,
    empresa_id integer not null,
    setor_id integer not null,
    nome varchar(50) not null,
    tipo varchar(20) not null, -- texto, numero, boolean, select
    obrigatorio boolean not null default false,
    
    constraint fk_campo_empresa
        foreign key (empresa_id)
        references empresas(id)
        on delete cascade,
        
    constraint fk_campo_setor
        foreign key (setor_id)
        references setores(id)
        on delete cascade
);

-- =========================
-- ITENS (PRODUTOS)
-- =========================
create table itens (
    id serial primary key,
    empresa_id integer not null,
    nome varchar(100) not null,
    valor_custo numeric(10,2) not null,
    valor_venda numeric(10,2) not null,
    ativo boolean not null default true,
    
    constraint fk_item_empresa
        foreign key (empresa_id)
        references empresas(id)
        on delete cascade
);

-- =========================
-- RELAÇÃO ITEM x SETORES
-- Define por quais setores um item deve passar
-- =========================
create table itens_setores (
    id serial primary key,
    item_id integer not null,
    setor_id integer not null,
    ordem integer not null,
    
    constraint fk_item_setor_item
        foreign key (item_id)
        references itens(id)
        on delete cascade,
        
    constraint fk_item_setor_setor
        foreign key (setor_id)
        references setores(id)
        on delete cascade
);

-- =========================
-- PEDIDOS
-- =========================
create table pedidos (
    id serial primary key,
    empresa_id integer not null,
    cliente varchar(100) not null,
    valor_total numeric(10,2) not null default 0,
    cancelado boolean not null default false,
    data_criacao timestamp not null default now(),
    
    constraint fk_pedido_empresa
        foreign key (empresa_id)
        references empresas(id)
        on delete cascade
);

-- =========================
-- ITENS DO PEDIDO
-- =========================
create table itens_pedidos (
    id serial primary key,
    pedido_id integer not null,
    item_id integer not null,
    quantidade integer not null,
    valor_unitario numeric(10,2) not null,
    
    constraint fk_itempedido_pedido
        foreign key (pedido_id)
        references pedidos(id)
        on delete cascade,
        
    constraint fk_itempedido_item
        foreign key (item_id)
        references itens(id)
);

-- =========================
-- CONTROLE DE PROGRESSO DO ITEM NO SETOR
-- (a parte mais importante do sistema)
-- =========================
create table progresso_itens (
    id serial primary key,
    item_pedido_id integer not null,
    setor_id integer not null,
    iniciado_em timestamp,
    finalizado_em timestamp,
    concluido boolean not null default false,
    dados jsonb, -- aqui ficam os campos preenchidos pelo funcionário
    
    constraint fk_progresso_itempedido
        foreign key (item_pedido_id)
        references itens_pedidos(id)
        on delete cascade,
        
    constraint fk_progresso_setor
        foreign key (setor_id)
        references setores(id)
        on delete cascade
);

alter table pedidos
	add column empresa_id integer not null;

alter table pedidos
	add constraint pk_pedidos_to_empresas foreign key (empresa_id)
	references empresas(id);

-- ============================================
-- INDEXES IMPORTANTES
-- ============================================

create index idx_usuarios_empresa on usuarios(empresa_id);
create index idx_setores_empresa on setores(empresa_id);
create index idx_itens_empresa on itens(empresa_id);
create index idx_pedidos_empresa on pedidos(empresa_id);
create index idx_progresso_setor on progresso_itens(setor_id);