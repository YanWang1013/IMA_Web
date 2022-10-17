<?php
/**
 * Attachment
 *
 * PHP version 5
 *
 * @category   PHP
 * @package    Base
 * @subpackage Model
 */
namespace Models;

class Attachment extends AppModel
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'attachments';
	public $hidden = array(
        'created_at',
        'updated_at',
		'description',
		'filesize',
		'is_admin_approval',
		'is_primary',
		'is_archive',
		'ispaid',
		'approved_user_id'
    );
	public function user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id');
    }
	public function user_category()
    {
        return $this->belongsTo('Models\UserCategory', 'foreign_id', 'id')->with('category');
    }
	public function thumb()
    {
        return $this->hasOne('Models\Attachment', 'foreign_id', 'id')->where('class', 'UserProfileVideoImage');
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
		if (!empty($params['is_admin_approval'])) {
            $query->Where('is_admin_approval', $params['is_admin_approval']);
        }
		if (!empty($params['class'])) {
            $query->Where('class', $params['class']);
        }
    }
}
