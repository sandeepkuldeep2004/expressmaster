$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $('#wrapper').toggleClass('main-content');
        $('body').toggleClass('slide');
    });


    $('#example').DataTable();

    $('tr.submenu').click(function (evt) {
        var currentID = this.id || "No ID!";
        if ($('.d_' + currentID).hasClass("d-none")) {
            $(this).addClass('table-primary');
            $('.d_' + currentID).removeClass('d-none');
            $('.bi_' + currentID).removeClass('bi-plus-circle').addClass('bi-dash-circle');
        }
        else {
            $('.d_' + currentID).addClass('d-none');
            $('.bi_' + currentID).removeClass('bi-dash-circle').addClass('bi-plus-circle');
            $(this).removeClass('table-primary');
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


});