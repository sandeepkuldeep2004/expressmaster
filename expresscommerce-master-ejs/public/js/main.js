$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $('#wrapper').toggleClass('main-content');
        $('body').toggleClass('slide');
    });


    $('#example').DataTable();

    $('tr.submenu, i.cat_submenu').click(function (evt) {
        var currentID = this.id || "No ID!";
        $(this).removeClass('table-primary'); 
        if ($('.d_'+currentID).hasClass("d-none")) {
            $(this).addClass('table-primary');
            $('.d_'+currentID).removeClass('d-none');
            $('.bi_'+currentID).removeClass('bi-plus-circle').addClass('bi-dash-circle');
        }
        else {
            $('.d_'+ currentID).addClass('d-none').removeClass('table-primary');
            $('.last_level_'+currentID).addClass('d-none')            
            $('.bi_'+currentID).removeClass('bi-dash-circle').addClass('bi-plus-circle');
            $('.last_plus_circle_'+currentID).removeClass('bi-dash-circle').addClass('bi-plus-circle');
        }        
    })
    var elems = [];
    $("input.form-check-input:checkbox").on('click', function () {
        var $box = $(this);
        if ($box.is(":checked")) {

            var group = "input:checkbox[name='" + $box.attr("name") + "']";
            var $modulename = "{" + $box.attr("name") + ":" + $box.attr("value") + "}";
            const checkValue = getItem(elems, $box.attr("name"));
            elems = elems.filter(e => e != checkValue); // will return ['A', 'C']
            elems.push($modulename);
            $('#modulelistarray').val(JSON.stringify(elems)); //store array
            console.log($("#modulelistarray").val());
            $(group).prop("checked", false);
            $box.prop("checked", true);

        } else {
            var $modulename = "{" + $box.attr("name") + ":" + $box.attr("value") + "}";
            const index = elems.indexOf($modulename);
            if (index > -1) { // only splice array when item is found
                elems.splice(index, 1); // 2nd parameter means remove one item only
            }
            $('#modulelistarray').val(JSON.stringify(elems)); //store array
            console.log($("#modulelistarray").val());
            $box.prop("checked", false);
        }
    });

    function getItem(arrayItem, getItem) {
        return arrayItem.filter(element => element.includes(getItem))
    }


    $("#editUserGroup").click(function () {
        var permissionArray = [];
        $("input:checkbox:checked").each(function () {
            permissionArray.push($(this).val());
        });
        $('#modulenameedit').val(JSON.stringify(permissionArray)); //store array
        $("#editusergroupform").submit();
    });

    $("#product-add-submit-button").click(function () {

    var proCateGoriesArray = [];
        $("input:checkbox:checked").each(function () {
            proCateGoriesArray.push($(this).val());
        });
        $('#product_categories').val(JSON.stringify(proCateGoriesArray)); //store array
        
        $("#product-addi-form").submit();
    });


    $("#basesitereg").change(function () {
        if ($("#basesitereg").val() != '') {
            $.ajax({
                url: '/ajax/getselectbox',
                type: 'POST',
                cache: false,
                async: true,
                data: { basesitereg: $("#basesitereg").val(), _csrf: $("#_csrf").val() },
                success: function (data) {

                    $('#UserGroupDropDownByBaseId').empty();
                    $('#UserGroupDropDownByBaseId').append("<option value=''>--Select Group--</option>");
                    for (let i = 0; i < data.length; i++) {
                        $('#UserGroupDropDownByBaseId').append('<option  value="' + data[i]._id + '">' + data[i].name + '</optoin>');
                    }

                }, error: function (jqXHR, textStatus, err) {
                    console.log('text status ' + textStatus + ', err ' + err)
                }
            })
        }

    });

// Events
$('.dropdown-container')
	// .on('click', '.dropdown-button', function() {
    //     $(this).siblings('.dropdown-list').toggle();
	// })
	.on('input', '.dropdown-search', function() {
    	var target = $(this);
        var dropdownList = target.closest('.dropdown-list');
    	var search = target.val().toLowerCase();
    
    	if (!search) {
            dropdownList.find('li').show();
            return false;
        }
    
    	dropdownList.find('li').each(function() {
        	var text = $(this).text().toLowerCase();
            var match = text.indexOf(search) > -1;
            $(this).toggle(match);
        });
	})
	.on('change', '[type="checkbox"]', function() {
        var container = $(this).closest('.dropdown-container');
        var numChecked = container. find('[type="checkbox"]:checked').length;
    	container.find('.quantity').text(numChecked || 'Any');
	});

  

});
function confirmation(){
    var result = confirm("Are you sure you want to delete?");
    if(result){
      console.log("Deleted")
    }
    else{
        return false;
    }
  }