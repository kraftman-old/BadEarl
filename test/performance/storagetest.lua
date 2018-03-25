local uuid  = require 'uuid'
local redis = require 'redis'
local getTimeOfDay = require './lib/gettimeofday'

local client   = redis.connect('127.0.0.1', 6379)
local response = client:ping() 



-- test 
-- how many we can store in a set and the speed of retrieval, 
-- how many we can store as k/v pairs and the speed of retrieval
-- how many how many in a bloom filter and the speed of retrieval

local getString = function(length) 
    local s = ''
    while #s < length do
        s = s..uuid()
    end
    -- trim the end
    return s:sub(1,length)
end

print(getString(90))

