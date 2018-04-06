

curl -H "Content-Type: application/json" \
-X POST -d '{"urls": [{"domain": "example.com:80", "path" : "test?1=2"}]}' \
http://localhost:8080/urlinfo/1/