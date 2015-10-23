exports.redis = {
    "host": "127.0.0.1",
    "port": "6379",
    "options": {
        "socket_keepalive": true,
        "auth_pass": null
    }
};

exports.mysql = {
    "database": "BHSpace",
        "username": "root",
        "password": "win32.luhzu.a",
        "config": {
        "host": "localhost",
            "dialect": "mysql",
            "port": 3306,
            "timezone": "+08:00",
            "pool": {
            "max": 5,
                "min": 0,
                "idle": 10000
        },
        "logging": null
    }
};


exports.session_secret = "asdfasdfaksdfhaskgdasgfk";