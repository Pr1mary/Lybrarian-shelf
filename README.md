# Lybrarian-shelf
Bookshelf services for lybrarian project

## api documentation

rest api documentation for bookshelf services in lybrarian

### - Book path -

This path is used to get all books from database and it will return an array of book details when called using http "GET" method.

path: */book*

method: **GET**

return:

```
[
    ...{
        id: Integer,
        library_id: String,
        title: String,
        writer: String,
        publisher: String,
        ISBN: String,
        pages: Integer,
        release: Date,
        img: String,
        count: Integer,
    },
]
```

This path also can be used to insert new book to the database when called using http "POST" method by sending request body json then it will return status ("OK" or "ERROR") and message.

path: */book* 

method: **POST**

body:
```
{
    token: String,
    data: {
    	library_id: String,
    	title: String,
    	writer: String,
    	publisher: String,
    	ISBN: String,
    	pages: Integer,
    	release: Date,
    	img: String,
    	count: Integer,
    }
}
```

return:
```
{
    status: "OK" || "ERROR",
    msg: String
}
```

### - Book id path -

This path is used to search for a book based on its id from the database, it will return a json of choosen book details.

path: */book/id/:id*

(where :id is the book id from database)

method: **GET**

return:
```
{
    id: Integer,
    library_id: String,
    title: String,
    writer: String,
    publisher: String,
    ISBN: String,
    pages: Integer,
    release: Date,
    img: String,
    count: Integer,
}
```

This path can be used to update existing book data from database, user will send token and data filled with book detail that want to be changed and return status and message to report if the process is success or failed.

path: */book/id/:id*

(where :id is the book id from database)

method: **PATCH**

body:
```
{
    token: String
    data: {
        *library_id = String
	*title = String
	*writer = String
	*publisher = String
	*ISBN = String
	*pages = String
	*release = String
	*img = String
	*count = String
    }
}
```
(star * is optional, only insert key that needed to be update)

return:
```
{
    status: "OK" || "ERROR",
    msg: String
}
```

This path also can be used to delete existing book data from database, user just need to send token then it will return status and messange.

path: */book/id/:id*

(where :id is the book id from database)

method: **DELETE**

body:
```
{
    token: String
}
```

return:
```
{
    status: "OK" || "ERROR",
    msg: String
}
```


### - Book search path -

This path is used to search and get book based on its title name from the database, it will return an array of book details.

path: */book/search*

method: **GET**

query params: *name = Books_Name*

query usage sample:
> ```http://localhost:8080/book/search?name=Some%20new%20books```

> ```http://localhost:8080/book/search?name=Wizard%20books```

return:
```
[
    ...{
        id: Integer,
        library_id: String,
        title: String,
        writer: String,
        publisher: String,
        ISBN: String,
        pages: Integer,
        release: Date,
        img: String,
        count: Integer,
    },
]
```

### - Writer search path -

This path is used to search and get book based on its writer name from the database, it will return an array of book details.

path: */writer/search*

method: **GET**

query params: *name = Writer_Name*

query usage sample:
> ```http://localhost:8080/writer/search?name=John&20doe```

> ```http://localhost:8080/writer/search?name=Richard```

return:
```
[
    ...{
        id: Integer,
        library_id: String,
        title: String,
        writer: String,
        publisher: String,
        ISBN: String,
        pages: Integer,
        release: Date,
        img: String,
        count: Integer,
    },
]
```

