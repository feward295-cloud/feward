<?php
require 'config/db.php';
header('Content-Type: application/json');

$stmt = $pdo->query(
    "SELECT p.*, c.nome AS autor_nome, c.foto_url AS autor_foto
     FROM post p
     JOIN contas c ON c.id = p.autor_id
     ORDER BY p.created_at DESC
     LIMIT 50"
);

echo json_encode($stmt->fetchAll());