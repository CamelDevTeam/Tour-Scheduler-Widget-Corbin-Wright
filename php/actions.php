<?php

// Init Everything
require('init.php');

// Catch Payload Object from Ajax
$payload = @file_get_contents("php://input");
$data = json_decode($payload);

if(gettype($data) !== 'object') die(json_encode(["status"=>false,"response"=>"Data is not an object"]));

switch ($data->action) {
    case 'Get Time Slot':
        // Get Time Slot
        $timeslots = getTimeSlot($data);
        printResponse($timeslots);
        break;
    
    case 'Post Schedule':
        // Post Schedule
        $schedule = postSchedule($data);
        printResponse($schedule);
        break;

    default:
        # code...
        break;
}


?>