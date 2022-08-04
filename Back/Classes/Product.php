<?php

abstract class Product
{
    private string $sku;
    private string $name;
    private string $price;

    public function __construct(string $sku, string $name, string $price)
    {
        $this->sku = $sku;
        $this->name = $name;
        $this->price = $price.'$';
    }

    public function getSku(): string
    {
        return $this->sku;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getPrice(): string
    {
        return $this->price;
    }

    abstract function getAbout(): string;
}