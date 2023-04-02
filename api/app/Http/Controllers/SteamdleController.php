<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SteamdleController extends Controller
{
    
    public function getDailyChallengeGame()
    {

        $result = DB::select();
        return $result;

    }

}
