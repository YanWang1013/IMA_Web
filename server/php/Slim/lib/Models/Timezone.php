<?php
/**
 * Transaction
 *
 * PHP version 5
 *
 * @category   PHP
 * @package    Base
 * @subpackage Model
 */
namespace Models;

use Illuminate\Database\Eloquent\Relations\Relation;

class Timezone extends AppModel
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'timezones';
}
