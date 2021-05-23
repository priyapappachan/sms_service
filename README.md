# sms_service

## Installation and Setup

### Install node js 

>apt install nodejs

>apt install npm

### Install postgres

>apt install postgres

### Restore the dump into DB server

>sudo -i -u postgres psql

>psql -U postgres postgres \i path_to_sql_file
  
### Install redis for cache 
>apt install redis-server
  
### Run server
- Clone the repository 
- Change database password as required in /src/config/config.js 
- Run below commands to start the server : 
  >npm install
  
  >node app.js
  
### Run unit tests
  >npm test
  
## API details 
API endpoint : ec2-3-97-16-52.ca-central-1.compute.amazonaws.com

Port : 3000

Test Data : https://docs.google.com/spreadsheets/d/1-ArSg7OntGlZqQaDOzKy4iGAnLlFOHungyknNDBQRb0/edit#gid=0 

Example API calls

Find username and password for basic authentication in the above shared excel sheet. Password is auth_id. 


 1.  POST  ec2-3-97-16-52.ca-central-1.compute.amazonaws.com:3000/inbound/sms

`
{
    "from" : "552235330778",
    "to" : "441235330078",
    "text" : "hello"
}
`

  
Success response : 
`  {
    "message": "inbound sms ok",
    "error": ""
}`

 1.  POST  ec2-3-97-16-52.ca-central-1.compute.amazonaws.com:3000/outbound/sms

`
{
    "from" : "441235330078",
    "to" : "552235330778",
    "text" : "hello" 
}
`
  
  Success response : 
  `{
    "message": "outbound sms ok",
    "error": ""
}`


Adding the doc link here https://docs.google.com/document/d/1Xsj4u-JYAtRVvFHlYTD5ABB8LSsAyIJblc3p3kOrZOY/edit for task details.
  
