$(function() {
    const actionURL = "./php/actions.php";

    /**
     * @param settings
     * Reusable Async AJAX
     * eg: let a = doAjax({
            url: ajaxurl,
            type: 'POST',
            data: args
        })
        Callback : a.then(data => {
            console.log(data)
        })
    */
     function doAjax(settings) {
         settings.data = JSON.stringify(settings.data);
        return new Promise((res, rej) => $.ajax(settings).done(a => res(a)));
     }

    $("#datepicker").datepicker();
    $("#datepicker").datepicker("option", "minDate", "0");

    //Get Selected Date On Load
    let selectedDate = $("#datepicker").val().replace(/\b0/g, '');
    getData(selectedDate);

    $("#datepicker").on("change",function() {
        //Get Selected Date On Change
        selectedDate = $("#datepicker").val().replace(/\b0/g, '');
        getData(selectedDate);
    });

    function getData(selectedDate) {

        let retrieveSlots = doAjax({
            url: actionURL,
            type: 'POST',
            data: {
                "action":"Get Time Slot",
                "propertyID":"978674"
            },
            beforeSend: function() {
                console.log('loading');
                $(".ts-preload-container").css("display","block");
            }
        });
    
        retrieveSlots.then(function(data){
            console.log('complete');
            $(".ts-preload-container").css("display","none");
            let resp = JSON.parse(data);
    
            if(resp.response.ErrorCode == 0){
                let availableTime = resp.response.Response[0].AvailableSlots;

                if(isAvailable(availableTime)) {
                    $('.ts-availableTime-container .ts-time-container').remove();
                    $('.ts-availableTime-container').css("overflow-y","scroll");
                    availableTime.map(function(data){
                        let arrayDateTime = data.dtStart.split(" ");

                        if(selectedDate == arrayDateTime[0]) {
                            let arrTime = arrayDateTime[1].split(":").map(e => e.padStart(2, 0)).slice(0,-1).join(':');
                            let output = `
                                <div class="ts-time-container ts-show-form" data-date="${arrayDateTime[0]}">${arrTime} ${arrayDateTime[2].toLowerCase()}</div>
                            `;
                            $(".ts-availableTime-container").append(output);
                        }
                    });
                }else {
                    $('.ts-availableTime-container .ts-time-container').remove();
                    $('.ts-availableTime-container').css("overflow-y","hidden");
                    let output = `
                        <div class="ts-time-container ts-no-available">No Available Time Slot for Now!</div>
                    `;
                    $(".ts-availableTime-container").append(output);
                }

                $(".ts-time-container.ts-show-form").click(function() {
                    $(".ts-form-container").css("display","block");
                    $(".ts-main-container").css("display","none");

                    //CHANGE SEPARATOR FROM / to - THEN ADD 0 AT THE BEGINNING OF EVERY SINGLE DIGIT
                    let dataDate = $(this).attr("data-date").split("/").map(e => e.padStart(2, 0)).join('-');
                    //SEPERATE TIME AND AM/PM
                    let dataTime = $(this).text().split(" ").map(e => e);
                    //SEPERATE HOURS & MINS
                    let arrTime = dataTime[0].split(":");
                    let militaryTime; 

                    //CONVERTING TO 24HRS FORMAT
                    if(dataTime[1] == "pm") {
                        if(arrTime[0] < 12) {
                            militaryTime = `${parseInt(arrTime[0])+12}:${arrTime[1]}`; 
                        }else {
                            militaryTime = dataTime[0];
                        }
                    }else {
                        militaryTime = dataTime[0]; 
                    }
                    
                    $("#ApptDate").val([dataDate.slice(-4), dataDate.slice(0,5)].join('-'));
                    $("#ApptTime").val(militaryTime);
                });

                $(".ts-form-container .ts-close-icon").click(function() {
                    $(".ts-main-container").css("display","block");
                    $(".ts-form-container").css("display","none");
                });
            }
            if(resp.response.ErrorCode > 0){
                console.log("Error");
            }
        });
    }

    function isAvailable(obj) {
        let availableDate = [];

        obj.map(function(data){
            let arrDateTime = data.dtStart.split(" ");
            availableDate.push(arrDateTime[0]);
        }); 

        return availableDate.includes(selectedDate) ? true:false;
    }
    
    $("#ts-form-submit").click(function() {
        bookAppointment();
    });

    function bookAppointment() {
        
        let bookAppointment = doAjax({
            url: actionURL,
            type: 'POST',
            data: {
                "action":"Book Appointment",
                "propertyID":"978674",
                "CompanyCode":"c00000110537",
                "FirstName":"First Name Test",
                "LastName":"Last Name Test",
                "Email":"test@test.com",
                "Phone":"1234567896",
                "ApptDate":"05/06/2021",
                "ApptTime":"04:00PM",
                "Source":"Website",
                "DesiredMoveinDate":"05/06/2021",
                "DesiredBedrooms":"1",
                "Message":"needparking",
                "RCCampaignId":"12301",
                "RCCampaignType":"StandardCampaign",
                "CTUserVisitId":"3DIT8NXO7S0SRIPQ2EYCBI1719179193",
                "To%20u%20c%20h%20Po%20i%20n%20t":"Appointment"
            },
            beforeSend: function() {
                console.log('loading');   
            }
        });
    
        bookAppointment.then(function(data){
            console.log('complete');
            let resp = JSON.parse(data);
    
            if(resp.response.ErrorCode == 0){
                console.log('Sent')
            }
                
            if(resp.response.ErrorCode > 0){
                console.log("Error");
            }
        });
    }
});