<?php
/**
 * UserSocialProfile
 */
namespace Models;

use Illuminate\Database\Eloquent\Relations\Relation;

class UserSocialProfile extends AppModel
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'user_social_profiles';
    public function user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id');
    }
	public $hidden = array(
        'created_at',
        'updated_at',
		'user_id',
		'is',
    );
    protected $fillable = array(
        'id',
		'user_id',
		'created_at',
		'updated_at',
		'user_id',
		'instagram_url',
		'tiktok_url',
		'twitter_url',
		'facebook_url',
		'youtube_url'
    );
    public $rules = array(
        'id' => 'sometimes|required',
		'user_id' => 'sometimes|required',
		'created_at' => 'sometimes|required',
		'updated_at' => 'sometimes|required',
		'instagram_url' => 'sometimes|required',
		'tiktok_url' => 'sometimes|required',
		'twitter_url' => 'sometimes|required',
		'facebook_url' => 'sometimes|required',
		'youtube_url' => 'sometimes|required'
    );
    public $qSearchFields = array(
        'name'
    );
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
