<?php

function getTimeSlot($data){

  $curl = curl_init();
  
  curl_setopt_array($curl, array(
    CURLOPT_URL => ''.APIEndpoint.'AvailableSlots?MarketingAPIKey='.APIKey.'&CompanyCode=c00000110537&PropertyId='.$data->propertyID,
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

function bookAppointment($data){

  $curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => ''.APIEndpoint.'createleadwithappointment?MarketingAPIKey='.APIKey.'&CompanyCode=c00000110537&PropertyId=978674&FirstName=Simran&LastName=Right&Email=simran.right@example.com&Phone=1234567896&ApptDate=05/06/2021&ApptTime=04:00PM&Source=Website&DesiredMoveinDate=05/06/2021&DesiredBedrooms=1&Message=needparking&RCCampaignId=12301&RCCampaignType=StandardCampaign&CTUserVisitId=3DIT8NXO7S0SRIPQ2EYCBI1719179193&To%20u%20c%20h%20Po%20i%20n%20t=Appointment',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_HTTPHEADER => array(
    'Cookie: __cfduid=da340dc9bab4869c32a0524b6f537ec671620129142'
  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;
  
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