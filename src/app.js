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


let retrieveSlots = doAjax({
    url: actionURL,
    type: 'POST',
    data: {
        "action":"Get Time Slot",
        "name":"Trek",
        "propertyID":"978674"
    }
});

retrieveSlots.then(function(data){
    let resp = JSON.parse(data);

    if(resp.response.ErrorCode == 0){
        console.log(resp.response);
    }
    if(resp.response.ErrorCode > 0){
        console.log("Error");
    }
})