<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://marketingapi.rentcafe.com/marketingapi/api/appointments/AvailableSlots?MarketingAPIKey=1a7f8d8f-38bc-4d02-a2a3-03ae87c69688&CompanyCode=c00000110537&PropertyId=978674',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS => '',
  CURLOPT_HTTPHEADER => array(
    'Cookie: __cfduid=d178a053ed82051ebbb61a94e31f7a7701619399514'
  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;
?>
