<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Carbon\Carbon;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

   
     protected $softDelete = true;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'attachments',
        'role_id',
        'profile',
        'address',
        'name',
        'fname',
        'mname',
        'lname',
        'suffix',
        'is_male',
        'phone',
        'dob',
        'pob',
        'email', 
        'email_verified_at',
        'password',
        'session_id',
        'platforms',
        'sessionArray',
        'currentApp'
        ];

protected $casts = [
        'email_verified_at' => 'datetime',
        'dob'          => 'date:M d, Y',
        'is_male'      => 'boolean',
        'sessionArray' => 'array',
        'has_image'    => 'boolean',
        'is_active'    => 'boolean',
        ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
        ];
    
    protected $appends = [
        'fullName',
        'roleName', 
        'gender',
        'age',
    ];

    public function getFullNameAttribute()
        {
            $fn=$this->fname.' '.  $this->lname;
            if($this->mname !=Null or $this->mname !='')  {
                $stringExp = explode(' ', $this->mname);
                $shortCode = '';
                for($i = 0; $i < count($stringExp); $i++):
                    $shortCode .= substr($stringExp[$i], 0, 1);
                endfor;

                $fn =$this->fname . ' ' . $shortCode  . '. ' . $this->lname ;
            }
            return  strtoupper(trim($fn.' '. $this->suffix));
        }
    public function getAgeAttribute()
        {
            if ($this->dob) { return Carbon::parse($this->attributes['dob'])->age; };
        }
    public function getRoleNameAttribute()
        { 
            if($this->role){
                return $this->role->name;
            }
        }
    public function getGenderAttribute()
        { 
            return $this->is_male?'Male':'Female';
        } 
    // Relationship
    public function role(){return $this->belongsTo(Role::class);}    
}
