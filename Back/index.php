<?php
header('Access-Control-Allow-Origin: https://morning-ravine-57262.herokuapp.com');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, DELETE');

spl_autoload_register(function ($class_name) {
    require_once 'Classes/' .$class_name . '.php';
});

$db = new Database();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    echo json_encode($db->getProducts());
} elseif ($method === 'POST') {
    $details = json_decode(file_get_contents("php://input"));
    $className = $details->type;
    $product = new $className($details);
    echo $db->addToProducts($product);
} elseif ($method === 'DELETE') {
    $db->deleteByIds(json_decode(file_get_contents("php://input"), true));
} else {
    echo 'Unknown Request Method';
}