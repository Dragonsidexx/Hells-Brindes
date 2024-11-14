<?php
session_start();

if (!isset($_SESSION['carrinho'])) {
    $_SESSION['carrinho'] = array();
}

// ADICIONAR OU REMOVER PRODUTO
if (isset($_GET['acao'])) {

    // ADICIONAR AO CARRINHO
    if ($_GET['acao'] == 'add') {
        $id = intval($_GET['id']);
        if (!isset($_SESSION['carrinho'][$id])) {
            $_SESSION['carrinho'][$id] = 1;
        }
        else {
            $_SESSION['carrinho'][$id] += 1;
        }
    }

    // REMOVER DO CARRINHO
    if ($_GET['acao'] == 'del') {
        $id = intval($_GET['id']);
        if (isset($_SESSION['carrinho'][$id])) {
            unset($_SESSION['carrinho'][$id]);
        }
    }

    // ALTERAR QUANTIDADE
    if ($_GET['acao'] == 'up') {
        if (is_array($_POST['prod'])) {
            foreach ($_POST['prod'] as $id => $qtd) {
                $id = intval($id);
                $qtd = intval($qtd);
                if (!empty($qtd) || $qtd <> 0) {
                    $_SESSION['carrinho'][$id] = $qtd;
                } else {
                    unset($_SESSION['carrinho'][$id]);
                }
            }
        }
    }
}
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carrinho De Compras</title>
</head>
<body>

<form action="?acao=up" method="post">
    <table>
        <caption>Carrinho de Compras</caption>
        <thead>
        <tr>
            <th width="244">Produto</th>
            <th width="79">Quantidade</th>
            <th width="89">Preço</th>
            <th width="100">Subtotal</th>
            <th width="64">Remover</th>
        </tr>
        </thead>

        <tfoot>
        <tr>
            <td colspan="5"><input type="submit" value="Atualizar Carrinho"/></td>
        </tr>
        <tr>
            <td colspan="5"><a href="index.php">Continuar Comprando</a></td>
        </tr>
        </tfoot>

        <tbody>
        <?php
        if (count($_SESSION['carrinho']) == 0) {
            echo '<tr><td colspan="5">Não há produto no carrinho</td></tr>';
        }
        else {
            require("conexao.php");
            $total = 0;
            foreach ($_SESSION['carrinho'] as $id => $qtd) {
                $sql = "SELECT * FROM produtos WHERE id= '$id'";
                $qr = mysqli_query($conexao, $sql) or die(mysqli_error($conexao));
                $ln = mysqli_fetch_assoc($qr);

                $nome = $ln['nome'];
                $preco = number_format($ln['preco'], 2, ',', '.');
                $sub = number_format($ln['preco'] * $qtd, 2, ',', '.');
                $total += $ln['preco'] * $qtd;

                echo '<tr>
                    <td>' . $nome . '</td>
                    <td> <input type="text" size="3" name="prod[' . $id . ']" value="' . $qtd . '" /></td>
                    <td>R$ ' . $preco . '</td>
                    <td>R$ ' . $sub . '</td>
                    <td><a href="?acao=del&id=' . $id . '">Remove</a></td>
                    </tr>';
            }

            $total = number_format($total, 2, ',', '.');
            echo '<tr>
                    <td colspan="4">Total</td>
                    <td>R$ ' . $total . ' </td>
                  </tr>';
        }
        ?>
        </tbody>
    </table>
</form>

</body>
</html>