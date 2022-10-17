<?php
/**
 * PaymentGateway
 *
 * PHP version 5
 *
 * @category   PHP
 * @package    Base
 * @subpackage Model
 */
namespace Models;

class PaymentGateway extends AppModel
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'payment_gateways';
	public $hidden = array(
        'created_at',
        'updated_at',
		'is_active',
		'slug',
		'description',
		'is_test_mode',
		'sanbox_userid',
		'live_userid',
		'sanbox_password',
		'live_password',
		'sanbox_signature',
		'live_signature',
		'sanbox_secret_key',
		'live_secret_key',
		'sanbox_publish_key',
		'live_publish_key',
		'sanbox_application_id',
		'sanbox_paypal_email',
		'live_application_id',
		'live_paypal_email'
    );
    protected $fillable = array(
        'name',
        'description',
        'gateway_fees',
        'is_test_mode',
        'is_active',
        'is_enable_for_wallet',
        'display_name',
		'sanbox_userid',
		'live_userid',
		'sanbox_password',
		'live_password',
		'sanbox_signature',
		'live_signature',
		'sanbox_secret_key',
		'live_secret_key',
		'sanbox_publish_key',
		'live_publish_key',
		'paypal_more_ten',
		'paypal_less_ten',
		'paypal_more_ten_in_cents',
		'paypal_less_ten_in_cents'
    );
    public function payment_settings()
    {
        return $this->hasMany('Models\PaymentGatewaySetting');
    }
	public function attachment()
    {
        return $this->hasOne('Models\Attachment', 'foreign_id', 'id')->where('class', 'PaymentGateway');
    }
    public function scopeFilter($query, $params = array())
    {
        parent::scopeFilter($query, $params);
        if (!empty($params['q'])) {
            $search = $params['q'];
            $query->where('display_name', 'ilike', "%$search%");
        }
		$query->orderBy('id', 'DESC');
    }
}
