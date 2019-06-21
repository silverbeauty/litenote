# Lite Note

## How to run
### Dev  
`npm run dev`
### Production
`npm run start`


#### PORT=3000

## Endpoints

### Note APIs

#### POST `/api/note`  
   
   Body: 
   ```
    {
      "title": "this is title",
      "content": "<p>This is content</p>"
    }
   ```

   Response:

   HTTP Status: 200  
   ```
    {
        "status": true,
        "data": {
            "_id": "5d0d0b91f37c11c7f013d056",
            "title": "this is title",
            "content": "<p>This is content</p>",
            "updated_at": "2019-06-21T16:53:37.016Z",
            "created_at": "2019-06-21T16:53:37.016Z",
            "__v": 0
        }
    }
   ```

  #### GET `/api/note/:id`

   Response:

   HTTP Status: 200  
   ```
    {
        "status": true,
        "data": {
            "_id": "5d0d0b91f37c11c7f013d056",
            "title": "this is title",
            "content": "<p>This is content</p>",
            "updated_at": "2019-06-21T16:53:37.016Z",
            "created_at": "2019-06-21T16:53:37.016Z",
            "__v": 0
        }
    }
   ```

   HTTP Status: 401  

   ```
    {
      "status": false,
      "error": "Note doesn`t exist"
    }
   ``` 
  #### GET `/api/note`

   Response:

   HTTP Status: 200  
    ```
    {
        "status": true,
        "data": [
            {
                "_id": "5d0d0b91f37c11c7f013d056",
                "title": "this is title",
                "content": "<p>This is content</p>",
                "updated_at": "2019-06-21T16:53:37.016Z",
                "created_at": "2019-06-21T16:53:37.016Z",
                "__v": 0
            },
            {
                "_id": "5d0d0f67e5c9b8cd4548e9c0",
                "title": "this is title",
                "content": "<p>This is content</p>",
                "updated_at": "2019-06-21T17:09:59.547Z",
                "created_at": "2019-06-21T17:09:59.547Z",
                "__v": 0
            }
        ]
    }
   ```

   HTTP Status: 401  

   ```
    {
      "status": false,
      "error": "Note doesn`t exist"
    }
   ``` 
   