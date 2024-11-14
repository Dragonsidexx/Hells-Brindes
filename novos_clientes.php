<?php
include('conexao.php'); // Inclui a conexão com o banco de dados

// Inicializa uma variável para armazenar mensagens de erro ou sucesso
$mensagem = "";

// Verifica se o formulário foi enviado corretamente
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Verificação básica para garantir que os campos estão preenchidos
    if (empty($_POST['email'])) {
        $mensagem = "Preencha o email!";
    } elseif (empty($_POST['receita'])) {
        $mensagem = "Preencha a receita gerada!";
    } elseif (empty($_POST['nome'])) {
        $mensagem = "Preencha o nome!";
    } elseif (empty($_POST['telefone'])) {
        $mensagem = "Preencha o telefone!";
    } else {
        // Sanitiza e escapa os dados inseridos pelo usuário
        $nome = $conexao->real_escape_string(trim($_POST['nome']));
        $email = $conexao->real_escape_string(trim($_POST['email']));
        $telefone = $conexao->real_escape_string(trim($_POST['telefone']));
        $receita = $conexao->real_escape_string(trim($_POST['receita']));

        // Insere o cliente no banco de dados
        $sql_code = "INSERT INTO clientes (nome, email, telefone, receita) 
                     VALUES ('$nome', '$email', '$telefone', '$receita')";
        
        if ($conexao->query($sql_code) === TRUE) {
            $mensagem = "Cliente cadastrado com sucesso!";
        } else {
            $mensagem = "Erro ao cadastrar cliente: " . $conexao->error;
        }
    }
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro de Cliente</title>
    <link rel="stylesheet" href="log.css">
    <link href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" rel="stylesheet">
    <link rel="icon" href="logo.jpeg">
</head>
<body>
    <div class="login">
        <form class="container" id="cadastroForm" action="" method="POST"> <!-- Alterado o action para o próprio script -->
            <a href='dashbord.html'>
            <h1 class="login__title">Cadastro de Cliente</h1>
            </a>
           

            <!-- Exibe a mensagem de sucesso ou erro -->
            <?php if (!empty($mensagem)): ?>
                <p class="mensagem"><?= htmlspecialchars($mensagem); ?></p> <!-- Escape para evitar XSS -->
            <?php endif; ?>

            <div class="login__content">
                <div class="login__box">
                    <i class="ri-user-3-line login__icon"></i>
                    <div class="login__box-input">
                        <input type="text" name="nome" required class="login__input" id="nome" placeholder="">
                        <label for="nome" class="login__label">Nome</label>
                    </div>
                </div>

                <div class="login__box">
                    <i class="ri-mail-line login__icon"></i>
                    <div class="login__box-input">
                        <input type="email" name="email" required class="login__input" id="email" placeholder="">
                        <label for="email" class="login__label">Email</label>
                    </div>
                </div>

                <div class="login__box">
                    <i class="ri-phone-line login__icon"></i>
                    <div class="login__box-input">
                        <input type="text" name="telefone" required class="login__input" id="telefone" placeholder="">
                        <label for="telefone" class="login__label">Telefone</label>
                    </div>
                </div>

                <div class="login__box">
                    <i class="ri-file-line login__icon"></i>
                    <div class="login__box-input">
                        <input type="text" name="receita" required class="login__input" id="receita" placeholder="">
                        <label for="receita" class="login__label">Receita Gerada</label>
                    </div>
                </div>
            </div>

            <button type="submit" class="login__button" id="cadastro-button">Cadastrar</button>
        </form>
    </div>
    <script src="login.js"></script>
</body>
</html>
