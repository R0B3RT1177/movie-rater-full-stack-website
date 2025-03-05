// Doesn't allow spaces in the username and password input fields
// https://stackoverflow.com/questions/19024825/not-allow-a-blank-character-space-in-a-input-form
 $(function() {
        $('#username').on('keypress', function(e) {
            if (e.which == 32){
                console.log('Space Detected');
                return false;
            }
        });
});

 $(function() {
        $('#password').on('keypress', function(e) {
            if (e.which == 32){
                console.log('Space Detected');
                return false;
            }
        });
});