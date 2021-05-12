<?php

function getTimeSlot($data){

  $curl = curl_init();

  curl_setopt_array($curl, array(
  CURLOPT_URL => ''.APIEndpoint.'AvailableSlots?MarketingAPIKey='.APIKey.'&CompanyCode=c00000110537&PropertyId='.$data->propertyID,
  CURLOPT_RETURNTRANSFER => true,
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

  // //Check Response Code eg: 240 / 200 / 400 etc.
  // $responseCode = curl_getinfo($curl,CURLINFO_HTTP_CODE);

  //json decode
  $response = json_decode($resp);

  $status = true;
  if($response->ErrorCode !== 0){
      $response = $response->ErrorMessage;
      $status = false;
  }

  if(curl_error($curl)){
      return ["status"=>$status,"response"=>"".curl_error($curl)."","request"=>__FUNCTION__];
  }else{
      return ["status"=>$status,"response"=>$response,"request"=>__FUNCTION__];
  }

  curl_close($curl);

  //json decode
  //$response = json_decode($resp);

  // if($response->ErrorCode == 0){
  //     return ["status"=>true,"response"=>$response,"request"=>__FUNCTION__];
  // }else{
  //     return ["status"=>false,"response"=>$response->ErrorMessage,"request"=>__FUNCTION__];
  // }

}

function postSchedule($data){

  $curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => ''.APIEndpoint.'createleadwithappointment?MarketingAPIKey='.APIKey.'&CompanyCode='.$data->CompanyCode.'&PropertyId='.$data->PropertyId.'&FirstName='.$data->FirstName.'&LastName='.$data->LastName.'&Email='.$data->Email.'&Phone='.$data->Phone.'&ApptDate=05/13/2021&ApptTime=03:00PM&Source='.$data->Source.'&DesiredMoveinDate=05/13/2021&DesiredBedrooms='.$data->DesiredBedrooms.'&Message='.$data->Message.'&RCCampaignId='.$data->RCCampaignId.'&RCCampaignType='.$data->RCCampaignType.'&CTUserVisitId='.$data->CTUserVisitId.'&To%20u%20c%20h%20Po%20i%20n%20t='.$data->TouchPoint,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS =>'',
  CURLOPT_HTTPHEADER => array(
    'Cookie: __cfduid=da340dc9bab4869c32a0524b6f537ec671620129142'
  ),
));

$resp = curl_exec($curl);

  //Check Response Code eg: 240 / 200 / 400 etc.
	$responseCode = curl_getinfo($curl,CURLINFO_HTTP_CODE);
  
  curl_close($curl);

  $response = json_decode($resp);

  if($response->ErrorCode == 0){
      return ["status"=>true,"response"=>$response,"request"=>__FUNCTION__];
  }else{
      return ["status"=>false,"response"=>$response->ErrorMessage,"request"=>__FUNCTION__];
  }
}

?>