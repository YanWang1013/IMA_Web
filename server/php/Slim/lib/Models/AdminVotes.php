<?php
/**
 * Admin Votes
 */
namespace Models;

use Illuminate\Database\Eloquent\Relations\Relation;

class AdminVotes extends AppModel
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'admin_votes';
	public $hidden = array(
        'created_at',
        'updated_at'
    );
    public function user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id');
    }
    protected $fillable = array(
        'id',
		'user_id',
		'created_at',
		'updated_at',
		'category_id',
		'votes',
		'is_active'
    );
    public $rules = array(
        'id' => 'sometimes|required',
		'user_id' => 'sometimes|required',
		'created_at' => 'sometimes|required',
		'updated_at' => 'sometimes|required',
		'category_id' => 'sometimes',
		'is_active' => 'sometimes|required'
    );

	public function category()
    {
        return $this->belongsTo('Models\Category', 'category_id', 'id')->where('is_active', true);
    }

}
