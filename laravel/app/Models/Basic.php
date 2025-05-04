<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Basic
 *
 * This model represents the 'basic_table' table in the database.
 * Laravel assumes the table name is the plural of the model name ('basics'),
 * but we're overriding it using the $table property.
 */
class Basic extends Model
{
    // --------------------------
    // Common Artisan Commands
    // --------------------------

    // php artisan make:model Basic          -> Creates model only
    // php artisan make:model Basic -m       -> Creates model + migration
    // php artisan make:model Basic -mc      -> Model + Migration + Controller
    // php artisan make:model Basic -mfcr    -> All-in-one: Model + Migration + Factory + Controller + Resource


    /**
     * Specify a custom table name.
     * 
     * By default, Laravel looks for a table named 'basics',
     * but here we explicitly tell it to use 'basic_table'.
     */
    protected $table = 'basic_table';

    /**
     * The primary key associated with the table.
     * 
     * By default, Laravel assumes the primary key is 'id'.
     * If your primary key is named differently, specify it here.
     */
    protected $primaryKey = 'basic_id';

    /**
     * Mass Assignment Protection (Method 1 - $guarded)
     * 
     * $guarded protects the listed attributes from mass assignment.
     * Setting it to an empty array means all attributes are mass assignable.
     * Use with caution!
     */
    protected $guarded = [];

    /**
     * Mass Assignment Protection (Method 2 - $fillable)
     * 
     * $fillable explicitly defines which attributes are mass assignable.
     * This is a safer way to allow only specific fields for mass entry.
     * If both $fillable and $guarded are defined, $fillable takes precedence.
     */
    protected $fillable = [
        'column1',
        'column2',
        'column3',
    ];

     /**
     * Indicates if the IDs are auto-incrementing.
     *
     * Set to false if your primary key is not an auto-incrementing integer,
     * for example, if you're using UUIDs or custom strings.
     */
    public $incrementing = false;

    /**
     * Indicates if the model should be timestamped.
     *
     * If false, Laravel won't try to set `created_at` and `updated_at` fields
     * automatically during insert and update operations.
     */
    public $timestamps = false;

    /**
     * Custom timestamp column names.
     *
     * If your table uses different column names for timestamps (e.g., 'created_date' instead of 'created_at'),
     * you can define them using constants like below.
     * These are only effective when $timestamps = true.
     */
    const CREATED_AT = 'created_date';
    const UPDATED_AT = 'updated_date';

    /**
     * Default attribute values.
     *
     * You can define default values for any column using this property.
     * If 'column_name' is not explicitly set during model creation,
     * it will default to 'default_column_value'.
     */
    protected $attributes = [
        'column_name' => 'default_column_value'
    ];
}
