<?php
getTimeSlot();
function getTimeSlot(){

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
    CURLOPT_POSTFIELDS =>'',
    CURLOPT_HTTPHEADER => array(
      'Cookie: __cfduid=d71a6227343b31c935d8c1068dcc13ec21619440578'
    ),
  ));
  
  $resp = curl_exec($curl);

  //Check Response Code eg: 240 / 200 / 400 etc.
	$responseCode = curl_getinfo($curl,CURLINFO_HTTP_CODE);
  
  curl_close($curl);

  $response = json_decode($resp);

  if($responseCode == 200 || $responseCode == 204){
    return ["status"=>true,"response"=>$response,"request"=>__FUNCTION__];
  }else{
      return ["status"=>false,"response"=>$response->message,"request"=>__FUNCTION__];
  }

}

?>