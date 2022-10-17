<?php
/**
 * Product
 */
namespace Models;

use Illuminate\Database\Eloquent\Relations\Relation;

class Judges extends AppModel
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'judges';
	public $hidden = array(
        'created_at',
        'updated_at',
    );
    protected $fillable = array(
        'id',
		'user_id',
		'created_at',
		'updated_at',
		'name',
		'job_title',
		'description',
		'facebook_url',
		'google_url',
		'twitter_url',
		'is_active'
    );
    public $rules = array(
        'id' => 'sometimes|required',
		'user_id' => 'sometimes|required',
		'created_at' => 'sometimes|required',
		'updated_at' => 'sometimes|required',
		'name' => 'sometimes|required',
		'job_title' => 'sometimes|required',
		'description' => 'sometimes|required',
		'facebook_url' => 'sometimes|required',
		'google_url' => 'sometimes|required',
		'twitter_url' => 'sometimes|required',
		'is_active' => 'sometimes|required'
    );
    public $qSearchFields = array(
        'name'
    );
	public function attachment()
    {
        return $this->hasOne('Models\Attachment', 'foreign_id', 'id')->where('class', 'Judge');
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
