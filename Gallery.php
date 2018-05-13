<!DOCTYPE HTML>
<html>
<head>
    <link type="text/css" rel="stylesheet" href="style.css"/>
    <title>Sypor's Website</title>
</head>

<body>

    <div id="title">
        Comments for Sypor
    </div>
<br>

<div id="buttons">
    <table id="button_table">
        <tr>
        <td>
            <button type="button" onclick="location.href='About_Me.HTML'" class="button" id="one"><span>About Me</span></button>
        </td>
        <td>
            <button type="button" onclick="location.href='index.html'" class="button" id="two"><span>Home</span></button>
        </td>
        <td>
            <button type="button" onclick="location.href='Gallery.php'" class="button" id="three"><span>Comments</span></button>  
        </td>
        <td>
            <button type="button" onclick="location.href='projects.html'" class="button" id="four"><span>Projects</span></button>
        </td>
        <td>
            <button type="button" onclick="location.href='experimental.php'" class="button" id="five"><span>Experimental</span></button>
        </td>
        </tr>
    </table>
</div>

<div id="main_body">

<div id="cmnt_form">

<form action="<?php $_SERVER['PHP_SELF'] ?>" method="post">
  <span id="white">Username:</span> <input type="text" name="Uname"><br>
  <textarea id="text_area" rows="4" cols="50" name="Comnt">Write comment here</textarea><br/>
  <input type="submit" value="Submit" class="submit_button">
</form> 

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = addcslashes(strip_tags($_POST["Uname"]), ",");
    $cmnt = addcslashes(strip_tags($_POST["Comnt"]), ",");
date_default_timezone_set('America/Los_Angeles');
    $post_date = addcslashes(date(DATE_COOKIE), ",") ;

if(empty($name)){
    $name = "anonymous";
}

$username = "nidaks";
$password = "KtW@2512";
$hostname = "localhost:3306"; 
$dbname = "test_database";

//connection to the database
$dbhandle = mysql_connect($hostname, $username, $password)
  or die("Unable to connect to MySQL");
echo "Connected to MySQL<br>";
$data_base = mysql_select_db($dbname);


$sql = "INSERT INTO Comments_section (comment, time_stamp, username)
 VALUES ('$cmnt', '$post_date', '$name')";


if (mysql_query($sql)) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysql_error($dbhandle);
}

//close the connection
mysql_close($dbhandle);   
echo "<script>location.href='Gallery.php'</script>";
}
?>

</div>
<br/>
<span id="white">Comments:</span>
<div>
<?php

$username = "nidaks";
$password = "KtW@2512";
$hostname = "localhost"; 
$dbname = "test_database";

//connection to the database
$dbhandle = mysql_connect($hostname, $username, $password)
  or die("Unable to connect to MySQL");
$data_base = mysql_select_db($dbname);

$sql = "SELECT comment, time_stamp, username FROM Comments_section";
$result = mysql_query($sql, $dbhandle);

if (mysql_num_rows($result) > 0) {
    // output data of each row
    while($row = mysql_fetch_assoc($result)) {
        echo "<hr color='black' width='400px'/>"."<span style='color:white'>".$row["time_stamp"]."<span>"."<div id='comment_div'>"."<p>"."<span style='color: blue'>".$row["username"].": </span>".$row["comment"]."</p>"."</div>"."\n";
    }
} else {
    echo "0 results";
}

mysql_close($dbhandle);

?>
</div>

</div>

</body>
</html>