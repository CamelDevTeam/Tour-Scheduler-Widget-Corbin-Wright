<?php

require_once('yardi.php');

// Repli Credentials
define("APIKey","1a7f8d8f-38bc-4d02-a2a3-03ae87c69688");
define("APIEndpoint","https://marketingapi.rentcafe.com/marketingapi/api/appointments/");

// Actions Custom Function for front-end handling data/error
function printResponse($response){
    if($response['status']){
        print_r(json_encode($response));
    }else{
        die(json_encode($response));
    }
}

?>