<!DOCTYPE HTML>
<html>
<head>
</head>
<body>
<a href='index.html'>Back to Website</a>
<form action="<?php $_SERVER['PHP_SELF'] ?>" method="post">
  Height: <input type="text" name="height"><br>
  Width: <input type="text" name="width"><br>
  <input type="submit" value="Submit" class="submit_button">
</form> 
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$height = intval(addcslashes(strip_tags($_POST["height"]), ","))*50;
	$width = intval(addcslashes(strip_tags($_POST["width"]), ","))*50;

	if(empty($height)){
		$height = 8*50;
	}
	if(empty($width)){
		$width = 8*50;
	}
echo "<canvas id='game' height=".$height." width=".$width." style='background-color: lightgrey;'>not supported</canvas><script src='minesweeper.js'></script>";
}
?>
</body>
</html>