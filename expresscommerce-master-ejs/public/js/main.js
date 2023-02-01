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

});