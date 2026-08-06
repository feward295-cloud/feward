-- =============================================================
-- Feward - schema MySQL/MariaDB
-- Compatível: MySQL 5.7+ / MariaDB 10.3+
-- Charset: utf8mb4 (suporta emoji)
-- =============================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- -------------------------------------------------------------
-- 1. Contas (usuários)
-- -------------------------------------------------------------
DROP TABLE IF EXISTS contas;
CREATE TABLE contas (
    id              INT UNSIGNED NOT NULL AUTO_INCREMENT,
    email           VARCHAR(190) NOT NULL,
    username        VARCHAR(40)  NOT NULL,
    nome            VARCHAR(80)  NOT NULL,
    bio             TEXT         NULL,
    avatar_cor      VARCHAR(7)   NOT NULL DEFAULT '#3b63ff',
    criado_em       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_contas_email (email),
    UNIQUE KEY uk_contas_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 2. Credenciais + tokens de sessão
--    (separado de contas pra nunca devolver hash por acidente)
-- -------------------------------------------------------------
DROP TABLE IF EXISTS sessoes;
CREATE TABLE sessoes (
    id              INT UNSIGNED NOT NULL AUTO_INCREMENT,
    conta_id        INT UNSIGNED NOT NULL,
    senha_hash      VARCHAR(255) NOT NULL,
    token           VARCHAR(80)  NOT NULL,
    criado_em       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ultimo_acesso   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_sessoes_token (token),
    KEY ix_sessoes_conta (conta_id),
    CONSTRAINT fk_sessoes_conta
        FOREIGN KEY (conta_id) REFERENCES contas(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 3. Comunidades
-- -------------------------------------------------------------
DROP TABLE IF EXISTS comunidades;
CREATE TABLE comunidades (
    id              INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nome            VARCHAR(80)  NOT NULL,
    slug            VARCHAR(80)  NOT NULL,
    criador_id      INT UNSIGNED NOT NULL,
    criado_em       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_comunidades_slug (slug),
    KEY ix_comunidades_criador (criador_id),
    CONSTRAINT fk_comunidades_criador
        FOREIGN KEY (criador_id) REFERENCES contas(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 4. Membros das comunidades
-- -------------------------------------------------------------
DROP TABLE IF EXISTS membros_comunidade;
CREATE TABLE membros_comunidade (
    comunidade_id   INT UNSIGNED NOT NULL,
    conta_id        INT UNSIGNED NOT NULL,
    entrou_em       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (comunidade_id, conta_id),
    KEY ix_membros_conta (conta_id),
    CONSTRAINT fk_membros_comunidade
        FOREIGN KEY (comunidade_id) REFERENCES comunidades(id) ON DELETE CASCADE,
    CONSTRAINT fk_membros_conta
        FOREIGN KEY (conta_id) REFERENCES contas(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 5. Posts
-- -------------------------------------------------------------
DROP TABLE IF EXISTS posts;
CREATE TABLE posts (
    id              INT UNSIGNED NOT NULL AUTO_INCREMENT,
    autor_id        INT UNSIGNED NOT NULL,
    comunidade_id   INT UNSIGNED NULL,
    conteudo        TEXT         NOT NULL,
    media_url       VARCHAR(255) NULL,
    media_tipo      ENUM('none','foto','video') NOT NULL DEFAULT 'none',
    criado_em       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY ix_posts_autor (autor_id),
    KEY ix_posts_comunidade (comunidade_id),
    KEY ix_posts_criado (criado_em),
    CONSTRAINT fk_posts_autor
        FOREIGN KEY (autor_id) REFERENCES contas(id) ON DELETE CASCADE,
    CONSTRAINT fk_posts_comunidade
        FOREIGN KEY (comunidade_id) REFERENCES comunidades(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 6. Likes
-- -------------------------------------------------------------
DROP TABLE IF EXISTS likes;
CREATE TABLE likes (
    conta_id        INT UNSIGNED NOT NULL,
    post_id         INT UNSIGNED NOT NULL,
    criado_em       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (conta_id, post_id),
    KEY ix_likes_post (post_id),
    CONSTRAINT fk_likes_conta
        FOREIGN KEY (conta_id) REFERENCES contas(id) ON DELETE CASCADE,
    CONSTRAINT fk_likes_post
        FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 7. Comentários
-- -------------------------------------------------------------
DROP TABLE IF EXISTS comentarios;
CREATE TABLE comentarios (
    id              INT UNSIGNED NOT NULL AUTO_INCREMENT,
    post_id         INT UNSIGNED NOT NULL,
    autor_id        INT UNSIGNED NOT NULL,
    texto           TEXT         NOT NULL,
    criado_em       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY ix_comentarios_post (post_id),
    KEY ix_comentarios_autor (autor_id),
    CONSTRAINT fk_comentarios_post
        FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    CONSTRAINT fk_comentarios_autor
        FOREIGN KEY (autor_id) REFERENCES contas(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 8. Salvos (favoritos)
-- -------------------------------------------------------------
DROP TABLE IF EXISTS salvos;
CREATE TABLE salvos (
    conta_id        INT UNSIGNED NOT NULL,
    post_id         INT UNSIGNED NOT NULL,
    criado_em       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (conta_id, post_id),
    KEY ix_salvos_post (post_id),
    CONSTRAINT fk_salvos_conta
        FOREIGN KEY (conta_id) REFERENCES contas(id) ON DELETE CASCADE,
    CONSTRAINT fk_salvos_post
        FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 9. Mensagens (DM 1-1)
-- -------------------------------------------------------------
DROP TABLE IF EXISTS mensagens;
CREATE TABLE mensagens (
    id              INT UNSIGNED NOT NULL AUTO_INCREMENT,
    de_id           INT UNSIGNED NOT NULL,
    para_id         INT UNSIGNED NOT NULL,
    texto           TEXT         NOT NULL,
    lida            TINYINT(1)   NOT NULL DEFAULT 0,
    criado_em       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY ix_mensagens_de_para (de_id, para_id, criado_em),
    KEY ix_mensagens_para_de (para_id, de_id, criado_em),
    CONSTRAINT fk_mensagens_de
        FOREIGN KEY (de_id) REFERENCES contas(id) ON DELETE CASCADE,
    CONSTRAINT fk_mensagens_para
        FOREIGN KEY (para_id) REFERENCES contas(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 10. Notificações
-- -------------------------------------------------------------
DROP TABLE IF EXISTS notificacoes;
CREATE TABLE notificacoes (
    id              INT UNSIGNED NOT NULL AUTO_INCREMENT,
    conta_id        INT UNSIGNED NOT NULL,                 -- destinatário
    tipo            ENUM('like','comentario','seguir','mensagem') NOT NULL,
    de_id           INT UNSIGNED NOT NULL,                 -- quem gerou
    post_id         INT UNSIGNED NULL,
    comentario_id   INT UNSIGNED NULL,
    lida            TINYINT(1)   NOT NULL DEFAULT 0,
    criado_em       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY ix_notificacoes_conta (conta_id, lida, criado_em),
    KEY ix_notificacoes_de (de_id),
    CONSTRAINT fk_notificacoes_conta
        FOREIGN KEY (conta_id) REFERENCES contas(id) ON DELETE CASCADE,
    CONSTRAINT fk_notificacoes_de
        FOREIGN KEY (de_id) REFERENCES contas(id) ON DELETE CASCADE,
    CONSTRAINT fk_notificacoes_post
        FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE SET NULL,
    CONSTRAINT fk_notificacoes_comentario
        FOREIGN KEY (comentario_id) REFERENCES comentarios(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 11. Seguidores (follow 1-1 entre contas)
-- -------------------------------------------------------------
DROP TABLE IF EXISTS seguidores;
CREATE TABLE seguidores (
    seguidor_id     INT UNSIGNED NOT NULL,         -- quem segue
    seguindo_id     INT UNSIGNED NOT NULL,         -- quem é seguido
    criado_em       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (seguidor_id, seguindo_id),
    KEY ix_seguidores_seguindo (seguindo_id),
    CONSTRAINT fk_seguidores_seguidor
        FOREIGN KEY (seguidor_id) REFERENCES contas(id) ON DELETE CASCADE,
    CONSTRAINT fk_seguidores_seguindo
        FOREIGN KEY (seguindo_id) REFERENCES contas(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;

-- =============================================================
-- Dados iniciais (seed mínimo pra testar)
-- =============================================================

-- Senhas em bcrypt: 'senha123' pro criador, 'abc456' pro admin
INSERT INTO contas (email, username, nome, bio, avatar_cor) VALUES
    ('criador@feward.com', 'ddrk',    'Pedro Rafael', 'Gosto de minecraft e fnaf. Criador da Feward.', '#ff3b30'),
    ('admin@feward.com',   'nullira', 'Christopher',  'Adm da Feward.', '#3b63ff'),
    ('tony@feward.com',    'tony',    'Tony',         'Ajudou na identidade visual.', '#7c3aed');

-- sessoes.senha_hash é placeholder — o auth.php sobrescreve no primeiro login
INSERT INTO sessoes (conta_id, senha_hash, token) VALUES
    (1, '$2y$10$placeholder_hash_atualizar_no_primeiro_login_xxxxxxxxxxxxxxxx', 'token_seed_creator'),
    (2, '$2y$10$placeholder_hash_atualizar_no_primeiro_login_xxxxxxxxxxxxxxxx', 'token_seed_admin'),
    (3, '$2y$10$placeholder_hash_atualizar_no_primeiro_login_xxxxxxxxxxxxxxxx', 'token_seed_tony');
