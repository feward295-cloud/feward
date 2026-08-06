<?php
// =============================================================
// Feward - auth.php
// POST /auth.php?acao=cadastro  { email, username, nome, senha }
// POST /auth.php?acao=login    { email, senha }
// GET  /auth.php?acao=eu       (requer Authorization: Bearer ...)
// =============================================================

require __DIR__ . '/config/db.php';

$acao = $_GET['acao'] ?? '';

if ($acao === 'cadastro') {
    exigir_metodo('POST');
    $input = json_input();

    $email    = trim($input['email'] ?? '');
    $username = trim($input['username'] ?? '');
    $nome     = trim($input['nome']     ?? '') ?: $username;
    $senha    = $input['senha'] ?? '';

    if (!filter_var($email, FILTER_VALIDATE_EMAIL))           responder('erro', 400, 'Email inválido.');
    if (strlen($username) < 3 || strlen($username) > 40)     responder('erro', 400, 'Username precisa ter 3-40 caracteres.');
    if (strlen($senha) < 6)                                  responder('erro', 400, 'Senha precisa ter pelo menos 6 caracteres.');

    $stmt = $pdo->prepare('SELECT id FROM contas WHERE email = ? OR username = ?');
    $stmt->execute([$email, $username]);
    if ($stmt->fetch()) responder('erro', 409, 'Email ou username já cadastrados.');

    $pdo->beginTransaction();
    try {
        $pdo->prepare(
            'INSERT INTO contas (email, username, nome, bio, avatar_cor) VALUES (?, ?, ?, ?, ?)'
        )->execute([
            $email,
            $username,
            $nome,
            'Olá, eu uso a Feward!',
            '#' . substr(md5($username), 0, 6),
        ]);

        $conta_id = (int)$pdo->lastInsertId();

        $token = bin2hex(random_bytes(32));
        $hash  = password_hash($senha, PASSWORD_BCRYPT);
        $pdo->prepare(
            'INSERT INTO sessoes (conta_id, senha_hash, token) VALUES (?, ?, ?)'
        )->execute([$conta_id, $hash, $token]);

        $pdo->commit();
    } catch (Throwable $e) {
        $pdo->rollBack();
        responder('erro', 500, 'Falha ao criar conta.');
    }

    responder('sucesso', 201, [
        'token'    => $token,
        'conta_id' => $conta_id,
        'username' => $username,
        'nome'     => $nome,
    ]);
}

if ($acao === 'login') {
    exigir_metodo('POST');
    $input = json_input();
    $email = trim($input['email'] ?? '');
    $senha = $input['senha'] ?? '';

    if (!$email || !$senha) responder('erro', 400, 'Email e senha são obrigatórios.');

    $stmt = $pdo->prepare('SELECT id, username, nome FROM contas WHERE email = ? LIMIT 1');
    $stmt->execute([$email]);
    $conta = $stmt->fetch();
    if (!$conta) responder('erro', 401, 'Email ou senha incorretos.');

    $stmt = $pdo->prepare('SELECT senha_hash FROM sessoes WHERE conta_id = ? LIMIT 1');
    $stmt->execute([$conta['id']]);
    $sessao = $stmt->fetch();
    if (!$sessao || !password_verify($senha, $sessao['senha_hash'])) {
        responder('erro', 401, 'Email ou senha incorretos.');
    }

    $token = bin2hex(random_bytes(32));
    $pdo->prepare('UPDATE sessoes SET token = ?, ultimo_acesso = NOW() WHERE conta_id = ?')
        ->execute([$token, $conta['id']]);

    responder('sucesso', 200, [
        'token'    => $token,
        'conta_id' => (int)$conta['id'],
        'username' => $conta['username'],
        'nome'     => $conta['nome'],
    ]);
}

if ($acao === 'eu') {
    exigir_metodo('GET');
    $user = autorizar($pdo);
    responder('sucesso', 200, [
        'conta_id' => (int)$user['conta_id'],
        'username' => $user['username'],
        'nome'     => $user['nome'],
        'email'    => $user['email'],
    ]);
}

responder('erro', 404, 'Ação desconhecida.');
