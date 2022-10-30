<?php

namespace App\Http\Controllers\Api;

use App\Models\Order;
use App\Models\Customer;
use App\Models\OrderDetail;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;

class OrderController extends Controller
{
    public function listOrders(Request $request)
    {
        $orders = DB::table('orders')
            ->join('customers', 'customers.id', '=', 'orders.customer_id')
            ->select('orders.*', 'customers.cust_name');

        if ($request->search) {
            $search = $request->search;
            $orders->where(function ($query) use ($search) {
                $query->where('customers.cust_name', 'like', "%{$search}%")->orWhere('orders.order_code', 'like', "%{$search}%");
            });
        }

        if ($request->sortBy) {
            $sort = ($request->sortOrder === 'desc') ? 'desc' : 'asc';
            $orders->orderBy($request->sortBy, $sort);
        }

        return response()->json($orders->get());
    }

    public function editOrder(Order $order)
    {
        return response(new OrderResource($order));
    }

    public function postOrders(Request $request)
    {
        $order = ($request->has('id')) ? Order::find($request->id) : new Order();

        $order->order_code = 0;
        $order->customer_id = $request->custname;
        $order->total_sales = $request->total;
        $order->save();

        $order->update([
            'order_code' => 'O-' . Str::padLeft($order->id, 10, '0')
        ]);

        $order->orderDetail()->delete();

        foreach ($request->orders as $orderdtl) {
            $orderDetail = new OrderDetail();
            $orderDetail->product_id = $orderdtl['id'];
            $orderDetail->qty = $orderdtl['qty'];
            $orderDetail->gross_sales = $orderdtl['gross'];
            $order->orderDetail()->save($orderDetail);
        }

        return response()->json([
            'flg' => 1,
            'msg' => 'successful',
        ]);
    }

    public function postCancel(Order $order)
    {
        $order->update(['is_cancelled' => 1]);
        return response()->json(['flg' => 1, 'msg' => 'successful']);
    }
}
