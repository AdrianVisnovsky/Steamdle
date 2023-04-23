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

        $result = DB::select("CALL getDailyChallengeGame('" . $day->format('Y-m-d') . "');");
        return $result;

    }

    public function getServerDate()
    {

        $day = new DateTime("now", new DateTimeZone('Europe/Bratislava'));

        return $day->format('Y-m-d');
    }

    public function getSecondsToNewGame()
    {

        $day = new DateTime("now", new DateTimeZone('Europe/Bratislava'));
        //$timeLeft = 86400 - (time() - strtotime($day->getTimestamp()));

        $nextDate = new Datetime("tomorrow", new DateTimeZone('Europe/Bratislava'));
        $diffInSeconds = $nextDate->getTimestamp() - $day->getTimestamp();
        return $diffInSeconds;

        return date("H:i:s", $timeLeft);
    }

    public function addSuccessfulGuess($day)
    {

        throw_if(DateTime::createFromFormat('Y-m-d', $day) === false, \Exception::class, 'Value is not a date in correct format');

        $dayDatetime = date_create_from_format('Y-m-d', $day);

        $result = DB::select("CALL addSuccessfulGuess('" . $dayDatetime->format('Y-m-d') . "');");
        return $result;
    }

    public function getNumberOfSuccesfullGuesses($day)
    {

        throw_if(DateTime::createFromFormat('Y-m-d', $day) === false, \Exception::class, 'Value is not a date in correct format');

        $dayDatetime = date_create_from_format('Y-m-d', $day);

        $result = DB::select("SELECT PlayerCount, Guessed FROM `daily_challenge` WHERE `Day` = '" . $dayDatetime->format('Y-m-d') . "';");
        return $result;
    }

    public function getLastDaysGameStats()
    {

        $day = new DateTime("now", new DateTimeZone('Europe/Bratislava'));
        $yesterdayDT = $day->sub(new DateInterval('P1D'));

        $sqlString =
"SELECT AppId, Guessed,
    (SELECT COUNT(*) FROM `daily_challenge` WHERE `Day` <= '" . $yesterdayDT->format('Y-m-d') . "') As GameOrder
    FROM `daily_challenge`
    WHERE `Day` = '" . $yesterdayDT->format('Y-m-d') . "';";

        $result = DB::select($sqlString);
        return $result;

    }

    public function getGameStatistics()
    {

        $sqlString =
"SELECT AppId, Day, PlayerCount, Guessed
    FROM `daily_challenge`
    WHERE Day <= CURRENT_DATE()
    ORDER BY ID DESC
    LIMIT 7;";

        $result = DB::select($sqlString);
        return $result;

    }

}
