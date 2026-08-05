 <?php
require 'config/db.php';
header('Content-Type: application/json');

$autor_id      = $_POST['autor_id'] ?? null;
$comunidade_id = $_POST['comunidade_id'] ?? null;
$titulo        = $_POST['titulo'] ?? null;
$conteudo      = $_POST['conteudo'] ?? null;
$media_type    = 'none';
$media_url     = null;

if (!$autor_id) {
    http_response_code(400);
    die(json_encode(['erro' => 'autor_id é obrigatório']));
}

// Upload de mídia (foto ou vídeo)
if (isset($_FILES['media']) && $_FILES['media']['error'] === UPLOAD_ERR_OK) {
    $tipoMime = mime_content_type($_FILES['media']['tmp_name']);
    $media_type = str_starts_with($tipoMime, 'video/') ? 'video' : 'foto';

    $pastaDestino = __DIR__ . '/uploads/';
    $nomeArquivo  = uniqid() . '_' . basename($_FILES['media']['name']);
    $caminhoFinal = $pastaDestino . $nomeArquivo;

    if (move_uploaded_file($_FILES['media']['tmp_name'], $caminhoFinal)) {
        $media_url = 'uploads/' . $nomeArquivo;
    } else {
        http_response_code(500);
        die(json_encode(['erro' => 'Falha ao salvar o arquivo']));
    }
}

$stmt = $pdo->prepare(
    "INSERT INTO post (autor_id, comunidade_id, titulo, conteudo, media_type, media_url, created_at)
     VALUES (:autor_id, :comunidade_id, :titulo, :conteudo, :media_type, :media_url, NOW())"
);

$stmt->execute([
    'autor_id'      => $autor_id,
    'comunidade_id' => $comunidade_id,
    'titulo'        => $titulo,
    'conteudo'      => $conteudo,
    'media_type'    => $media_type,
    'media_url'     => $media_url,
]);

echo json_encode(['sucesso' => true, 'id' => $pdo->lastInsertId()]);