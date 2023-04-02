<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use DateTime;
use DB;

class SteamdleController extends Controller
{
    
    public function getDailyChallengeGame()
    {

        $day = date("Y-m-d");

        $result = DB::select("CALL getDailyChallengeGame('" . $day . "');");
        return $result;

    }

    public function getServerDate()
    {
        return date("Y-m-d");
    }

    public function getServerDateTime()
    {
        return date("Y-m-d H:i:s");
    }

    public function addSuccessfulGuess($day)
    {

        throw_if(DateTime::createFromFormat('Y-m-d', $day) === false, \Exception::class, 'Value is not a date in correct format');

        $result = DB::select("CALL addSuccessfulGuess('" . $day . "');");
        return $result;
    }

}
