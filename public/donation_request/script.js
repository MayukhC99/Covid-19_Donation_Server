$(document).ready(function(){

    var js = {};
    var obj = [];

    $.get('/donations/get/all_donation_requests', (data) => {
        if(data === undefined || data.length == 0){
            $(".all_requests").text('No Pending donation request found.');
        }
        else{
            let size = data.length;
            let str = '';
            for(let i = 0; i < size; i++){
                js.i = obj;
                var ob = {
                    "username": data[i].username,
                    "Medicalquantityapprox": data[i].Medicalquantityapprox,
                    "Clothesquantityapprox": data[i].Clothesquantityapprox,
                    "Booksquantityapprox": data[i].Booksquantityapprox,
                    "FoodPacketsquantityapprox": data[i].FoodPacketsquantityapprox,
                    "Groceriesquantityapprox": data[i].Groceriesquantityapprox,
                    "quantityapprox": data[i].quantityapprox,
                    "status": data[i].status
                }
                js.i.push(ob);
                if(data[i].subject !== "Multiple Donation"){
                    str += `<div class="row ${i} mt-2 mb-2 re">
                        <div class="col-12 text" style="font-weight: bold;">
                            ${data[i].name} wants to donate ${data[i].quantityapprox} ${data[i].subject}. 
                            Email_id : ${data[i].email_id} 
                            Mobile No. : ${data[i].mobile_number} 
                            Address : ${data[i].address} 
                        </div>
                        <button class="btn btn-primary collected_request collected${i+1} mt-2 ml-2 mb-2">Collected</button>
                        <button class="btn btn-danger delete_request delete${i+1} mt-2 ml-2 mb-2">Delete</button>
                    </div>`;
                }
                else{
                    let arr = '';
                    if(data[i].Medicalquantityapprox !== '0')
                        arr += ` ${data[i].Medicalquantityapprox} Medicines`;
                    if(data[i].Clothesquantityapprox !== '0')
                        arr += ` ${data[i].Clothesquantityapprox} Clothes`;
                    if(data[i].Booksquantityapprox !== '0')
                        arr += ` ${data[i].Booksquantityapprox} Books`;
                    if(data[i].FoodPacketsquantityapprox !== '0')
                        arr += ` ${data[i].FoodPacketsquantityapprox} Food Packets`;
                    if(data[i].Groceriesquantityapprox !== '0')
                        arr += ` ${data[i].Groceriesquantityapprox} Groceries`;
                    str += `<div class="row ${i} mt-2 mb-2 re">
                        <div class="col-12 text" style="font-weight: bold;">
                            ${data[i].name} wants to donate${arr}. 
                            Email_id : ${data[i].email_id} 
                            Mobile No. : ${data[i].mobile_number} 
                            Address : ${data[i].address} 
                        </div>
                        <button class="btn btn-primary collected_request collected${i+1} mt-2 ml-2 mb-2">Collected</button>
                        <button class="btn btn-danger delete_request delete${i+1} mt-2 ml-2 mb-2">Delete</button>
                    </div>`;
                }
            }
            $(".all_requests").html(str);
        }
    })

    $(document).on('click', '.btn', function(){
        var class_name = $(this).attr('class');
        button = class_name.split(' ')[3];
        var type = class_name.split(' ')[2];
        var name = $("." + button).parent().attr("class");
        var one = name.split(' ')[1];
        var request_data = js.i[one];
        // var space = $("." + one + " .username").text();
        // username = $.trim(space);
        if(type === "collected_request")
            var message = confirm(`Are you sure you have collected the donation request?`);
        else
            var message = confirm(`Are you sure you want to delete the donation request?`);
        if(message == true){
            $.ajax({
                url: `/donations/${type}`,
                type: 'POST',
                data: {
                    username: request_data.username,
                    Medicalquantityapprox: request_data.Medicalquantityapprox,
                    Clothesquantityapprox: request_data.Clothesquantityapprox,
                    Booksquantityapprox: request_data.Booksquantityapprox,
                    FoodPacketsquantityapprox: request_data.FoodPacketsquantityapprox,
                    Groceriesquantityapprox: request_data.Groceriesquantityapprox,
                    quantityapprox: request_data.quantityapprox,
                    status: request_data.status
                },
                success: function (data) {
                    setTimeout(location.reload.bind(location), 500);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                }
            });

            return false;
        }
        else
            return false;
    });
})