<?php
require_once 'Product.php';

final class DVDProduct extends Product
{
    private string $size;

    public function __construct(object $details)
    {
        parent::__construct($details->sku, $details->name, $details->price);
        $this->size = 'Size: '.$details->size.'MB';
    }

    public function getAbout(): string
    {
        return $this->size;
    }
}