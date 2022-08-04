<?php
require_once 'Product.php';

final class Database
{
    public PDO $pdo;

    public function __construct()
    {
        $this->pdo = new PDO('mysql:host=sql8.freesqldatabase.com;port=3306;dbname=sql8510772', 'sql8510772', '5b2JtKKRPS');
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function getProducts(): array
    {
        $statement = $this->pdo->prepare('SELECT * FROM products');
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    public function addToProducts(Product $product): bool
    {
        $statement = $this->pdo->prepare('INSERT INTO products (sku, name, price, about) 
                                                VALUES (:sku, :name, :price, :about)');
        $sku = $product->getSku();

        $statement1 = $this->pdo->prepare('SELECT * FROM products WHERE sku = :sku');
        $statement1->bindValue(':sku', $sku);
        $statement1->execute();
        if ($statement1->rowCount() > 0) {
            return false;
        }

        $name = $product->getName();
        $price = $product->getPrice();
        $about = $product->getAbout();
        $statement->bindParam(':sku', $sku);
        $statement->bindParam(':name', $name);
        $statement->bindParam(':price', $price);
        $statement->bindParam(':about', $about);

        return $statement->execute();
    }

    public function deleteByIds(array $ids): bool
    {
        $string_of_ids = implode(',', $ids); 
        $statement = $this->pdo->prepare("DELETE FROM products WHERE id IN ($string_of_ids)");

        return $statement->execute();
    } 
}