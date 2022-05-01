<?php require "partials/head.php" ?>
    <h1>Lista cose da fare:</h1>

    <form method="POST" action="/add-new">
        <input type="text" name="descrizione" placeholder="descrizione">
        <button type="submit">Invia</button>
    </form>

    <ul>
        <?php foreach ($tasks as $task) : ?>
            <li><?php echo $crypt->decrypt($task->descrizione);
                if ($task->terminata) {
                    echo "&#10004";
                } else {
                    echo "<a href='http://localhost:8000/done/?id=".$task->id."'><b> da Fare</b></a>";
                }
                ?>
            </li>
        <?php endforeach ?>
    </ul>
<?php require "partials/footer.php"; ?>