# API Tests

# test GET 
curl -v localhost:3000/api/jobs

# Same test with a If-None-Match that matches a previous etag. This
# will return a 304.
curl -v --header 'If-None-Match: W/"b5-F1b7cwQ6h9O04csif+Wqkw"' localhost:3000/api/jobs

# Test POST

curl -v \
  --data '{"status":"Complete","due":"Tomorrow","title":"New bug added via api","comments":""}'\
  http://localhost:3000/api/jobs
