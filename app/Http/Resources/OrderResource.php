<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
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
        return [
            'id' => $this->id,
            'customer_id' => $this->customer_id,
            'cust_name' => $this->customer->cust_name,
            'is_cancelled' => $this->is_cancelled,
            'order_code' => $this->order_code,
            'total_sales' => $this->total_sales,
            'orders' => OrderDetailResource::collection($this->orderDetail),
        ];
    }
}
