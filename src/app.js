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
    // function doAjax(settings) {
    //     settings.data = JSON.stringify(settings.data);
    //     return new Promise((res, rej) => $.ajax(settings).done(a => res(a)));
    // }

    $("#datepicker").datepicker();
    $("#datepicker").datepicker("option", "minDate", "0");

    //Get Selected Date
    let selectedDate = $("#datepicker").val().replace(/\b0/g, '');
    getData(selectedDate);

    $("#datepicker").on("change",function() {
        selectedDate = $("#datepicker").val().replace(/\b0/g, '');
        getData(selectedDate);
    });

    function getData(selectedDate) {

        function doAjax(settings) {
            settings.data = JSON.stringify(settings.data);
            return new Promise((res, rej) => $.ajax(settings).done(a => res(a)));
        }
        
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
                            let output = `
                                <div class="ts-time-container">${arrayDateTime[1]} ${arrayDateTime[2]}</div>
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
            }
            if(resp.response.ErrorCode > 0){
                console.log("Error");
            }
        });
    }

    function isAvailable(obj) {
        let availableDate = [];

        obj.map(function(data){
            let arrTime = data.dtStart.split(" ");
            availableDate.push(arrTime[0]);
        }); 

        return availableDate.includes(selectedDate) ? true:false;
    }
});