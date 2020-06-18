$(document).ready(function(){

    var theImageForm = document.querySelector('#theImageForm');
    var theImageField = document.querySelector('#theImageField');
    var theImageContainer = document.querySelector('#theImageContainer');
    var theErrorMessage = document.querySelector('#errorMessage');
    var theSuccessMessage = document.querySelector('#successMessage');
    //var theClearImageLink = document.querySelector('#clearImage');
    var theOpenButton = document.querySelector('#buttonContainer');
    let name = $('#my_name');
    let image = $('#user');
    let theClearImageLink = $('#clearImage');
    window.total = 0;

    //to get profile_picture of user
    $.get('/root/get/user_details', (data)=>{
        $("#userName").val(data.username);
        $("#firstName").val(data.first_name);
        $("#lastName").val(data.last_name);
        $("#MobileNumber").val(data.mobile_number);
        $("#EmailId").val(data.email_id);
        $("#Address").val(data.address);
        image.attr('src', `../uploads/${data.profile_picture}`);
        $("#firstName").addClass('back');
        $("#lastName").addClass('back');
        $("#MobileNumber").addClass('back');
        $("#EmailId").addClass('back');
    })

    $.get('/donations/all_donations', (data) =>{
        console.log(data);
        if(data === undefined || data.length == 0){
            $(".error_msg").show();
        }
        else{
            let length = data.length;
            let t = 0;
            let first_str = '';
            let last_str = '';
            let status_str = '';
            $(".error_msg").hide();
            for(let i = 0; i < length; i++){
                if(data[i].subject !== "Multiple Donation"){
                    t++;
                    first_str += `<div class="text-center mt-3 pb-3 f f${t}" style="border-bottom: solid 1px #e0d6d6;">${data[i].subject}</div>`;
                    last_str += `<div class="text-center mt-3 pb-3 l l${t}" style="border-bottom: solid 1px #e0d6d6;">${data[i].quantityapprox}</div>`;
                    if(data[i].status === "pending"){
                        status_str += `<div class="text-center mt-3 s pb-3 s${t}" style="border-bottom: solid 1px #e0d6d6;">NOT 
                            COLLECTED
                        </div>`;
                    }
                    else{
                        status_str += `<div class="text-center mt-3 pb-3 s s${t}" style="border-bottom: solid 1px #e0d6d6;">COLLECTED</div>`;
                    }
                }
                else{
                    if(data[i].Medicalquantityapprox !== '0'){
                        t++;
                        first_str += `<div class="text-center mt-3 pb-3 f f${t}" style="border-bottom: solid 1px #e0d6d6;">Medical Donation 
                            (Miscellaneous)
                        </div>`;
                        last_str += `<div class="text-center mt-3 pb-3 l l${t}" style="border-bottom: solid 1px #e0d6d6;">${data[i].Medicalquantityapprox}</div>`;
                        if(data[i].status === "pending"){
                            status_str += `<div class="text-center mt-3 s pb-3 s${t}" style="border-bottom: solid 1px #e0d6d6;">NOT 
                                COLLECTED
                            </div>`;
                        }
                        else{
                            status_str += `<div class="text-center mt-3 pb-3 s s${t}" style="border-bottom: solid 1px #e0d6d6;">COLLECTED</div>`;
                        }
                    }
                    if(data[i].Clothesquantityapprox !== '0'){
                        t++;
                        first_str += `<div class="text-center mt-3 pb-3 f f${t}" style="border-bottom: solid 1px #e0d6d6;">Clothes Donation 
                            (Miscellaneous)
                        </div>`;
                        last_str += `<div class="text-center mt-3 pb-3 l l${t}" style="border-bottom: solid 1px #e0d6d6;">${data[i].Clothesquantityapprox}</div>`;
                        if(data[i].status === "pending"){
                            status_str += `<div class="text-center mt-3 pb-3 s s${t}" style="border-bottom: solid 1px #e0d6d6;">NOT 
                                COLLECTED
                            </div>`;
                        }
                        else{
                            status_str += `<div class="text-center mt-3 pb-3 s s${t}" style="border-bottom: solid 1px #e0d6d6;">COLLECTED</div>`;
                        }
                    }
                    if(data[i].Booksquantityapprox !== '0'){
                        t++;
                        first_str += `<div class="text-center mt-3 pb-3 f f${t}" style="border-bottom: solid 1px #e0d6d6;">Book Donation 
                            (Miscellaneous)
                        </div>`;
                        last_str += `<div class="text-center mt-3 pb-3 l l${t}" style="border-bottom: solid 1px #e0d6d6;">${data[i].Booksquantityapprox}</div>`;
                        if(data[i].status === "pending"){
                            status_str += `<div class="text-center mt-3 pb-3 s s${t}" style="border-bottom: solid 1px #e0d6d6;">NOT 
                                COLLECTED
                            </div>`;
                        }
                        else{
                            status_str += `<div class="text-center mt-3 pb-3 s s${t}" style="border-bottom: solid 1px #e0d6d6;">COLLECTED</div>`;
                        }
                    }
                    if(data[i].FoodPacketsquantityapprox !== '0'){
                        t++;
                        first_str += `<div class="text-center mt-3 pb-3 f f${t}" style="border-bottom: solid 1px #e0d6d6;">Food Donation 
                            (Miscellaneous)
                        </div>`;
                        last_str += `<div class="text-center mt-3 pb-3 l l${t}" style="border-bottom: solid 1px #e0d6d6;">${data[i].FoodPacketsquantityapprox}</div>`;
                        if(data[i].status === "pending"){
                            status_str += `<div class="text-center mt-3 pb-3 s s${t}" style="border-bottom: solid 1px #e0d6d6;">NOT 
                                COLLECTED
                            </div>`;
                        }
                        else{
                            status_str += `<div class="text-center mt-3 pb-3 s s${t}" style="border-bottom: solid 1px #e0d6d6;">COLLECTED</div>`;
                        }
                    }
                    if(data[i].Groceriesquantityapprox !== '0'){
                        t++;
                        first_str += `<div class="text-center mt-3 pb-3 f f${t}" style="border-bottom: solid 1px #e0d6d6;">Grocery Donation 
                            (Miscellaneous)
                        </div>`;
                        last_str += `<div class="text-center mt-3 pb-3 l l${t}" style="border-bottom: solid 1px #e0d6d6;">${data[i].Groceriesquantityapprox}</div>`;
                        if(data[i].status === "pending"){
                            status_str += `<div class="text-center mt-3 pb-3 s s${t}" style="border-bottom: solid 1px #e0d6d6;">NOT 
                                COLLECTED
                            </div>`;
                        }
                        else{
                            status_str += `<div class="text-center mt-3 pb-3 s s${t}" style="border-bottom: solid 1px #e0d6d6;">COLLECTED</div>`;
                        }
                    }
                }
            }
            window.total = t;
            $(".first_str").html(first_str);
            $(".last_str").html(last_str);
            $(".status_str").html(status_str);
            m(window.total);
        }
    })

    //to clear current profile_picture of user
    $('#clearImage, #theclearImage').click(function(){
        var message = confirm("Are you sure you want to reset your current photo?");
        if(message == true){
            $.get('/root/delete/profile_image',(data)=>{
                location.reload();
            })
        }
    })

    function m(t){
        for(let i = 0; i < window.total; i++){
            if($(`.f${i+1}`).height() > $(`.s${i+1}`).height()){
                $(`.l${i+1}`).height($(`.f${i+1}`).height());
                $(`.s${i+1}`).height($(`.f${i+1}`).height());
            }
            else{
                $(`.l${i+1}`).height($(`.s${i+1}`).height());
                $(`.f${i+1}`).height($(`.s${i+1}`).height());
            }
        }
    }

    $(window).bind('resize', function() {
        for(let i = 0; i < window.total; i++){
            if($(`.f${i+1}`).height() > $(`.s${i+1}`).height()){
                $(`.l${i+1}`).height($(`.f${i+1}`).height());
                $(`.s${i+1}`).height($(`.f${i+1}`).height());
            }
            else{
                $(`.l${i+1}`).height($(`.s${i+1}`).height());
                $(`.f${i+1}`).height($(`.s${i+1}`).height());
            }
        }
    })

    $(document).mouseup(function(e){
        if(e.target.id === "user" || e.target.id === "edit" || e.target.id === "pencil"){
            if (theOpenButton.style.display === "none") {
                theOpenButton.style.display = "grid";
            } else {
                theOpenButton.style.display = "none";
            }
        }
        else{
            theOpenButton.style.display = "none";
        }
    })

    $("#firstName, #lastName, #MobileNumber, #EmailId").mouseup(function(){
        $(this).removeClass('back');
    })

    $("#firstName, #lastName, #MobileNumber, #EmailId").on('blur', function(){
        $(this).addClass('back');
    })

    theImageField.onchange = function (e) {
        var theFile = e.target.files[0];
    
        if(customFileFilter(theFile)) {
            handleUploadedFile(theFile);
        }
    
    }

    function customFileFilter(file){
        const regex= /\jpg$|\jpeg$|\png$|\gif$/
    
        const check_filename = regex.test(file.name);
    
        const check_mimetype= regex.test(file.type);
        $('#errorMessage').hide();
        $('#successMessage').hide();
    
        if (file.size > 1000000) {
            $('#errorMessage').show();
            $('#errorMessage').html('File too large, cannot be more than 1MB...<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
            return false;
        }
    
        if(check_filename && check_mimetype){
            return true;
        } else {
            $('#errorMessage').show();
            $('#errorMessage').html('File type should be png or jpg/jpeg...<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
            return false;
        }
    }
    
    function handleUploadedFile(file) {
        fileName = file.name;
        var image = document.getElementById("user");
        image.file = file;
        var reader = new FileReader();
        reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(image);
        reader.readAsDataURL(file);
    }
    
    $(document).on('click', '.alert .close', function(){
        $(".alert").hide();
    })
    
    $(document).ready(function(){
    
        $('#theImageForm').submit(function(e) {
            $(this).ajaxSubmit({
    
                error: function(xhr) {
                    alert("Error : " + xhr.message);
                },
    
                success: function(res) {
                    console.log(res);
                    if(res !== "undefined" && res !== ""){
                        $('#errorMessage').hide();
                        $('#successMessage').hide();
                        $('#successMessage').html('Image uploaded successfully<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
                        $('#successMessage').show();
                        window.res = 1;
                    }
                    else{
                        $('#successMessage').hide();
                        $('#errorMessage').hide();
                        $('#errorMessage').html('Select a image file within 1MB size<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
                        $('#errorMessage').show();
                    }
                }
            });
            return false;
        });
    
        $('#profile_details').submit(function(e) {
            $(this).ajaxSubmit({
                error: function(xhr) {
                    $('#errorMessage').show();
                    $('#errorMessage').html('Could not change the Profile details<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
                },

                success: function(res) {
                    $('#successMessage').html(`${res}<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>`);
                    $('#successMessage').show();
                }
            });
            return false;
        });
    
        $("#saveImage").click(function(){
            $('#theImageForm').submit();
        })

    });
})