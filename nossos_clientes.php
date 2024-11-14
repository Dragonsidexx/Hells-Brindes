<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="log.css">
    <link rel="shortcut icon" href="logoBran.jfif" type="image/x-icon">
    <title>Nossos Clientes</title>
</head>
<body>
    <div class="container">
        <h1 class="NsCli">Nossos Clientes</h1>
        <hr>

        <!-- Tabela de Clientes -->
        <table class="clientes-table">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Telefone</th>
                    <th>Receita Gerada (R$)</th>
                    <th>Ações</th> <!-- Adicionado cabeçalho para ações -->
                </tr>
            </thead>
            <tbody>
                <?php if (count($clientes) > 0): ?>
                    <?php foreach ($clientes as $cliente): ?>
                        <tr>
                            <td><?= htmlspecialchars($cliente['nome']) ?></td>
                            <td><?= htmlspecialchars($cliente['email']) ?></td>
                            <td><?= htmlspecialchars($cliente['telefone']) ?></td>
                            <td><?= number_format($cliente['receita'], 2, ',', '.') ?></td>
                            <td>
                                <form action="excluir_cliente.php" method="POST" style="display:inline;">
                                    <input type="hidden" name="id" value="<?= htmlspecialchars($cliente['id']) ?>">
                                    <button type="submit" class="btn-delete" onclick="return confirm('Tem certeza que deseja excluir este cliente?');">Excluir</button>
                                </form>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                <?php else: ?>
                    <tr>
                        <td colspan="5">Nenhum cliente encontrado.</td>
                    </tr>
                <?php endif; ?>
            </tbody>
        </table>

        <!-- Total de Receitas -->
        <h2 class="total-receitas">Total de Receitas: R$ <?= number_format($total, 2, ',', '.') ?></h2>
        
        <!-- Botão Voltar -->
        <a href="dashbord.html">
            <button class="btn-back">Voltar</button>
        </a>
    </div>

    <script src="script.js"></script>
</body>
</html>
