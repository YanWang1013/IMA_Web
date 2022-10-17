<?php
/**
 * ProductDetail
 */
namespace Models;

use Illuminate\Database\Eloquent\Relations\Relation;

class ProductDetail extends AppModel
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'product_details';
	public $hidden = array(
        'created_at',
        'updated_at',
		'is_active'
    );
    protected $fillable = array(
        'id',
		'created_at',
		'updated_at',
		'product_id',
		'product_color_id',
		'is_active'
    );
    public $rules = array(
        'id' => 'sometimes|required',
		'created_at' => 'sometimes|required',
		'updated_at' => 'sometimes|required',
		'product_id' => 'sometimes|required',
		'product_color_id' => 'sometimes|required',
		'is_active' => 'sometimes|required'
    );
    public $qSearchFields = array(
        'name'
    );
	public function sizes()
    {
        return $this->hasMany('Models\ProductSize', 'product_detail_id', 'id')->select('id', 'product_detail_id', 'size_id')->with('size')->where('quantity', '<>', 0)->where('size_id', '<>', 0);
    }
	public function amount_detail()
    {
        return $this->hasOne('Models\ProductSize', 'product_detail_id', 'id')->select('id', 'product_detail_id', 'quantity', 'price', 'discount_percentage')->where('quantity', '<>', 0);
    }
	public function amount_detail_me()
    {
        return $this->hasOne('Models\ProductSize', 'product_detail_id', 'id')->select('id', 'product_detail_id', 'quantity', 'price', 'discount_percentage', 'coupon_code')->where('quantity', '<>', 0);
    }
	public function attachments()
    {
        return $this->hasMany('Models\Attachment', 'foreign_id', 'id')->where('class', 'Product');
    }
	public function attachment()
    {
        return $this->hasOne('Models\Attachment', 'foreign_id', 'id')->where('class', 'Product');
    }
	public function product()
    {
        return $this->belongsTo('Models\Product', 'product_id', 'id')->with('user');
    }
	public function product_detail()
    {
        return $this->belongsTo('Models\Product', 'product_id', 'id')->select('id', 'name');
    }
	public function product_detail_cart()
    {
        return $this->belongsTo('Models\Product', 'product_id', 'id')->select('id', 'name', 'user_id')->with('product_user');
    }
	public function color()
    {
        return $this->belongsTo('Models\ProductColor', 'product_color_id', 'id');
    }
	public function size()
    {
        return $this->belongsTo('Models\ProductSize', 'id', 'product_detail_id')->with('size');
    }
	public function carts()
    {
		$user_id = 0;
        global $authUser;
        if (!empty($authUser)) {
            $user_id = $authUser['id'];
        }
        return $this->hasMany('Models\Cart', 'product_detail_id', 'id')->select('id', 'product_detail_id', 'product_size_id', 'quantity', 'product_size_id', 'coupon_id')->with('coupon')->where('is_purchase', false)->where('user_id', $user_id);
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
