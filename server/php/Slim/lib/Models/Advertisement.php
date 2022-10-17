<?php
/**
 * Advertisement
 */
namespace Models;

use Illuminate\Database\Eloquent\Relations\Relation;

class Advertisement extends AppModel
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'advertisements';
    public function user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id');
    }
	public $hidden = array(
        'created_at',
        'updated_at',
		'is_active',
		'is_approved',
		'page_number',
		'price'
    );
    protected $fillable = array(
        'id',
		'user_id',
		'created_at',
		'updated_at',
		'name',
		'url',
		'page_number',
		'price',
		'description',
		'is_approved',
		'is_active'
    );
    public $rules = array(
        'id' => 'sometimes|required',
		'user_id' => 'sometimes|required',
		'created_at' => 'sometimes|required',
		'updated_at' => 'sometimes|required',
		'name' => 'sometimes|required',
		'url' => 'sometimes|required',
		'page_number' => 'sometimes|required',
		'price' => 'sometimes|required',
		'description' => 'sometimes|required',
		'is_approved' => 'sometimes|required',
		'is_active' => 'sometimes|required'
    );
    public $qSearchFields = array(
        'name'
    );
	public function attachment()
    {
        return $this->hasOne('Models\Attachment', 'foreign_id', 'id')->where('class', 'Advertisement');
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
