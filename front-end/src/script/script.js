$(document).on("click", ".openDiag", function(){
	$(".modal-title").text($(this).attr("data-title"));
	$(".modal-body").text($(this).attr("data-body"));
	$(".modal-footer > a > .action").text($(this).attr("data-btn-text"));
	$(".modal-footer > a > .action").attr("class", "btn action "+$(this).attr("data-btn-type"));
	$(".modal-footer > a").attr("href", $(this).attr("data-id"));
});

$(document).ready(function(){

	$(document).on("click", ".openDialogHostel", function(){
		var hosteldata = $(this).data('hosteldata');

		$('#hostel_hidden_id').val(hosteldata['hostel_id']);
		$('input[name="edit_hostel_name"]').val(hosteldata['hostel_name']);
		$('select[name="edit_hostel_city"] option[value='+hosteldata['hostel_city']).attr("selected", "selected");
		$('input[name=edit_hostel_address]').val(hosteldata['hostel_address']);
		$('input[name=edit_hostel_rooms]').val(hosteldata['hostel_rooms']);
		$('textarea[name=edit_hostel_extras]').val(hosteldata['hostel_extras']);
		
	});

	$(document).on("click", ".openDialogPendingHostel", function(){
		var hosteldata = $(this).data('hosteldata');

		$('#pending_hostel_hidden_id').val(hosteldata['hostel_id']);
		$('input[name="edit_hostel_name"]').val(hosteldata['hostel_name']);
		$('select[name="edit_hostel_city"] option[value='+hosteldata['hostel_city']).attr("selected", "selected");
		$('input[name=edit_hostel_address]').val(hosteldata['hostel_address']);
		$('input[name=edit_hostel_rooms]').val(hosteldata['hostel_rooms']);
		$('textarea[name=edit_hostel_extras]').val(hosteldata['hostel_extras']);

	});

	///////////////////////// handling live hostels ajax request on display hostel page ////////////////////////
	$("#City").change(function() {
        
		var city = $(this).children("option:selected").val();
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				$("#hostel-container").html(this.responseText);
			}
		};
		document.getElementById("hostel-container").innerHTML = '<div class="mt-4 mx-auto"><img src="../src/images/loader.gif" height="100%" width="100%" /></div>'; 
		xmlhttp.open("GET", "../server/ajaxRequests.php?city=" + city, true);
		xmlhttp.send();
	});
	/////////////////////////////////////////////////////////////////////////////////////////////////////////

	///////////////////////// handling live hostels ajax request on hostel admin page ////////////////////////
	$("#live_city").change(function() {
        
		var city = $(this).children("option:selected").val();
		var id = $("#hostel_admin_id").val();
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				$("#live-hostel-container").html(this.responseText);
			}
		};	
		document.getElementById("live-hostel-container").innerHTML = '<div class="mt-4 mx-auto"><img src="../src/images/loader.gif" height="100%" width="100%" /></div>'; 
		xmlhttp.open("GET", "../server/ajaxRequests.php?id="+id+"&city=" + city +"&type=live", true);
		xmlhttp.send();
	});
	/////////////////////////////////////////////////////////////////////////////////////////////////////////

	///////////////////////// handling pending hostels ajax request on hostel admin page ////////////////////////
	$("#live_city").change(function() {
        
		var city = $(this).children("option:selected").val();
		var id = $("#hostel_admin_id").val();
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				$("#pending-hostel-container").html(this.responseText);
			}
		};
		document.getElementById("pending-hostel-container").innerHTML = '<div class="mt-4 mx-auto"><img src="../src/images/loader.gif" height="100%" width="100%" /></div>'; 
		xmlhttp.open("GET", "../server/ajaxRequests.php?id="+id+"&city=" + city +"&type=pending", true);
		xmlhttp.send();
	});
	/////////////////////////////////////////////////////////////////////////////////////////////////////////

});

function isEmailUnique(email)
{
	if (email.length == 0) {
		$('#signup-email').parent().find('.loader-gif').attr({style: "content:''" });
		return;
	} else {
		
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var res = this.responseText;
				if(res == 1) {
					$('#signup-email').parent().find('.loader-gif').attr({style: "content:url(../src/images/close.png)" });               
				}
				else {
					$('#signup-email').parent().find('.loader-gif').attr({style: "content:url(../src/images/check.png)" });            
				}
			}
		};
		xmlhttp.open("GET", "../server/validateForms.php?checkEmail=" + email, true);
		xmlhttp.send();
	}
}

