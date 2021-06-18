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

