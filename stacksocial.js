SE.init({
    clientId: 4686,
    key: 'Jn1HoRLSkS1IMtHxX0Tw0A((',
    channelUrl: 'http://maxhorstmann.net/blank',
    complete: function (data) { 
        //alert("complete"); 
    }
});

function login() {
    SE.authenticate({
        success: function(data) { alert('success'); },
        error: function(data) { alert('error'); },
        networkUsers: true });

}    