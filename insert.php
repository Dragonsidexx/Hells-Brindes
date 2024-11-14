<?php
// Configuração da conexão com o banco de dados usando PDO
$host = 'localhost';
$db = 'hells';
$user = 'root';
$pass = '';

try {
    // Conexão com o banco usando PDO
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erro na conexão: " . $e->getMessage());
}

// Lista de emails a serem inseridos
$usuarios = [
    'DiegoV@hellsbrindes.com',
    'AdemirA@hellsbrindes.com',
    'muniz@gmail.com'
];

// Senha a ser utilizada, que será convertida em um hash seguro
$senha = 'Robvic09';
$passwordHash = password_hash($senha, PASSWORD_BCRYPT);

// Preparando o SQL para evitar SQL Injection
$stmt = $pdo->prepare("INSERT INTO usuarios (email, senha) VALUES (:email, :senha)");

foreach ($usuarios as $email) {
    // Inserindo cada usuário com o hash da senha
    $stmt->execute([
        ':email' => $email,
        ':senha' => $passwordHash
    ]);
}



echo "Usuários inseridos com sucesso!";
?>
