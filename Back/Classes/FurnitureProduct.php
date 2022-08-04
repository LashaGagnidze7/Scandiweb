<?php
require_once 'Product.php';

final class FurnitureProduct extends Product
{
    private string $dimensions;

    public function __construct(object $details)
    {
        parent::__construct($details->sku, $details->name, $details->price);
        $this->dimensions = 'Dimensions: '.$details->height.'x'.$details->width.'x'.$details->length;
    }

    public function getAbout(): string
    {
        return $this->dimensions;
    }
}