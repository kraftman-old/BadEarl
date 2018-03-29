# wrk scripts
# https://github.com/giltene/wrk2

# basic node setup:
# wrk -t3 -c100 -d10s -R15000 --latency "http://localhost:8080/safeurl?url=http://example.org"
#  111158 requests in 10.00s, 28.41MB read
# Requests/sec:  11115.76
# Transfer/sec:      2.84MB

# ./htstress -n 70000 -c 200 -t 3 "http://localhost:8080/safeurl?url=http://example.org"
# requests/sec:  7326.496

# ab -n 70000 -c 100 "http://localhost:8080/safeurl?url=http://example.org"
# Requests per second:    7100.04 [#/sec] (mean)
# Time per request:       14.084 [ms] (mean)
# Time per request:       0.141 [ms] (mean, across all concurrent requests)
# Transfer rate:          1823.54 [Kbytes/sec] received



