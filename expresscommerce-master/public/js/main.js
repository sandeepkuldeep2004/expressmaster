$(document).ready(function() {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $('#wrapper').toggleClass('main-content');
        $('body').toggleClass('slide');
    });
});