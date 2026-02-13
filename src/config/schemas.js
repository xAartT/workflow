const sql = 
`
--
-- TOC entry 224 (class 1259 OID 73903)
-- Name: campos_setores; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.campos_setores (
    id integer NOT NULL,
    empresa_id integer NOT NULL,
    setor_id integer NOT NULL,
    nome character varying(50) NOT NULL,
    tipo character varying(20) NOT NULL,
    obrigatorio boolean DEFAULT false NOT NULL
);


--
-- TOC entry 223 (class 1259 OID 73902)
-- Name: campos_setores_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.campos_setores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4899 (class 0 OID 0)
-- Dependencies: 223
-- Name: campos_setores_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.campos_setores_id_seq OWNED BY public.campos_setores.id;


--
-- TOC entry 218 (class 1259 OID 73862)
-- Name: empresas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.empresas (
    id integer NOT NULL,
    nome character varying(100) NOT NULL,
    documento_responsavel text NOT NULL,
    valor_mensalidade numeric(10,2) DEFAULT 0 NOT NULL,
    quantidade_usuarios integer DEFAULT 1 NOT NULL,
    data_cadastro timestamp without time zone DEFAULT now() NOT NULL
);


--
-- TOC entry 217 (class 1259 OID 73861)
-- Name: empresas_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.empresas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4900 (class 0 OID 0)
-- Dependencies: 217
-- Name: empresas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.empresas_id_seq OWNED BY public.empresas.id;


--
-- TOC entry 226 (class 1259 OID 73921)
-- Name: itens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.itens (
    id integer NOT NULL,
    empresa_id integer NOT NULL,
    nome character varying(100) NOT NULL,
    valor_custo numeric(10,2) NOT NULL,
    valor_venda numeric(10,2) NOT NULL,
    ativo boolean DEFAULT true NOT NULL
);


--
-- TOC entry 225 (class 1259 OID 73920)
-- Name: itens_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.itens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4901 (class 0 OID 0)
-- Dependencies: 225
-- Name: itens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.itens_id_seq OWNED BY public.itens.id;


--
-- TOC entry 232 (class 1259 OID 73966)
-- Name: itens_pedidos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.itens_pedidos (
    id integer NOT NULL,
    pedido_id integer NOT NULL,
    item_id integer NOT NULL,
    quantidade integer NOT NULL,
    valor_unitario numeric(10,2) NOT NULL
);


--
-- TOC entry 231 (class 1259 OID 73965)
-- Name: itens_pedidos_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.itens_pedidos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4902 (class 0 OID 0)
-- Dependencies: 231
-- Name: itens_pedidos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.itens_pedidos_id_seq OWNED BY public.itens_pedidos.id;


--
-- TOC entry 228 (class 1259 OID 73934)
-- Name: itens_setores; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.itens_setores (
    id integer NOT NULL,
    item_id integer NOT NULL,
    setor_id integer NOT NULL,
    ordem integer NOT NULL
);


--
-- TOC entry 227 (class 1259 OID 73933)
-- Name: itens_setores_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.itens_setores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4903 (class 0 OID 0)
-- Dependencies: 227
-- Name: itens_setores_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.itens_setores_id_seq OWNED BY public.itens_setores.id;


--
-- TOC entry 230 (class 1259 OID 73951)
-- Name: pedidos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pedidos (
    id integer NOT NULL,
    empresa_id integer NOT NULL,
    cliente character varying(100) NOT NULL,
    valor_total numeric(10,2) DEFAULT 0 NOT NULL,
    cancelado boolean DEFAULT false NOT NULL,
    data_criacao timestamp without time zone DEFAULT now() NOT NULL
);


--
-- TOC entry 229 (class 1259 OID 73950)
-- Name: pedidos_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.pedidos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4904 (class 0 OID 0)
-- Dependencies: 229
-- Name: pedidos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.pedidos_id_seq OWNED BY public.pedidos.id;


--
-- TOC entry 234 (class 1259 OID 73983)
-- Name: progresso_itens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.progresso_itens (
    id integer NOT NULL,
    item_pedido_id integer NOT NULL,
    setor_id integer NOT NULL,
    iniciado_em timestamp without time zone,
    finalizado_em timestamp without time zone,
    concluido boolean DEFAULT false NOT NULL,
    dados jsonb
);


--
-- TOC entry 233 (class 1259 OID 73982)
-- Name: progresso_itens_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.progresso_itens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4905 (class 0 OID 0)
-- Dependencies: 233
-- Name: progresso_itens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.progresso_itens_id_seq OWNED BY public.progresso_itens.id;


--
-- TOC entry 236 (class 1259 OID 74008)
-- Name: sessoes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessoes (
    id integer NOT NULL,
    usuario_id integer NOT NULL,
    refresh_token text NOT NULL,
    ip text,
    user_agent text,
    criado_em timestamp without time zone DEFAULT now(),
    expira_em timestamp without time zone NOT NULL,
    ativo boolean DEFAULT true
);


--
-- TOC entry 235 (class 1259 OID 74007)
-- Name: sessoes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessoes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4906 (class 0 OID 0)
-- Dependencies: 235
-- Name: sessoes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessoes_id_seq OWNED BY public.sessoes.id;


--
-- TOC entry 222 (class 1259 OID 73890)
-- Name: setores; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.setores (
    id integer NOT NULL,
    empresa_id integer NOT NULL,
    nome character varying(50) NOT NULL,
    cor character varying(20),
    icone character varying(1)
);


--
-- TOC entry 221 (class 1259 OID 73889)
-- Name: setores_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.setores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4907 (class 0 OID 0)
-- Dependencies: 221
-- Name: setores_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.setores_id_seq OWNED BY public.setores.id;


--
-- TOC entry 220 (class 1259 OID 73874)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    empresa_id integer NOT NULL,
    nome character varying(100) NOT NULL,
    email text NOT NULL,
    login character varying(50) NOT NULL,
    senha_hash text NOT NULL,
    tipo character varying(20) DEFAULT 'funcionario'::character varying NOT NULL,
    data_cadastro timestamp without time zone DEFAULT now() NOT NULL,
    token text
);


--
-- TOC entry 219 (class 1259 OID 73873)
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4908 (class 0 OID 0)
-- Dependencies: 219
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- TOC entry 4695 (class 2604 OID 73906)
-- Name: campos_setores id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campos_setores ALTER COLUMN id SET DEFAULT nextval('public.campos_setores_id_seq'::regclass);


--
-- TOC entry 4686 (class 2604 OID 73865)
-- Name: empresas id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.empresas ALTER COLUMN id SET DEFAULT nextval('public.empresas_id_seq'::regclass);


--
-- TOC entry 4697 (class 2604 OID 73924)
-- Name: itens id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.itens ALTER COLUMN id SET DEFAULT nextval('public.itens_id_seq'::regclass);


--
-- TOC entry 4704 (class 2604 OID 73969)
-- Name: itens_pedidos id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.itens_pedidos ALTER COLUMN id SET DEFAULT nextval('public.itens_pedidos_id_seq'::regclass);


--
-- TOC entry 4699 (class 2604 OID 73937)
-- Name: itens_setores id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.itens_setores ALTER COLUMN id SET DEFAULT nextval('public.itens_setores_id_seq'::regclass);


--
-- TOC entry 4700 (class 2604 OID 73954)
-- Name: pedidos id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pedidos ALTER COLUMN id SET DEFAULT nextval('public.pedidos_id_seq'::regclass);


--
-- TOC entry 4705 (class 2604 OID 73986)
-- Name: progresso_itens id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.progresso_itens ALTER COLUMN id SET DEFAULT nextval('public.progresso_itens_id_seq'::regclass);


--
-- TOC entry 4707 (class 2604 OID 74011)
-- Name: sessoes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessoes ALTER COLUMN id SET DEFAULT nextval('public.sessoes_id_seq'::regclass);


--
-- TOC entry 4693 (class 2604 OID 73893)
-- Name: setores id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.setores ALTER COLUMN id SET DEFAULT nextval('public.setores_id_seq'::regclass);


--
-- TOC entry 4690 (class 2604 OID 73877)
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- TOC entry 4719 (class 2606 OID 73909)
-- Name: campos_setores campos_setores_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campos_setores
    ADD CONSTRAINT campos_setores_pkey PRIMARY KEY (id);


--
-- TOC entry 4711 (class 2606 OID 73872)
-- Name: empresas empresas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.empresas
    ADD CONSTRAINT empresas_pkey PRIMARY KEY (id);


--
-- TOC entry 4729 (class 2606 OID 73971)
-- Name: itens_pedidos itens_pedidos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.itens_pedidos
    ADD CONSTRAINT itens_pedidos_pkey PRIMARY KEY (id);


--
-- TOC entry 4722 (class 2606 OID 73927)
-- Name: itens itens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.itens
    ADD CONSTRAINT itens_pkey PRIMARY KEY (id);


--
-- TOC entry 4724 (class 2606 OID 73939)
-- Name: itens_setores itens_setores_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.itens_setores
    ADD CONSTRAINT itens_setores_pkey PRIMARY KEY (id);


--
-- TOC entry 4727 (class 2606 OID 73959)
-- Name: pedidos pedidos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT pedidos_pkey PRIMARY KEY (id);


--
-- TOC entry 4732 (class 2606 OID 73991)
-- Name: progresso_itens progresso_itens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.progresso_itens
    ADD CONSTRAINT progresso_itens_pkey PRIMARY KEY (id);


--
-- TOC entry 4734 (class 2606 OID 74017)
-- Name: sessoes sessoes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessoes
    ADD CONSTRAINT sessoes_pkey PRIMARY KEY (id);


--
-- TOC entry 4717 (class 2606 OID 73896)
-- Name: setores setores_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.setores
    ADD CONSTRAINT setores_pkey PRIMARY KEY (id);


--
-- TOC entry 4714 (class 2606 OID 73883)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- TOC entry 4720 (class 1259 OID 74004)
-- Name: idx_itens_empresa; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_itens_empresa ON public.itens USING btree (empresa_id);


--
-- TOC entry 4725 (class 1259 OID 74005)
-- Name: idx_pedidos_empresa; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_pedidos_empresa ON public.pedidos USING btree (empresa_id);


--
-- TOC entry 4730 (class 1259 OID 74006)
-- Name: idx_progresso_setor; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_progresso_setor ON public.progresso_itens USING btree (setor_id);


--
-- TOC entry 4715 (class 1259 OID 74003)
-- Name: idx_setores_empresa; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_setores_empresa ON public.setores USING btree (empresa_id);


--
-- TOC entry 4712 (class 1259 OID 74002)
-- Name: idx_usuarios_empresa; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_usuarios_empresa ON public.usuarios USING btree (empresa_id);


--
-- TOC entry 4737 (class 2606 OID 73910)
-- Name: campos_setores fk_campo_empresa; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campos_setores
    ADD CONSTRAINT fk_campo_empresa FOREIGN KEY (empresa_id) REFERENCES public.empresas(id) ON DELETE CASCADE;


--
-- TOC entry 4738 (class 2606 OID 73915)
-- Name: campos_setores fk_campo_setor; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.campos_setores
    ADD CONSTRAINT fk_campo_setor FOREIGN KEY (setor_id) REFERENCES public.setores(id) ON DELETE CASCADE;


--
-- TOC entry 4739 (class 2606 OID 73928)
-- Name: itens fk_item_empresa; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.itens
    ADD CONSTRAINT fk_item_empresa FOREIGN KEY (empresa_id) REFERENCES public.empresas(id) ON DELETE CASCADE;


--
-- TOC entry 4740 (class 2606 OID 73940)
-- Name: itens_setores fk_item_setor_item; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.itens_setores
    ADD CONSTRAINT fk_item_setor_item FOREIGN KEY (item_id) REFERENCES public.itens(id) ON DELETE CASCADE;


--
-- TOC entry 4741 (class 2606 OID 73945)
-- Name: itens_setores fk_item_setor_setor; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.itens_setores
    ADD CONSTRAINT fk_item_setor_setor FOREIGN KEY (setor_id) REFERENCES public.setores(id) ON DELETE CASCADE;


--
-- TOC entry 4744 (class 2606 OID 73977)
-- Name: itens_pedidos fk_itempedido_item; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.itens_pedidos
    ADD CONSTRAINT fk_itempedido_item FOREIGN KEY (item_id) REFERENCES public.itens(id);


--
-- TOC entry 4745 (class 2606 OID 73972)
-- Name: itens_pedidos fk_itempedido_pedido; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.itens_pedidos
    ADD CONSTRAINT fk_itempedido_pedido FOREIGN KEY (pedido_id) REFERENCES public.pedidos(id) ON DELETE CASCADE;


--
-- TOC entry 4742 (class 2606 OID 73960)
-- Name: pedidos fk_pedido_empresa; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT fk_pedido_empresa FOREIGN KEY (empresa_id) REFERENCES public.empresas(id) ON DELETE CASCADE;


--
-- TOC entry 4746 (class 2606 OID 73992)
-- Name: progresso_itens fk_progresso_itempedido; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.progresso_itens
    ADD CONSTRAINT fk_progresso_itempedido FOREIGN KEY (item_pedido_id) REFERENCES public.itens_pedidos(id) ON DELETE CASCADE;


--
-- TOC entry 4747 (class 2606 OID 73997)
-- Name: progresso_itens fk_progresso_setor; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.progresso_itens
    ADD CONSTRAINT fk_progresso_setor FOREIGN KEY (setor_id) REFERENCES public.setores(id) ON DELETE CASCADE;


--
-- TOC entry 4748 (class 2606 OID 74018)
-- Name: sessoes fk_sessao_usuario; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessoes
    ADD CONSTRAINT fk_sessao_usuario FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- TOC entry 4736 (class 2606 OID 73897)
-- Name: setores fk_setor_empresa; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.setores
    ADD CONSTRAINT fk_setor_empresa FOREIGN KEY (empresa_id) REFERENCES public.empresas(id) ON DELETE CASCADE;


--
-- TOC entry 4735 (class 2606 OID 73884)
-- Name: usuarios fk_usuario_empresa; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT fk_usuario_empresa FOREIGN KEY (empresa_id) REFERENCES public.empresas(id) ON DELETE CASCADE;


--
-- TOC entry 4743 (class 2606 OID 74023)
-- Name: pedidos pk_pedidos_to_empresas; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pedidos
    ADD CONSTRAINT pk_pedidos_to_empresas FOREIGN KEY (empresa_id) REFERENCES public.empresas(id);


INSERT INTO public.empresas (nome, documento_responsavel, valor_mensalidade, quantidade_usuarios)
VALUES ('Empresa Exemplo', '12345678900', 99.90, 10);

INSERT INTO public.usuarios (empresa_id, nome, email, login, senha_hash, tipo)
VALUES (1, 'Administrador', 'admin@empresaexemplo.com', 'admin', '$2a$12$rOzF2/jeNxV/iUFlgLPB3OTz4BRxUcuTNVqMw8GLg8LElannaoFwm', 'A');
`;

export default sql;