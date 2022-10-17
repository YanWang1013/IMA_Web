<?php
/**
 * Cart
 */
namespace Models;

use Illuminate\Database\Eloquent\Relations\Relation;

class Cart extends AppModel
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'carts';
    public $hidden = array(
		'is_active',
		'is_purchase',
		'otp',
		'invoice_no',
		'shipping_status'
    );
    protected $fillable = array(
        'id',
		'user_id',
		'contestant_id',
		'company_id',
		'created_at',
		'updated_at',
		'product_detail_id',
		'quantity',
		'pay_key',
		'pay_status',
		'addressline1',
		'addressline2',
		'city',
		'state',
		'country',
		'zipcode',
		'price',
		'is_purchase',
		'invoice_no',
		'shipping_status',
		'otp',
		'is_active'
    );
    public $rules = array(
        'id' => 'sometimes|required',
		'user_id' => 'sometimes|required',
		'created_at' => 'sometimes|required',
		'updated_at' => 'sometimes|required',
		'product_detail_id' => 'sometimes|required',
		'quantity' => 'sometimes|required',
		'is_active' => 'sometimes|required',
		'pay_key' => 'sometimes|required'
    );
    public $qSearchFields = array(
        'name'
    );
	public function attachment()
    {
        return $this->hasOne('Models\Attachment', 'foreign_id', 'product_detail_id')->where('class', 'Product');
		// ->where('is_primary', true)
    }
	public function detail()
    {
        return $this->belongsTo('Models\ProductDetail', 'product_detail_id', 'id')->with('attachment', 'product', 'amount_detail', 'color');
    }
	public function detail_cart()
    {
        return $this->belongsTo('Models\ProductDetail', 'product_detail_id', 'id')->with('product_detail_cart', 'amount_detail');
    }
	public function size()
    {
        return $this->belongsTo('Models\ProductSize', 'product_size_id', 'id')->select('id', 'product_detail_id', 'size_id', 'price', 'discount_percentage', 'quantity')->with('size');
	}
	public function sizes()
    {
        return $this->belongsTo('Models\ProductSize', 'product_detail_id', 'id')->select('id', 'product_detail_id', 'size_id', 'price', 'discount_percentage');
	}
	public function coupon()
    {
        return $this->belongsTo('Models\ProductSize', 'coupon_id', 'product_detail_id');
	}
	public function user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id');
	}
	public function user_company()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id')->with('company');
	}
	public function scopeFilter($query, $params = array())
    {
        global $authUser;
        parent::scopeFilter($query, $params);
        if (!empty($params['q'])) {
            $query->where(function ($q1) use ($params) {
                $search = $params['q'];                
            });
        }
    }
}
