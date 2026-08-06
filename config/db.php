<?php
// =============================================================
// Feward - Conexão PDO MySQL + helpers de resposta JSON + CORS
// Coloque este arquivo em /config/db.php dentro da hospedagem.
// Configure as 4 variáveis abaixo (use o painel da Hostinger).
// =============================================================

declare(strict_types=1);

// ---------- CORS ----------
// Origens permitidas: GitHub Pages (Feward) + localhost (dev) + o domínio
// onde este back está rodando. Adicione mais origens se precisar.
$ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'http://localhost:4173',
    'http://127.0.0.1:5173',
    'https://ddrk-19.github.io',     // troque pelo seu user do GitHub + repo
    'https://feward.com.br',          // troque pelo seu domínio, se for o caso
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $ALLOWED_ORIGINS, true)) {
    header("Access-Control-Allow-Origin: $origin");
    header('Access-Control-Allow-Credentials: true');
    header('Vary: Origin');
}
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ---------- Erros ----------
ini_set('display_errors', '0');
ini_set('log_errors', '1');
error_reporting(E_ALL);

// ---------- Banco ----------
// Na Hostinger, esses 4 valores vêm do painel "Bancos de Dados MySQL".
// Você pode sobrescrever via variável de ambiente pra não commitar.
$DB_HOST = getenv('FEWARD_DB_HOST') ?: 'localhost';
$DB_NAME = getenv('FEWARD_DB_NAME') ?: 'feward';
$DB_USER = getenv('FEWARD_DB_USER') ?: 'feward_user';
$DB_PASS = getenv('FEWARD_DB_PASS') ?: 'feward_pass';

try {
    $pdo = new PDO(
        "mysql:host=$DB_HOST;dbname=$DB_NAME;charset=utf8mb4",
        $DB_USER,
        $DB_PASS,
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]
    );
    $pdo->exec("SET NAMES utf8mb4");
} catch (Throwable $e) {
    responder('erro', 500, 'Falha ao conectar no banco de dados.');
}

// ---------- Helpers ----------

function responder(string $campo, int $codigo, $conteudo): void {
    http_response_code($codigo);
    echo json_encode([$campo => $conteudo], JSON_UNESCAPED_UNICODE);
    exit;
}

function json_input(): array {
    $raw = file_get_contents('php://input') ?: '';
    if (!$raw) return [];
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function exigir_metodo(string $metodo): void {
    if (strtoupper($_SERVER['REQUEST_METHOD'] ?? '') !== strtoupper($metodo)) {
        responder('erro', 405, 'Método não permitido.');
    }
}

function token(): ?string {
    $h = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (!$h) $h = $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
    if (preg_match('/^Bearer\s+(.+)$/i', $h, $m)) return $m[1];
    // Fallback: ?token= na query (útil pra <img> e curl)
    return $_GET['token'] ?? null;
}

/**
 * Procura o token no header Authorization e devolve {conta_id, username}
 * ou encerra a request com 401.
 */
function autorizar(PDO $pdo): array {
    $tk = token();
    if (!$tk) responder('erro', 401, 'Token ausente.');

    $stmt = $pdo->prepare(
        'SELECT s.conta_id, s.ultimo_acesso, c.username, c.nome, c.email
           FROM sessoes s
           JOIN contas c ON c.id = s.conta_id
          WHERE s.token = :token
          LIMIT 1'
    );
    $stmt->execute(['token' => $tk]);
    $row = $stmt->fetch();
    if (!$row) responder('erro', 401, 'Token inválido.');

    $pdo->prepare('UPDATE sessoes SET ultimo_acesso = NOW() WHERE conta_id = :id')
        ->execute(['id' => $row['conta_id']]);

    return $row;
}
