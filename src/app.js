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

    $("#datepicker").datepicker();
    //DISABLE PAST DATES
    $("#datepicker").datepicker("option", "minDate", "0");
    $("#DesiredMoveinDate").attr("min",`${new Date().toISOString().split('T')[0]}`);

    //Get Selected Date On Load
    let selectedDate = $("#datepicker").val().replace(/\b0/g, '');
    getSlots();

    $("#datepicker").on("change",function() {
        //Get Selected Date On Change
        selectedDate = $("#datepicker").val().replace(/\b0/g, '');
        getSlots();
    });

    function doAjax(settings) {
        settings.data = JSON.stringify(settings.data);
        return new Promise((res, rej) => $.ajax(settings).done(a => res(a)));
    }

    //GET AVAILABLE SLOTS
    function getSlots() {
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
    
        retrieveSlots.then(function(data) {
            $(".ts-preload-container").css("display","none");
            let resp = JSON.parse(data);

            if(resp.response.ErrorCode == 0){
                console.log("complete");
                let availableTime = resp.response.Response[0].AvailableSlots;
                createDOM(availableTime);
            }
            if(resp.response.ErrorCode > 0){
                console.log(resp.response.ErrorMessage);
            }
        });
    }

    //CREATE HTML STRUCTURE FOR LIST OF AVAILABLE TIME
    function createDOM(availableTime) {
        if(isAvailable(availableTime)) {
            $('.ts-availableTime-container .ts-time-container').remove();
            $('.ts-availableTime-container').css("overflow-y","scroll");
            availableTime.map(function(data){
                let arrayDateTime = data.dtStart.split(" ");

                if(selectedDate == arrayDateTime[0]) {
                    let arrTime = arrayDateTime[1].split(":").map(e => e.padStart(2, 0)).slice(0,-1).join(':');
                    let datePick = arrayDateTime[0].split("/").map(e => e.padStart(2, 0)).join('/');
                    let output = `
                        <div class="ts-time-container ts-show-form" data-date="${datePick}">${arrTime} ${arrayDateTime[2].toUpperCase()}</div>
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

            //ADD 0 AT THE BEGINNING OF EVERY SINGLE DIGIT
            let dataDate = $(this).attr("data-date").split("/").map(e => e.padStart(2, 0)).join('/');
            //SEPERATE TIME AND AM/PM
            let dataTime = $(this).text().split(" ").map(e => e);
            //SEPERATE HOURS & MINS
            // let arrTime = dataTime[0].split(":");
            // let militaryTime = convertToMilitaryTime(arrTime, dataTime);  
            
            //SET DATE AND TIME TO FORM FIELD
            // $("#ApptDate").val([dataDate.slice(-4), dataDate.slice(0,5)].join('-'));
            $("#ApptDate").val(dataDate);
            $("#ApptTime").val(`${dataTime[0]}${dataTime[1]}`);
        });

        $(".ts-form-container .ts-close-icon").click(function() {
            $(".ts-main-container").css("display","block");
            $(".ts-form-container").css("display","none");
        });
    }

    //CHECK IF THE SELECTED DATE IS AVAILABLE
    function isAvailable(obj) {
        let availableDate = [];

        obj.map(function(data){
            let arrDateTime = data.dtStart.split(" ");
            availableDate.push(arrDateTime[0]);
        }); 

        return availableDate.includes(selectedDate) ? true:false;
    }

    //CONVERTING TO 24HRS FORMAT
    // function convertToMilitaryTime(arrTime, dataTime) {
    //     if(dataTime[1] == "pm") {
    //         if(arrTime[0] < 12) {
    //             return `${parseInt(arrTime[0])+12}:${arrTime[1]}`; 
    //         }else {
    //             return dataTime[0];
    //         }
    //     }else {
    //         return dataTime[0]; 
    //     }
    // }

    $("#ts-form-submit").click(function() {
        console.log("submit!");
        postSchedule();
    });

    //GET AVAILABLE SLOTS
    function postSchedule() {
        let MarketingAPIKey = $("#MarketingAPIKey").val();
        let CompanyCode = $("#CompanyCode").val();
        let PropertyId = $("#PropertyId").val();
        let FirstName = $("#FirstName").val();
        let LastName = $("#LastName").val();
        let Email = $("#Email").val();
        let Phone = $("#Phone").val();
        let ApptDate = $("#ApptDate").val();
        let ApptTime = $("#ApptTime").val();
        let Source = $("#Source").val();
        let DesiredMoveinDate = $("#DesiredMoveinDate").val();
        let DesiredBedrooms = $("#DesiredBedrooms").val();
        let Message = $("#Message").val();
        let RCCampaignId = $("#RCCampaignId").val();
        let RCCampaignType = $("#RCCampaignType").val();
        let CTUserVisitId = $("#CTUserVisitId").val();
        let TouchPoint = $("#TouchPoint").val();

        let sendSchedule = doAjax({
            url: actionURL,
            type: 'POST',
            data: {
                "action":"Post Schedule",
                "MarketingAPIKey":MarketingAPIKey,
                "CompanyCode":CompanyCode,
                "PropertyId":PropertyId,
                "FirstName":FirstName,
                "LastName":LastName,
                "Email":Email,
                "Phone":Phone,
                "ApptDate":ApptDate,
                "ApptTime":ApptTime,
                "Source":Source,
                "DesiredMoveinDate":DesiredMoveinDate,
                "DesiredBedrooms":DesiredBedrooms,
                "Message":Message,
                "RCCampaignId":RCCampaignId,
                "RCCampaignType":RCCampaignType,
                "CTUserVisitId":CTUserVisitId,
                "TouchPoint":TouchPoint
            },
            beforeSend: function() {
                console.log('loading submit');
            }
        });
    
        sendSchedule.then(function(data) {
            console.log('complete submit');
            let resp = JSON.parse(data);

            if(resp.status){
                //true
                console.log(resp.response);
                if(resp.response == "") {
                    console.log("Tour Schedule Successfully!");
                }
            }else {
                //false
                console.log(resp.response);
            }
        });
    }
    
});