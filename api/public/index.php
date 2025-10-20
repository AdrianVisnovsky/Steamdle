<?php

require __DIR__ . '/vendor/autoload.php';

Flight::register('db', \flight\database\PdoWrapper::class, [
    '',
    '',
    '',
    [
        PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES \'utf8mb4\'',
        PDO::ATTR_EMULATE_PREPARES => false,
        PDO::ATTR_STRINGIFY_FETCHES => false,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]
]);

function getBratislavaTime() {
    return new DateTime("now", new DateTimeZone('Europe/Bratislava'));
}

Flight::route('GET /getDailyChallengeGame', function() {
    $day = getBratislavaTime();

    $stmt = Flight::db()->runQuery(
        "CALL getDailyChallengeGame(?)",
        [$day->format('Y-m-d')]
    );

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    Flight::json($result);
});

Flight::route('GET /getServerDate', function() {
    $day = getBratislavaTime();

    Flight::json($day->format('Y-m-d'));
});

Flight::route('GET /getSecondsToNewGame', function() {
    $day = getBratislavaTime();
    $nextDate = new DateTime("tomorrow", new DateTimeZone('Europe/Bratislava'));
    $diffInSeconds = $nextDate->getTimestamp() - $day->getTimestamp();

    Flight::json($diffInSeconds);
});

Flight::route('GET /addSuccessfulGuess/@day', function($day) {
    $dayDatetime = DateTime::createFromFormat('Y-m-d', $day);

    if ($dayDatetime === false) {
        Flight::json(['error' => 'Value is not a date in correct format'], 400);
        return;
    }

    $stmt = Flight::db()->runQuery(
        "CALL addSuccessfulGuess(?)",
        [$dayDatetime->format('Y-m-d')]
    );

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    Flight::json($result);
});

Flight::route('GET /getNumberOfSuccesfullGuesses/@day', function($day) {
    $dayDatetime = DateTime::createFromFormat('Y-m-d', $day);

    if ($dayDatetime === false) {
        Flight::json(['error' => 'Value is not a date in correct format'], 400);
        return;
    }

    $result = Flight::db()->fetchAll(
        "SELECT PlayerCount, Guessed FROM `daily_challenge` WHERE `Day` = ?",
        [$dayDatetime->format('Y-m-d')]
    );

    Flight::json($result);
});

Flight::route('GET /getLastDaysGameStats', function() {
    $day = getBratislavaTime();
    $yesterdayDT = clone $day;
    $yesterdayDT->sub(new DateInterval('P1D'));

    $sqlString = "SELECT AppId, Guessed,
        (SELECT COUNT(*) FROM `daily_challenge` WHERE `Day` <= ?) As GameOrder
        FROM `daily_challenge`
        WHERE `Day` = ?";

    $result = Flight::db()->fetchAll(
        $sqlString,
        [$yesterdayDT->format('Y-m-d'), $yesterdayDT->format('Y-m-d')]
    );

    Flight::json($result);
});

Flight::route('GET /getGameStatistics', function() {
    $sqlString = "SELECT AppId, Day, PlayerCount, Guessed
        FROM `daily_challenge`
        WHERE Day <= CURRENT_DATE()
        ORDER BY ID DESC
        LIMIT 7";

    $result = Flight::db()->fetchAll($sqlString);

    Flight::json($result);
});

Flight::map('error', function(Throwable $e) {
    Flight::json([
        'error' => $e->getMessage()
    ], 500);
});

Flight::start();