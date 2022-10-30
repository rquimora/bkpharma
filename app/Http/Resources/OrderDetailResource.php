<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // return parent::toArray($request);
        $product = $this->product;
        return [
            'id' => $product->id,
            'qty' => $this->qty,
            'gross' => $this->gross_sales,
            'prod_name' => $product->prod_name,
            'price' => $product->price,
        ];
    }
}
