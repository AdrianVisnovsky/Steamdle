<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;
use DateTimeZone;
use DateTime;
use DateInterval;
use DB;


class SteamdleController extends Controller
{
    
    public function getDailyChallengeGame()
    {

        $day = new DateTime("now", new DateTimeZone('Europe/Bratislava'));

        $result = DB::select("CALL getDailyChallengeGame('" . $day . "');");
        return $result;

    }

    public function getServerDate()
    {

        $day = new DateTime("now", new DateTimeZone('Europe/Bratislava'));

        return $day->format('Y-m-d');
    }

    public function getServerDateTime()
    {

        $day = new DateTime("now", new DateTimeZone('Europe/Bratislava'));

        return $day->format("Y-m-d H:i:s");
    }

    public function addSuccessfulGuess($day)
    {

        throw_if(DateTime::createFromFormat('Y-m-d', $day) === false, \Exception::class, 'Value is not a date in correct format');

        $result = DB::select("CALL addSuccessfulGuess('" . $day . "');");
        return $result;
    }

    public function getNumberOfSuccesfullGuesses($day)
    {

        throw_if(DateTime::createFromFormat('Y-m-d', $day) === false, \Exception::class, 'Value is not a date in correct format');

        $result = DB::select("SELECT PlayerCount, Guessed FROM `daily_challenge` WHERE `Day` = '" . $day . "';");
        return $result;
    }

    public function getLastDaysGameId()
    {

        $day = new DateTime("now", new DateTimeZone('Europe/Bratislava'));
        $yesterdayDT = $day->sub(new DateInterval('P1D'));

        $result = DB::select("SELECT AppId FROM `daily_challenge` WHERE `Day` = '" . $yesterdayDT->format('Y-m-d') . "';");
        return $result;

    }

}
