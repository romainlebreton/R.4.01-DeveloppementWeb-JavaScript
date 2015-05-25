<?php

$order = $_GET["order"];

if($order == 1){
    $message = "bonjour, ";
    sleep(2);
}
if($order == 2){
    $message = "comment";
    sleep(1);
}
if($order == 3){
    $message = "allez vous ?";
}

echo $message;