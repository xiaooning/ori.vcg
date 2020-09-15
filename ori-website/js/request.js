function request(data) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: 'http://www.pc18.vip:8888/servlets/binserv/B2B',
            type: 'POST',
            dataType: 'json',
            data: {
                transactions: JSON.stringify([{
                    "id": 1,
                    "command": "com.agilecontrol.phone.B2BCmd",
                    "params": data
                }])
            },
            success: function(data, status, xhr) {
                if (status === 'success') {
                    if (data) {
                        if (data.length > 0) {
                            resolve(data[0])
                        }
                    }
                }
            },
            error: function(xhr, status, error) {
                // alert(xhr.statusText)
            }
        })

    })

}