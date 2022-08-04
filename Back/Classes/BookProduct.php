<?php
require_once 'Product.php';

final class BookProduct extends Product
{
    private string $weight;

    public function __construct(object $details)
    {
        parent::__construct($details->sku, $details->name, $details->price);
        $this->weight = 'Weight: '.$details->weight.'KG';
    }

    public function getAbout(): string
    {
        return $this->weight;
    }
}