<?php
/**
 * Product
 */
namespace Models;

use Illuminate\Database\Eloquent\Relations\Relation;

class VotePurchase extends AppModel
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'vote_purchases';
	public $hidden = array(
        'created_at',
        'updated_at'
    );
    protected $fillable = array(
        'id',
		'user_id',
		'created_at',
		'updated_at',
		'vote_pay_key',
		'vote_to_purchase',
		'ip_address',
		'user_agent',
		'is_paid'
    );
    public $rules = array(
        'id' => 'sometimes|required',
		'created_at' => 'sometimes|required',
		'updated_at' => 'sometimes|required',
		'vote_pay_key' => 'sometimes|required',
		'vote_to_purchase' => 'sometimes|required',
		'ip_address' => 'sometimes|required',
		'user_agent' => 'sometimes|required',
		'is_paid' => 'sometimes|required'
    );
    public $qSearchFields = array(
        'name'
    );
}
