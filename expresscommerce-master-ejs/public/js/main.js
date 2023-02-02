$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $('#wrapper').toggleClass('main-content');
        $('body').toggleClass('slide');
    });


    $('#example').DataTable();

    $('tr.submenu').click(function(evt){
        var currentID = this.id || "No ID!";
        if($('.d_'+currentID).hasClass("d-none")){
            $(this).addClass('table-primary');
            $('.d_'+currentID).removeClass('d-none');
            $('.bi_'+currentID).removeClass('bi-plus-circle').addClass('bi-dash-circle');
        }
        else {
            $('.d_'+currentID).addClass('d-none');
            $('.bi_'+currentID).removeClass('bi-dash-circle').addClass('bi-plus-circle');
            $(this).removeClass('table-primary');
        }
    })

    // the selector will match all input controls of type :checkbox
    // and attach a click event handler
    var elems = [];
    $("input.form-check-input:checkbox").on('click', function() {
    // in the handler, 'this' refers to the box clicked on
    var $box = $(this);
    if ($box.is(":checked")) {
    // the name of the box is retrieved using the .attr() method
    // as it is assumed and expected to be immutable
    var group = "input:checkbox[name='" + $box.attr("name") + "']";
    
    var $modulename = "{"+$box.attr("name")+":"+$box.attr("value")+"}";
    console.log($modulename);

    
    elems.push($modulename);
    $('#modulelistarray').val(JSON.stringify(elems)); //store array
    
    var value = $('#modulelistarray').val(); //retrieve array
    value = JSON.parse(value);
    console.log($("#modulelistarray").val());
    // the checked state of the group/box on the other hand will change
    // and the current value is retrieved using .prop() method
    $(group).prop("checked", false);
    $box.prop("checked", true);
    } else {
    var $modulename = "{"+$box.attr("name")+":"+$box.attr("value")+"}";
    $box.prop("checked", false);
    console.log($modulename);
    }
    });

});